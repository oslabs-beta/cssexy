import fs from 'fs';
import path from 'path';

import { cssToReact } from './cssToReact.js';

const findSourceInline = async ({ inlineRules, data, target }) => {

  console.log('findSourceInline: inlineRules.cssProperties.length', inlineRules.cssProperties.length);
  // console.log('findSourceInline: data', data);
  // console.warn('findSourceInline: target', target);

  const targetDir = target.targetDir;
  const cssText = inlineRules.cssText;
  const selector = data?.selector;
  const selectorAlt = data?.selectorAlt;
  const className = data?.className;
  const id = data?.id;
  const textContent = data?.textContent;

  const dataContext = {
    id,
    className,
    textContent,
  };
  console.log('\n\n');
  console.log('findSourceInline: dataContext', dataContext);

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
  // Recursive function to find .jsx files in the target directory
  const findJsxFiles = async (dir) => {
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
  // console.log('findSourceInline: jsxFiles', jsxFiles);

  const fileMatches = [];

  const jsxFiles = await findJsxFiles(targetDir); // Call the findJsxFiles function to get .jsx file paths

  console.log('findSourceInline: cssText', cssText);
  if (!cssText) { return null };


  // example: old values
  // from: 'position: absolute; top: 60%; color: white;'
  //   to: "position: 'absolute', top: '60%', color: 'white'"

  const callCssToReact = (string) => {
    let arr = []
    const rules = string.split(';').filter(rule => rule.trim() !== '');

    console.log('findSourceInline: rules', rules);

    for (let rule of rules) {
      const res = cssToReact(rule);
      const count = res.split(":").length - 1;

      console.log('findSourceInline: callCssToReact: res for', res);
      // console.log('count', count);
      if (count > 1) {
        arr.push(...res.split(", "));
      }
      else {
        arr.push(res);
      }
    }
    return arr.map(part => part.replaceAll("'", ''));
  }

  const cssJsArr = callCssToReact(cssText);
  /*
  example:
  cssArr [
    'position: fixed',
    'top: 0',
    'right: 0',
    'bottom: 0',
    'left: 0',
    'background: transparent'
  ]
  */
  // console.log('\n\n');
  console.log('findSourceInline: cssArr', cssJsArr);
  // console.log('\n\n');

  const cssJsDx = {}

  for (const typeValue of cssJsArr) {
    const keyValuePair = typeValue.split(':');

    cssJsDx[keyValuePair[0].trim()] = keyValuePair[1].trim()
  }

  /*
  example:
  cssJsDx {
    position: 'fixed',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    background: 'transparent'
  }
  */

  console.warn('findSourceInline: cssJsDx', cssJsDx);

  const matchFunc = async ({ jsxFilePath, type, value }) => {
    // Read the content of each .jsx file into memory
    const fileData = await fs.promises.readFile(jsxFilePath, 'utf8');

    // Split the file content into an array of lines
    const allLines = fileData.split('\n');

    // console.log('matchFunc type', type);
    // console.log('matchFunc value', value);

    // the piece of our regex that differs whether id/classname or textContent
    const targetString = (type === 'id' || type === 'className') ? `${type}\\W*=\\W*${value}` : value;
    // console.log('findSourceInline: matchFunc targetString', targetString);
    // ${type} : the type we are looking for
    // \\W* : whitespace or symbols (i.e. non-alpha-numeric characters). 0 || more times
    // = : equals sign
    // \\W* : ""
    // ${value} : the value we are looking for

    // the regex including the
    let targetRegex = new RegExp(`^(?!.*(?://|{/\\*)).*\\W*${targetString}(?:\\W)`, 'gm');
    //   // const targetRegex = new RegExp(`^(?!.*(?://|{/\\*)).*\\s*${type}\\s*=\\s*['"]${value}['"](?!\\w)`, 'gm');
    // const targetRegex = new RegExp(`^(?!.*(?://|{/\\*)).*\\W*${string}(?:\\W)`, 'gm');
    // ^ : beginning of string
    // (?!...) : a negative lookahead assertion, i.e. anything that doesn't match the included string
    // .* : any number of any characters (including newlines)
    // (?:...) : a positive lookahead assertion, i.e. anything that matches the included string
    // //|{/\\* : a string that matches either // OR {/*, i.e. commented out code
    // so what we have done is a positive lookahead inside of a negative lookahead, i.e. do not include any x that includes y.
    // .* : look for the lookaheads anywhere up to this point in the string
    // \\W* : whitespace or symbols (i.e. non-alpha-numeric characters). 0 || more times
    // targetString : the string we are looking for
    // \\W* : ""
    // (?:...) : ""
    // \\W : ""
    // gm : global and multiline

  //   let stylesRegex = /\s*([^:\s]+)\s*:\s*['"]?([^'"]+)['"]?\s*(,|$)/g;
  //   let stylesMatch = stylesRegex.exec(fileData);

  //  if (stylesMatch !== null) {
  //     console.log(`findSourceInline: stylesMatch: ${match[1]}, Value: ${match[2]}`);
  //   }


    let selectorMatch = targetRegex.exec(fileData);
    if (selectorMatch !== null) {
      // let selectorMatch;
      // while ((selectorMatch = targetRegex.exec(fileData)) !== null) {

      let line = fileData.substring(0, selectorMatch.index).split('\n').length;
      // fileData : the contents of the current .jsx file we are searching
      // substring(start, end) : extract a substring from the fileData starting at index start and ending at index end (not inclusive)
      // selectorMatch.index : the index at which the RegExp found a match
      // split('\n') : split the fileData into an array of lines
      // length : the total number of lines in the file (i.e. 1-indexed)

      // let line = allLines.slice(0, selectorMatch.index).findIndex(line => line.match(selectorMatch)) + 1;
      // allLines : the contents of the current .jsx file, split into an array of lines
      // trim() : remove whitespace from the start and end of the line

      console.log('findSourceInline: 238 line', line);
      let lineText = allLines[line - 1].trim();
      console.log('\n');
      // [line - 1] : the line of code that the RegExp found a match on
      let lineContext = allLines.slice(line - 2, line + 2).join('\n');


      if (!lineText.includes(value)) {
        // includes() : return true if the given string is contained within the calling string.
        // console.log('\n\n');
        // console.log('line does not contain value. adding 1 to line');
        // console.log('\n\n');
        // if the previous line does not contain the value, we have a multi-line match
        // so we increment the line count by 1
        line += 1;
        lineText = allLines[line - 1].trim();
        lineContext = allLines.slice(line - 2, line + 2).join('\n');

      }
      // console.log('\n\n');
      // console.log('findSourceInline: lineContext', lineContext);
      try {
        const lineContextRegex = new RegExp({ lineContext }, 'gm');
        const lineContextMatch = lineContextRegex.exec(fileData);
        if (lineContextMatch) {
          // console.log('findSourceInline: lineContextMatch', lineContextMatch);
          // console.log('findSourceInline: lineContextMatch.index', lineContextMatch.index);
          // console.log('findSourceInline: lineContextMatch.input', lineContextMatch.input);
          // console.log('findSourceInline: actual line number', fileData.substring(0, lineContextMatch.index).split('\n').length);
        }
      } catch (e) {
        console.log('findSourceInline: Error processing data:', e.name, e.message);
      }

      console.log('findSourceInline: line', line);
      console.log('findSourceInline: lineText', lineText);
      console.log('findSourceInline: lineContext', lineContext);
      console.log('findSourceInline: cssJsArr', cssJsArr);
      console.log('findSourceInline: cssJsDx', cssJsDx);


      const matchData = {
        type,
        typeValue: value,
        path: jsxFilePath,
        pathRelative: jsxFilePath.replace(targetDir + path.sep, '/'),
        line,
        lineText,
        lineContext,
        stylesJsArr: cssJsArr,
        stylesJsDx: cssJsDx,
      };

      fileMatches.push(matchData);
    }
  }

  for (const jsxFilePath of jsxFiles) {
    // console.log('findSourceInline: each jsxFilePath', jsxFilePath);
    for (let [type, value] of Object.entries(dataContext)) {
      if (fileMatches.length > 0) {
        break;
      }
      if (!value) {
        continue;
      }
      await matchFunc({ jsxFilePath, type, value });
    }

  }

  if (fileMatches.length > 0) {

    const filePaths = fileMatches.map(match => match.path).join(', ');

    // console.log('\n\n');
    // console.log(`findSourceInline: : inlineStyle: ${selector} found in: ${filePaths}`);

    for (let [type, value] of Object.entries(cssJsDx)) {
      // console.log('findSourceInline: ', type, ': ', value);
    }
    // console.log('fileMatches', fileMatches);

  }

  else {
    console.warn(`findSourceInline: : inlineStyle: No files matching ${cssJsArr} were found in ${targetDir} for selector ${selector}`);
    console.warn('findSourceInline: : inlineStyle: fileMatches', fileMatches);
  }
  return fileMatches;


}

export { findSourceInline }
