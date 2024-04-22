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

  // we need to convert the strings to js format
  // helper function to convert css string format to js format
  const cssToJsText = async (prev) => {
    // console.log('findSourceInline: cssToJsText: prev', prev);
    if (!prev) return null;
    return prev.replace(new RegExp(`\: `, 'g'), `\: \'`)
      .replace(new RegExp(`\; `, 'g'), `', `)
      .replace(new RegExp(`\;`, 'g'), `'`);
  }

  // example: old values
  // from: 'position: absolute; top: 60%; color: white;'
  //   to: "position: 'absolute', top: '60%', color: 'white'"
  const cssTextJs = await cssToJsText(cssText);
  // const cssTextJsArr = cssToReact(cssText).split(', ');
  const cssTextJsArr = cssToReact(cssText).split(', ').map(part => part.replaceAll("'", ''));

  // console.log('findSourceInline: cssTextJs', cssTextJs);

  // const cssTextJsArr = cssTextJs;
  // console.log('findSourceInline: cssTextJsArr', cssTextJsArr);

  // these are available in the inlineRules, cssProperties array itself. each cssProperty is an object with name and value.

  const cssJsDx = {}

  for (const keyValue of cssTextJsArr) {
    const kvSplit = keyValue.split(':');
    cssJsDx[kvSplit[0].trim()] = kvSplit[1].trim()
  }

  // inlineRules.cssProperties.forEach(cssProperty => {
  //   if (!cssDx[cssProperty.name] && cssProperty.text) cssDx[cssProperty.name] = cssProperty.value;
  // });



  console.log('findSourceInline: cssJsDx', cssJsDx);
  console.log('\n\n');
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

  const inlineFileMatches = [];

  const jsxFiles = await findJsxFiles(targetDir); // Call the findJsxFiles function to get .jsx file paths

  // console.log('findSourceInline: jsxFiles', jsxFiles);

  for (const jsxFilePath of jsxFiles) {
    // console.log('findSourceInline: jsxFilePath', jsxFilePath);
    const fileData = await fs.promises.readFile(jsxFilePath, 'utf8'); // Read the content of each .jsx file

    const dataContext = {
      selector,
      selectorStart,
      id,
      textContent,
      className,
    };

    // for (let [key, value] of Object.entries(cssJsDx)) {
    //   console.log('key', key);
    //   console.log('value', value);
    // }

    for (let [key, value] of Object.entries(dataContext)) {

      if (value && (key === 'className' || key === 'id')) {

        const kvMatch = fileData.match(new RegExp(`\\s*${key}[^a-zA-Z]*=[^a-zA-Z]*${value}`));

        // should probably add the result, if any, to an array or something.
        // if more than one match found, iterate through those, looking for textContent.
        // then if more than one textContent or if no matches, iterate through that selection of files (remaining matches or all), doing our kvMatch for each style/property.
        if (kvMatch) {
          const sourceLineNumber = fileData.substring(0, kvMatch.index).split('\n').length

          const jsxFilePathShort = jsxFilePath.replace(targetDir + path.sep, '/');

          console.log('findSourceInline: \n',
            'key:', key, '\n',
            'value:', value, '\n',
            'jsxFilePathShort:', jsxFilePathShort, '\n',
            'sourceLineNumber:', sourceLineNumber, '\n',
          );

          const matchData = {
            path: jsxFilePathShort,
            line: sourceLineNumber,
          };

          inlineFileMatches.push(matchData);
        }
      }
    }
  }

  if (inlineFileMatches.length > 0) {
    const filePaths = inlineFileMatches.map(match => match.path).join(', ');
    console.log(`findSourceInline: : inlineSyle: matches for cssTextJsArr ${cssTextJsArr} found in the following files : ${filePaths}`);

  }

  else {
    console.warn(`findSourceInline: : inlineSyle: No files matching ${cssTextJsArr} were found in ${targetDir} for selector ${selector}`);
    console.warn('findSourceInline: : inlineSyle: inlineFileMatches', inlineFileMatches);
  }
  return inlineFileMatches;


}

export { findSourceInline }
