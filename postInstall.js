import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// new script commands. examples for now
const newScripts = {
  "sexy": "cssxe dev -p 6969",
  "build-sexy": "cssxe build"
};
/*
  what storybook installs in package.json
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
*/

function updateScripts(scripts) {
  // scripts: an object containing current scripts from package.json
  // shallow copy scripts, otherwise they would be replaced by the new script/s
  // returning updated scripts object, containing both old and new scripts
  return { ...scripts, ...newScripts };
}

// path to package.json
const packageJsonPath = path.join(__dirname, 'package.json');

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
