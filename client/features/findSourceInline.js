import fs from 'fs';
import path from 'path';

import { cssToReact } from './cssToReact.js';

const findSourceInline = async (inlineRules, data, targetDir) => {

  const cssText = inlineRules.cssText;

  const selector = data.selector;
  // const sourcePath = data.sourcePath;

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

  if (!cssText) {return null};

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
      // console.log('findSourceInline: cssTextJs', cssTextJs);

      const cssTextJsArr = await cssTextJs.split(', ');
      // console.log('findSourceInline: cssTextJsArr', cssTextJsArr[0]);

      // const propertiesAndValues = [];
      // for (const propertyAndValue of textPrevAllJsArr) {
      //   const propAndValArr = propertyAndValue.split(':');
      //   propertiesAndValues.push({
      //     prop: propAndValArr[0].trim(),
      //     val: propAndValArr[1].trim()
      //   });
      // }
      // arrays will be helpful for string matching when there are line breaks rather than spaces
      // between the styles in a given react component.
      // const textPrevAllJsArr = textPrevAllJs.split(', ');
      // const textAllJsArr = textAllJs.split(', ');

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

      const inlineFileMatches = []

      const jsxFiles = await findJsxFiles(targetDir); // Call the findJsxFiles function to get .jsx file paths

      // console.log('findSourceInline: jsxFiles', jsxFiles);

      for (const jsxFilePath of jsxFiles) {
        // console.log('findSourceInline: jsxFilePath', jsxFilePath);
        const fileData = await fs.promises.readFile(jsxFilePath, 'utf8'); // Read the content of each .jsx file

        // Use regex to find matches of textPrevAllJs in the file content
        const inlineContents = fileData.match(new RegExp(cssTextJs));
        if (!inlineContents) {
          // If no matches found, move on to the next .jsx file
          // console.log('findSourceInline: no matches found in file', jsxFilePath);
          continue;
        }

        // Return data about the match
        const matchData = {
          targetSourceInline: jsxFilePath.replace(targetDir + path.sep, '/'),
          targetSourceInlineLineNumber: fileData.substring(0, inlineContents.index).split('\n').length,
          targetMatchText: inlineContents[0],
        };

        inlineFileMatches.push(matchData);
        // console.log('findSourceInline: inlineFileMatches', inlineFileMatches);


        // const inlineContentsStr = inlineContents[0]; // Get the matched content
        // Replace inlineContentsStr with textAllJs
        // const newFileData = fileData.replace(new RegExp(inlineContentsStr, 'g'), textAllJs);
        // // Write the modified content back to the file
        // await fs.promises.writeFile(jsxFilePath, newFileData, 'utf8');
      }

      if (inlineFileMatches.length > 0) {
        // console.log(`findSourceInline: : inlineSyle: matches for cssTextJsArr ${cssTextJsArr} found in the following files : ${inlineFileMatches.join(', ')}`);

      }

      else {
        // console.log(`findSourceInline: : inlineSyle: No files matching ${cssTextJsArr} were found in ${targetDir} for selector ${selector}`);
      }
      return inlineFileMatches;


  }

  export { findSourceInline }
