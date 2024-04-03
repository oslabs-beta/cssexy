import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

const getTargetPort = async () => {
  try {

    // passed in from the npm run sexy script in the target package.json
    const targetDir = process.env.TARGET_DIR;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    dotenv.config({ path: path.resolve(__dirname, '.env') });

    console.log('getTargetPort: invoked');
    // console.log('targetDir:', targetDir);

    let targetPort;

    if (!targetDir.includes('cssxe')) {
      // getting the process IDs of all open files in the target directory
      // `lsof` (list open files)
      // +D flag: search in directories, instead of files
      // targetDir: restrict to files within our current target directory
      //
      // grep DIR: only look at lines with "DIR" in them.
      //
      // grep -v cwd: exclude lines with "cwd" in them (we don't care about our process's current working directory)
      //
      // awk: print only unique lines (using the 'seen' array)
      // !seen[$2]++: if this line hasn't been seen before, print it and remember it as seen
      // print $2: print the second column of the line, which is the process ID.
      // we'll probably need to remove the grep -v part when this is installed as a package
      const pids = execSync(`lsof +D ${targetDir} | grep DIR | grep -v cwd | awk '!seen[$2]++ {print $2}'`)
        .toString() // convert the Buffer object to a string
        .trim() // remove leading and trailing whitespace
        .split('\n'); // split the string into an array of lines

      console.log('pids:', pids);

      for (const pid of pids) {
        // `lsof` (list open files)
        // -i flag: include network connections
        // -P flag: show only the process ID and process name (not the parent process name)
        // -n flag: show numerical IDs instead of names
        // -p flag: only show info for processes with the given ID
        // ${pid} part is a template literal, it inserts the value of the 'pid' variable into the string
        // grep ${pid}: regex to match any line that contains the process ID
        targetPort = execSync(`lsof -i -P -n -p ${pid} | grep ${pid}`)
        .toString()
        .match(/(?<=..:)\d{4}/)
          // (?<=..:) : positive lookahead. only match if it's preceded by ..:
          // \d : match any integer
          // {4} : four times
        ?.[0] // get the first match, if any

        if (targetPort) {
          // if we found a targetPort, we're done
          // console.log('targetPort:', targetPort);
          break;
        }
      }
      // if we didn't find a targetPort, throw an error
      if (!targetPort) {
        console.log('no targetPort found');
        throw new Error('targetPort not found');
      }
    }

    // getting the cssxe environment variables
    const envVars = fs.readFileSync('./.env', 'utf-8').split('\n');
    // console.log('envVars:', envVars);

    // setting the target port (the proxy) in the .env file if it doesn’t already exist, so that it can be used by our application.
    // it gets called in App.jsx.
    // finding the line that starts with 'VITE_PROXY=', if any.
    const envVarIndex = envVars.findIndex(line => line.startsWith('VITE_PROXY='));
    // if it exists
    if (envVarIndex > -1) {
      console.log('envVarIndex:', envVarIndex);
      // update it
      envVars[envVarIndex] = `VITE_PROXY=${targetPort}`;
      envVars[envVarIndex+1] = `TARGET_PORT=${targetPort}`;
    // if it doesn't exist
    } else {
      // add it
      envVars.push(`VITE_PROXY=${targetPort}`);
      envVars.push(`TARGET_PORT=${targetPort}`);
    }
    // write to .env
    fs.writeFileSync('.env', envVars.join('\n'));

    // console.log('targetPort found:', targetPort);
    return targetPort;
  } catch (err) {
    console.error(err);
  }
}

getTargetPort();
