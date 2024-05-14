import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config } from 'dotenv';

const updateEnv = async (property, value) => {
  try {

    // console.log('updateEnv: invoked');
    // console.log('updateEnv: property:', property);
    // console.log('updateEnv: value:', value);

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const __envPath = path.resolve(__dirname, '../.env')
    config({ path: __envPath });


    // getting the cssxe environment variables
    const envVars = fs.readFileSync(__envPath, 'utf-8').split('\n');
    // console.log('envVars:', envVars);

    // setting the target port (the targetPort) in the .env file if it doesn’t already exist, so that it can be used by our application.
    // it gets called in App.jsx.
    // finding the line that starts with 'VITE_TARGET_PORT=', if any.
    const envVarIndex = envVars.findIndex(line => line.startsWith(`VITE_${property}=`));
    // if it exists
    if (envVarIndex > -1) {
      console.log('envVarIndex:', envVarIndex);
      // update it
      envVars[envVarIndex] = `VITE_${property}=${value}`;
      envVars[envVarIndex+1] = `${property}=${value}`;
    // if it doesn't exist
    } else {
      // add it
      envVars.push(`VITE_${property}=${value}`);
      envVars.push(`${property}=${value}`);
    }
    // write to .env
    fs.writeFileSync('.env', envVars.join('\n'));

    return 'success';

  }

  catch (err) {
    console.error(err);
  }
}

export { updateEnv }
