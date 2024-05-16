import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// new script commands to add to user's package.json
const newScripts = {
  "sexy": "TARGET_DIR=$(pwd) npm run cssexy:dev --prefix node_modules/cssexy",
  "sexy-prod": "TARGET_DIR=$(pwd) npm run cssexy:prod --prefix node_modules/cssexy",
};

function updateScripts(scripts) {
  // scripts: an object containing current scripts from package.json
  // shallow copy scripts, otherwise they would be replaced by the new script/s
  // returning updated scripts object, containing both old and new scripts
  return { ...scripts, ...newScripts };
}

// path to package.json
const packageJsonPath = path.join(path.dirname(__dirname), 'package.json');

// get the package.json object
// parse: parse json
// readFileSync: read file contents
// packageJsonPath: path to package.json
// utf-8: the encoding of all json files
const json = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
// json.scripts: setting the scripts object to the object returned by updateScripts
json.scripts = updateScripts(json.scripts);

// has to be stringified to write to package.json
try {
  // rewrites the entire package.json, adding in the new scripts
  fs.writeFileSync(packageJsonPath, JSON.stringify(json, null, 2));
  console.log('Added scripts to package.json');
}
catch (err) {
  console.error(err);
}
