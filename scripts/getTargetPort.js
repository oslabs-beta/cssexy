import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

const getTargetPort = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    dotenv.config({ path: path.resolve(__dirname, '../.env') });

    console.log('getTargetPort: invoked');
    // console.log('pwd:', execSync('pwd').toString().trim());
    const cwd = execSync('pwd').toString().trim();
    // console.log('cwd:', cwd);
    let lsof_lines = '';

    if (!cwd.includes('cssxe')) {
      const pids = execSync('lsof +D ../.. | grep DIR | grep -v $(basename $(pwd)) | grep -v cwd | awk \'!seen[$2]++ {print $2}\'')
        .toString()
        .trim()
        .split('\n');

      // console.log('pids:', pids);

      for (const pid of pids) {
        lsof_lines += execSync(`lsof -i -P -n -p ${pid} | grep ${pid}`).toString();
      }

    }


    // console.log('lsof_lines:', lsof_lines);

    const envVars = fs.readFileSync('./.env', 'utf-8').split('\n');
    // console.log('\n\n');
    // console.log('envVars:', envVars);
    // console.log('\n\n');
    const targetPort = lsof_lines?.match(/..:[0-9]+(?!->)/)?.[0].slice(-4).toString() || process.env.TARGET_PORT_BACKUP || 9999;



    const envVarIndex = envVars.findIndex(line => line.startsWith('VITE_PROXY'));
    if (envVarIndex > -1) {
      envVars[envVarIndex] = `VITE_PROXY=${targetPort}`;
    } else {
      envVars.push(`VITE_PROXY=${targetPort}`);
    }
    fs.writeFileSync('.env', envVars.join('\n'));

    // console.log('targetPort found:', targetPort);
    return targetPort;
  } catch (err) {
    console.error(err);
  }
}

getTargetPort();
