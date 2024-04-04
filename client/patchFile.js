import fs from 'fs';
import path from 'path';

const patchFile = async (data, targetDir) => {
  try {
    const selector = data?.selector;
    const text = data.text;
    const textPrev = data.textPrev;
    const name = data.name;
    const value = data.value;
    const valuePrev = data.valuePrev;
    const textPrevAll = data.textPrevAll;

    if (data.textPrevAll.length > 0 && !data.sourcePath) { // Checking if textPrevAll has content and sourcePath is not provided

      const textPrevAllJs = textPrevAll.replace(new RegExp(`\: `, 'g'), `\: \'`)
        .replace(new RegExp(`\; `, 'g'), `', `)
        .replace(new RegExp(`\;`, 'g'), `'`);

      data.textPrevAllJs = textPrevAllJs; // Assigning the formatted textPrevAll to data.textPrevAllJs

      // Repeating the pattern replacement for textPrev and text
      const textPrevJs = textPrev.replace(new RegExp(`\: `, 'g'), `\: \'`)
        .replace(new RegExp(`\; `, 'g'), `', `)
        .replace(new RegExp(`\;`, 'g'), `'`);
      data.textPrevJs = textPrevJs; // Assigning the formatted textPrev to data.textPrevJs

      const textJs = text.replace(new RegExp(`\: `, 'g'), `\: \'`)
        .replace(new RegExp(`\; `, 'g'), `', `)
        .replace(new RegExp(`\;`, 'g'), `'`);
      data.textJs = textJs; // Assigning the formatted text to data.textJs

      const textAllJs = textPrevAllJs.replace(new RegExp(textPrevJs, 'g'), textJs); // Replacing textPrevJs occurrences with textJs in textPrevAllJs

      // Recursive function to find .jsx files in the target directory
      async function findJsxFiles(dir) {
        let jsxFiles = []; // Creating an empty array to store the found .jsx file paths
        const entriesPromise = new Promise( // Creating a Promise that will be resolved with an array of entries
          (resolve, reject) => {
            fs.readdir( // Calling fs.readdir to read the contents of a directory
              dir, // The directory to read from
              { withFileTypes: true }, // Passing an options object: { withFileTypes: true }
              (err, entries) => { // A callback function to handle the response
                if (err) { // Checking if there was an error
                  reject(err); // If there was an error, reject the Promise with it
                } else {
                  resolve(entries); // If there was no error, resolve the Promise with the array of entries
                }
              }
            );
          }
        );
        const entries = await entriesPromise; // Waiting for the Promise to be resolved with an array of entries


        for (let entry of entries) { // Looping through the array of entries
          const fullPath = path.join(dir, entry.name); // Joining the current directory with the entry name to get the full file path
          if (entry.isDirectory()) { // If the entry is a directory
            jsxFiles = jsxFiles.concat( // Recursively search subdirectories by calling findJsxFiles on the full path
              await findJsxFiles(fullPath)
            );
          } else if (entry.isFile() && path.extname(fullPath) === '.jsx') { // If the entry is a file with a .jsx extension
            jsxFiles.push(fullPath); // Add the file path to the array of .jsx file paths
          }
        }
        return jsxFiles; // Return the array of .jsx file paths
      }


      const jsxFiles = await findJsxFiles(targetDir); // Call the findJsxFiles function to get .jsx file paths

      jsxFiles.forEach(async (jsxFilePath) => {
        const fileData = await fs.promises.readFile(jsxFilePath, 'utf8'); // Read the content of each .jsx file

        // Use regex to find matches of textPrevAllJs in the file content
        const inlineContents = fileData.match(new RegExp(textPrevAllJs));
        if (!inlineContents) {
          return false; // If no matches found, exit
        }

        const inlineContentsStr = inlineContents[0]; // Get the matched content

        const newFileData = fileData.replace(new RegExp(inlineContentsStr, 'g'), textAllJs); // Replace inlineContentsStr with textAllJs

        await fs.promises.writeFile(jsxFilePath, newFileData, 'utf8'); // Write the modified content back to the file
      });
    }
    else {

      const targetFilePath = data.sourcePath[0] === '.' ? `${targetDir}${data.sourcePath.slice(1)}` : data.sourcePath;

      // Read the content of the target file
      const fileData = await fs.promises.readFile(targetFilePath, 'utf8');

      // Use regex to find matches of the selector in the content
      const selectorContents = fileData.match(new RegExp(`${selector}\s*\{([^}]*)`));
      if (!selectorContents) {
        return false; // If selector content not found, exit
      }
      const selectorContentsStr = selectorContents[0]; // Get the matched selector content

      // Find and replace the line containing name with the value
      const matches = selectorContentsStr.match(new RegExp(`\s*${name}:([^;]*);`));
      if (!matches) {
        console.log(`Line with ${name}: not found in selector ${selector} in file ${targetFilePath}`);
        return false;
      }
      const line = matches[0];

      const patchedLine = line.replace(new RegExp(valuePrev, 'g'), value); // Replace valuePrev with value in the line

      const selectorContentsStrNew = selectorContentsStr.replace(line, patchedLine); // Replace the line in the selector content
      const newFileData = fileData.replace(selectorContentsStr, selectorContentsStrNew); // Replace the selector content in the file data

      await fs.promises.writeFile(targetFilePath, newFileData, 'utf8'); // Write the modified content back to the file
    }

    return true; // Return true after successful patching

  } catch (err) {
    console.error('Error writing to file', err); // Log error if any
    return undefined; // Return undefined in case of error
  }
}

export { patchFile } // Export the patchFile function for external use
