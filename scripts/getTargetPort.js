import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

const getTargetPort = async () => {
  try {

    const targetDir = process.env.TARGET_DIR;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    dotenv.config({ path: path.resolve(__dirname, '.env') });


    console.log('getTargetPort: invoked');
    console.log('targetDir:', targetDir);

    // console.log('pwd:', execSync('pwd'));
    const cwd = execSync('pwd').toString().trim();
    console.log('cwd:', cwd);
    let lsof_lines = '';

    if (!targetDir.includes('cssxe')) {
      const pids = execSync(`
      lsof +D ${targetDir} |
      grep DIR |
      grep -v $(basename $(pwd)) |
      grep -v cwd |
      awk '!seen[$2]++ {print $2}'`)
        .toString()
        .trim()
        .split('\n');

      for (const pid of pids) {
        lsof_lines += execSync(`lsof -i -P -n -p ${pid} | grep ${pid}`).toString();
      }
    }




    const envVars = fs.readFileSync('./.env', 'utf-8').split('\n');
    // console.log('\n\n');
    // console.log('envVars:', envVars);
    console.log('\n\n');
    const targetPort = lsof_lines?.
    match(/..:[0-9]+(?!->)/) // match any line that starts with a port number
    ?.[0]
    .slice(-4)
    .toString();
    if (!targetPort) {
      console.log('lsof_lines:', lsof_lines);
      console.log('lsof lines match:', lsof_lines?.match(/..:[0-9]+(?!->)/)?.[0].slice(-4));
      throw new Error('targetPort not found');
    }



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
