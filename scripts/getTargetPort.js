import { execSync } from 'child_process';
import fs from 'fs';

const getTargetPort = async () => {
  try {
    console.log('getTargetPort: invoked');
    const pids = execSync('lsof +D .. | grep DIR | grep -v $(basename $(pwd)) | grep -v cwd | awk \'!seen[$2]++ {print $2}\'')
      .toString()
      .trim()
      .split('\n');

    let lsof_lines = '';

    for (const pid of pids) {
      lsof_lines += execSync(`lsof -i -P -n -p ${pid} | grep ${pid}`).toString();
    }

    const envVars = fs.readFileSync('.env', 'utf-8').split('\n');
    const targetPort = lsof_lines.match(/..:[0-9]+(?!->)/)[0].slice(-4).toString();
    const envVarIndex = envVars.findIndex(line => line.startsWith('VITE_PROXY'));
    if (envVarIndex > -1) {
      envVars[envVarIndex] = `VITE_PROXY=${targetPort}`;
    } else {
      envVars.push(`VITE_PROXY=${targetPort}`);
    }
    fs.writeFileSync('.env', envVars.join('\n'));

    console.log('targetPort found:', targetPort);
    return targetPort;
  } catch (err) {
    console.error(err);
  }
}

getTargetPort();
