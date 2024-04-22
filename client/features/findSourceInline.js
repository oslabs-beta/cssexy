import fs from 'fs';
import path from 'path';

import { cssToReact } from './cssToReact.js';

const findSourceInline = async ({ inlineRules, data, targetDir }) => {

  // console.log('findSourceInline: inlineRules', inlineRules);
  // console.log('findSourceInline: data', data);
  // console.log('findSourceInline: targetDir', targetDir);

  const cssText = inlineRules.cssText;
  const selector = data?.selector;
  const selectorStart = data?.selectorStart;
  const className = data?.className;
  const id = data?.id;
  const textContent = data?.textContent;



  const gitignorePath = path.join(targetDir, '.gitignore');
  const gitignore = fs.readFileSync(gitignorePath, 'utf-8');
  const ignoredPaths = gitignore.split('\n')
    .filter(path => path !== '' && !path.trim().startsWith('#'))
    .map(path => path.trim());

  const templateIgnoredPaths = [
    '.babelrc',
    'babel.config.js',
    'build',
    'dist',
    'dist-client',
    'dist-server',
    'dist-server-client',
    '.DS_Store',
    '.eslintrc',
    '.eslintignore',
    '.git',
    '.gitignore',
    'LICENSE',
    'node_modules',
    '.prettierrc',
    '.prettierignore',
    'public',
    'README.md',
    'tsconfig.json',
    'tsconfig.node.json',
    'tsconfig.server.json',
    'tsconfig.client.json',
    '.vscode',
    'webpack.config.js',
    'webpack.config.ts',
    'webpack.config.client.js',
    'webpack.config.client.ts',
    'webpack.config.server.js',
    'webpack.config.server.ts',
    'webpack.config.node.js',
    'webpack.config.node.ts',
    'vite.config.js',
  ]

  ignoredPaths.push(...templateIgnoredPaths);


  // console.log('findSourceInline: cssText', cssText);
  if (!cssText) { return null };


  // example: old values
  // from: 'position: absolute; top: 60%; color: white;'
  //   to: "position: 'absolute', top: '60%', color: 'white'"
  // const cssTextJsArr = cssToReact(cssText).split(', ');
  const cssTextJsArr = cssToReact(cssText).split(', ').map(part => part.replaceAll("'", ''));

  // these are available in the inlineRules, cssProperties array itself. each cssProperty is an object with name and value.

  const cssJsDx = {}

  for (const keyValue of cssTextJsArr) {
    const kvSplit = keyValue.split(':');
    cssJsDx[kvSplit[0].trim()] = kvSplit[1].trim()
  }

  console.log('findSourceInline: cssJsDx', cssJsDx);
  console.log('\n');
  // arrays will be helpful for string matching when there are line breaks rather than spaces
  // between the styles in a given react component.


  // Recursive function to find .jsx files in the target directory
  async function findJsxFiles(dir) {
    // console.log('findSourceInline: findJsxFiles: dir', dir);
    // Creating an empty array to store the found .jsx file paths
    let jsxFiles = [];

    let ignoredPathsAcc = 0;
    // Creating a Promise that will be resolved with an array of entries
    const entriesPromise = new Promise(
      (resolve, reject) => {
        // Use fs.readdir to asynchronously read the contents of a directory.
        fs.readdir(
          // The 'dir' parameter is the path to the directory to read.
          dir,
          // 'withFileTypes' makes fs.readdir return an array of Dirent (directory entry) objects.
          // Each Dirent entry object represents a file or directory and has methods like isFile and isDirectory to check the type.
          { withFileTypes: true },
          // A callback function to handle the response
          (err, entries) => {
            // Checking if there was an error
            if (err) {
              // If there was an error, reject the Promise with it
              reject(err);
            } else {
              // If there was no error, resolve the Promise with the array of entries
              resolve(entries);
            }
          }
        );
      }
    );
    // Waiting for the Promise to be resolved with an array of entries
    const entries = await entriesPromise;


    // Looping through the array of entries
    for (let entry of entries) {
      // Check if entry name is in ignoredPaths
      if (ignoredPaths.includes(entry.name)) {
        // If it is, skip it
        ignoredPathsAcc++;
        continue;
      }
      // Joining the current directory with the entry name to get the full file path

      // console.log('findSourceInline: findJsxFiles: entry', entry);
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) { // If the entry is a directory
        // Recursively search subdirectories by calling findJsxFiles on the full path
        jsxFiles = jsxFiles.concat(
          await findJsxFiles(fullPath)
        );
        // If the entry is a file with a .jsx extension
      } else if (entry.isFile() && path.extname(fullPath) === '.jsx') {
        // Add the file path to the array of .jsx file paths
        jsxFiles.push(fullPath);
      }
    }
    // Return the array of .jsx file paths
    // console.log('findSourceInline: findJsxFiles: ignoredPathsAcc', ignoredPathsAcc);
    return jsxFiles;
  }

  const fileMatches = [];

  const jsxFiles = await findJsxFiles(targetDir); // Call the findJsxFiles function to get .jsx file paths

  // console.log('findSourceInline: jsxFiles', jsxFiles);

  // const escapeRegExp = async (string) => {
  //   return await string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // };


  // const matchFunc = async (jsxFilePath, dataContext) => {

  //   const fileData = await fs.promises.readFile(jsxFilePath, 'utf8'); // Read the content of each .jsx file

  //   const allLines = fileData.split('\n');

  //   const { key, value, textContent } = dataContext;

  //   const string = (key === 'id' || key === 'className') ? `${key}\\W*=\\W*${value}` : textContent;

  //   const escapedString = await escapeRegExp(string);

  //   const matchString = new RegExp(`^(?!.*(?://|{/\\*)).*\\W*${escapedString}(?:\\W)`, 'gm');

  //   // if (key === 'id' || key === 'className') {
  //   //   matchString = new RegExp(`^(?!.*(?://|{/\\*)).*\\W*${key}\\W*=\\W*${value}(?:\\W)`, 'gm');
  //   // }
  //   //   else {
  //   //     matchString = new RegExp(`^(?!.*(?://|{/\\*)).*\\W*${value}(?:\\W)`, 'gm');
  //   //   }
  //   let match;
  //   while ((match = matchString.exec(fileData)) !== null) {
  //     let line = fileData.substring(0, match.index).split('\n').length;
  //     let lineText = allLines[line - 1].trim();
  //     if (!lineText.includes(value)) {
  //       line = fileData.substring(0, match.index).split('\n').length + 1;
  //       lineText = allLines[line - 1].trim();

  //     }

  //     const matchData = {
  //       key,
  //       value,
  //       line,
  //       path: jsxFilePath.replace(targetDir + path.sep, '/'),
  //       lineText,
  //     };

  //     fileMatches.push(matchData);
  //   }
  // }

  for (const jsxFilePath of jsxFiles) {
    // console.log('findSourceInline: jsxFilePath', jsxFilePath);

    const dataContext = {
      selector,
      selectorStart,
      id,
      className,
      textContent,
    };
    const fileData = await fs.promises.readFile(jsxFilePath, 'utf8'); // Read the content of each .jsx file

    const allLines = fileData.split('\n');

    // for (let [key, value] of Object.entries(cssJsDx)) {
    //   console.log('key', key);
    //   console.log('value', value);
    // }

    for (let [key, value] of Object.entries(dataContext)) {
      if (fileMatches.length > 0) {
        break;
      }
      // matchFunc(jsxFilePath, dataContext);

      if (value && (key === 'id' || key === 'className')) {
        //   // const matchKeyValue = new RegExp(`^(?!.*(?://|{/\\*)).*\\s*${key}\\s*=\\s*['"]${value}['"](?!\\w)`, 'gm');
        const matchKeyValue = new RegExp(`^(?!.*(?://|{/\\*)).*\\W*${key}\\W*=\\W*${value}(?:\\W)`, 'gm');
        // ^ : beginning of string
        // (?!...) : a negative lookahead assertion, i.e. anything that doesn't match the included string
        // .* : any number of any characters (including newlines)
        // (?:...) : a positive lookahead assertion, i.e. anything that matches the included string
        // //|{/\\* : a string that matches either // OR {/*, i.e. commented out code
        // so what we have done is a positive lookahead inside of a negative lookahead, i.e. do not include any x that includes y.
        // .* : look for the lookaheads anywhere up to this point in the string
        // \\W* : whitespace or symbols (i.e. non-alpha-numeric characters). 0 || more times
        // ${key} : the key we are looking for
        // \\W* : ""
        // = : equals sign
        // \\W* : ""
        // ${value} : the value we are looking for
        // \\W* : ""
        // (?:...) : ""
        // \\W : ""
        // gm : global and multiline


        let match;

        while ((match = matchKeyValue.exec(fileData)) !== null) {
          let line = fileData.substring(0, match.index).split('\n').length;
          let lineText = allLines[line - 1].trim();
          if (!lineText.includes(value)) {
            line = fileData.substring(0, match.index).split('\n').length + 1;
            lineText = allLines[line - 1].trim();

          }

          const matchData = {
            key,
            value,
            line,
            path: jsxFilePath.replace(targetDir + path.sep, '/'),
            lineText,
          };

          fileMatches.push(matchData);
        }
      }
      else if (value && fileMatches.length === 0 && key === 'textContent') {
        // const matchKeyValue = new RegExp(`^(?!.*(?://|{/\\*)).*\\s*${key}\\s*=\\s*['"]${value}['"](?!\\w)`, 'gm');
        const matchTextContent = new RegExp(`^(?!.*(?://|{/\\*)).*\\W*${textContent}(?:\\W)`, 'gm');
        let match;
        while ((match = matchTextContent.exec(fileData)) !== null) {
          let line = fileData.substring(0, match.index).split('\n').length;
          let lineText = allLines[line - 1].trim();
          if (!lineText.includes(value)) {
            line = fileData.substring(0, match.index).split('\n').length + 1;
            lineText = allLines[line - 1].trim();

          }

          const matchData = {
            key,
            value,
            line,
            path: jsxFilePath.replace(targetDir + path.sep, '/'),
            lineText,
          };

          fileMatches.push(matchData);
        }
      }
    }
  }


  if (fileMatches.length > 0) {

    const filePaths = fileMatches.map(match => match.path).join(', ');
    console.log('\n\n');
    console.log(`findSourceInline: : inlineSyle: matches for ${selector} found in the following files : ${filePaths}`);
    console.log('fileMatches', fileMatches);

  }

  else {
    console.warn(`findSourceInline: : inlineSyle: No files matching ${cssTextJsArr} were found in ${targetDir} for selector ${selector}`);
    console.warn('findSourceInline: : inlineSyle: fileMatches', fileMatches);
  }
  return fileMatches;


}

export { findSourceInline }
