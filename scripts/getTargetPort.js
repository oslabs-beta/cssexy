import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config } from 'dotenv';

import { updateEnv } from './updateEnv.js';


/**
 * Retrieves the target port for the application.
 * If the target directory is not 'cssexy', it searches for the process IDs of all open files in the target directory
 * and retrieves the target port associated with the process ID.
 * If the target port is found, it updates the 'VITE_TARGET_PORT' and 'TARGET_PORT' environment variables in the .env file.
 * If the target port is not found, it throws an error.
 * @returns {string} The target port.
 * @throws {Error} If the target port is not found.
 */

const getTargetPort = async () => {
  try {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const __envPath = path.resolve(__dirname, '../.env')

    config({ path: __envPath });

    // passed in from the npm run sexy script in the target package.json
    const targetDir = process.env.TARGET_DIR ? process.env.TARGET_DIR : process.env.TARGET_DIR_BACKUP

    // console.log('getTargetPort: invoked');
    // console.log('getTargetPort: targetDir:', targetDir);
    // console.log('targetDirBackup:', process.env.TARGET_DIR_BACKUP);

    let targetPort;

    if (!targetDir.includes('cssexy')) {
      console.log('getTargetPort: targetDir is not cssexy. Searching for open files in targetDir...');
      // getting the process IDs of all open files in the target directory
      // `lsof` (list open files)
      // +D flag: search in directories, instead of files
      // targetDir: restrict to files within our current target directory
      //
      // grep DIR: only look at lines with "DIR" in them.
      //
      // grep -v cwd: exclude lines with "cwd" (i.e. processes in our current working directory)
      // we'll probably need to remove the grep -v part when this is installed as a package
      //
      // awk: print only unique lines (using the 'seen' array)
      // !seen[$2]++: if this line hasn't been seen before, print it and remember it as seen
      // print $2: print the second column of the line, which is the process ID.
      const pids = execSync(`lsof +D ${targetDir} | grep DIR | grep -v cwd | awk '!seen[$2]++ {print $2}'`)
        .toString() // convert the Buffer object to a string
        .trim() // remove leading and trailing whitespace
        .split('\n'); // split the string into an array of lines

      // console.log('pids:', pids);

      for (const pid of pids) {
        // `lsof` (list open files)
        // -i flag: include network connections
        // -P flag: show only the process ID and process name (not the parent process name)
        // -n flag: show numerical IDs instead of names
        // -p flag: only show info for processes with the given ID
        // ${pid}: the given process ID being searched
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
          console.log('targetPort found. break condition:', targetPort);
          break;
        }
      }
      // if we didn't find a targetPort, throw an error
      if (!targetPort) {
        console.log('no targetPort found');
        throw new Error('targetPort not found');
      }
    }
    else {
      // console.log('\n\n');
      // console.log('targetDir is cssexy');
      // console.log('\n');
    }
    // return the targetPort
    updateEnv('TARGET_PORT', targetPort);
    // console.log('getTargetPort: targetPort:', targetPort);
    return targetPort;
  } catch (err) {
    console.error(err);
  }
}

getTargetPort();
