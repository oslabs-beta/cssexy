import fs from 'fs';
import path from 'path';

import {cssToReact} from './cssToReact.js';

const patchFile = async (data, targetDir) => {
  try {
    // properties with Prev are the previous values to be searched for and replaced in the matching file.

    const selector = data.selector;
    const text = data.text;
    const textPrev = data.textPrev;
    const textPrevJs = data.textPrevJs;
    const name = data.name;
    const value = data.value;
    const valuePrev = data.valuePrev;
    const textPrevAll = data.textPrevAll;
    const sourcePath = data.sourcePath;

    // console.log('data', data);
    // Checking if textPrevAll has content and sourcePath is not provided.
    // if that's the case, we have an inline style.
    if (textPrevAll.length > 0 && !sourcePath) {
      console.log('No sourcePath provided, so this is an inline style');

      // we need to convert the strings to js format
      // helper function to convert css string format to js format
      const cssToJsText = (prev) => {
        return prev.replace(new RegExp(`\: `, 'g'), `\: \'`)
        .replace(new RegExp(`\; `, 'g'), `', `)
        .replace(new RegExp(`\;`, 'g'), `'`);
      }

      // example: old values
      // from: 'position: absolute; top: 60%; color: white;'
      //   to: "position: 'absolute', top: '60%', color: 'white'"
      const textPrevAllJs = cssToJsText(textPrevAll);
      // console.log('textPrevAll', textPrevAll);

      console.log('textPrevAllJs', textPrevAllJs);

      // the property and its old value to be replaced
      // from: 'color: white;',
      //   to: "color: 'white'",
      const textPrevJs = cssToJsText(textPrev);

      // new value
      // from: 'color: red;',
      //   to: "color: 'red'",
      const textJs = cssToJsText(text);

      // Replacing textPrevJs occurrences with textJs in textPrevAllJs
      // We will eventually replace textPrevAllJs with textAllJs in the matching file
      // from: "position: 'absolute', top: '60%', color: 'white'"
      //   to: "position: 'absolute', top: '60%', color: 'red'",
      const textAllJs = textPrevAllJs.replace(new RegExp(textPrevJs, 'g'), textJs);


      const textPrevAllJsArr = textPrevAllJs.split(', ');
      console.log('textPrevAllArr', textPrevAllJsArr[0]);

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

      // adding them to data, in case we want to console log the object to see the changes. This has no functional role beyond that.
      data.textPrevAllJs = textPrevAllJs;
      data.textPrevJs = textPrevJs;
      data.textAllJs = textAllJs;
      data.textJs = textJs;

      // console.log('data updated', data);

      const inlineFileMatches = []

      const jsxFiles = await findJsxFiles(targetDir); // Call the findJsxFiles function to get .jsx file paths

      for (const jsxFilePath of jsxFiles) {
        const fileData = await fs.promises.readFile(jsxFilePath, 'utf8'); // Read the content of each .jsx file

        // Use regex to find matches of textPrevAllJs in the file content
        const inlineContents = fileData.match(new RegExp(textPrevAllJs));
        if (!inlineContents) {
          // If no matches found, move on to the next .jsx file
          continue;
        }

        // console.log('inlineContents', inlineContents);

        inlineFileMatches.push(jsxFilePath);
        console.log('inlineFileMatches', inlineFileMatches);

        const inlineContentsStr = inlineContents[0]; // Get the matched content
        // Replace inlineContentsStr with textAllJs
        const newFileData = fileData.replace(new RegExp(inlineContentsStr, 'g'), textAllJs);
        // Write the modified content back to the file
        await fs.promises.writeFile(jsxFilePath, newFileData, 'utf8');
      }

      if (inlineFileMatches.length > 0) {
        console.log(`patchFile: inlineSyle: matches for textPrevAllJs ${textPrevAllJs} found in the following files : ${inlineFileMatches.join(', ')}`);
      }
      else {
        console.log(`patchFile: inlineSyle: No files matching ${textPrevAllJs} were found in ${targetDir} for selector ${selector}`);
      }
    }

    // otherwise, it's a regular style
    else {
      console.log('sourcePath provided, so this is a regular style');

      const targetFilePath = sourcePath[0] === '.' ? `${targetDir}${data.sourcePath.slice(1)}` : sourcePath;

      // Read file contents
      const fileData = await fs.promises.readFile(targetFilePath, 'utf8');

      // Use regex to find matches
      const selectorContents = fileData.match(new RegExp(`${selector}\\s*\\{([^}]*)`));

      if (!selectorContents) {
        console.log(`Selector ${selector} not found in file ${targetFilePath}`);
        return false;
      }

      const selectorContentsStr = selectorContents[0];

      const matches = selectorContentsStr.match(new RegExp(`\\s*${name}:([^;]*);`));

      if (!matches) {
        console.log(`Line with ${name}: not found in selector ${selector} in file ${targetFilePath}`);
        return false;
      }

      const line = matches[0];

      const patchedLine = line.replace(new RegExp(valuePrev, 'g'), value);

      const selectorContentsStrNew = selectorContentsStr.replace(line, patchedLine);
      const newFileData = fileData.replace(selectorContentsStr, selectorContentsStrNew);

      await fs.promises.writeFile(targetFilePath, newFileData, 'utf8');
    }
    // Return true after successful patching
    return true;

  } catch (err) {
    console.error('Error writing to file', err);
    return undefined;
  }
}

export { patchFile }
