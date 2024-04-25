import fs from 'fs';
import path from 'path';

// import {cssToReact} from './cssToReact.js';

const patchFile = async ({data, target}) => {
  try {
    // properties with Prev are the previous values to be searched for and replaced in the matching file.

    console.log('data', data);
    console.log('target', target);
    const selector = target.targetSelector;
    const text = data.text;
    const textPrev = data.textPrev;
    const textPrevJs = data.textPrevJs;
    const name = data.name;
    const value = data.value;
    const valuePrev = data.valuePrev;
    const textPrevAll = data.textPrevAll;

    const startLine = data.range.startLine;
    const endLine = data.range.endLine;
    const targetDir = target.targetDir;

    // INLINE STYLE
    // Checking if textPrevAll has content and sourcePath is not provided.
    // if that's the case, we have an inline style.
    if (!startLine && !endLine) {

      console.log('startLine', startLine, 'endLine', endLine, 'so this is a inline style');

      const sourcePath = target.targetSourceInline.path;

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

      // adding them to data, in case we want to console log the object to see the changes. This has no functional role beyond that.
      data.textPrevAllJs = textPrevAllJs;
      data.textPrevJs = textPrevJs;
      data.textAllJs = textAllJs;
      data.textJs = textJs;

      // console.log('data updated', data);

      const filePath = sourcePath
      const fileData = await fs.promises.readFile(filePath, 'utf8'); // Read the content of each .jsx file

      // Use regex to find matches of textPrevAllJs in the file content
      const inlineContents = fileData.match(new RegExp(textPrevAllJs));
      if (!inlineContents) {
        // If no matches found, move on to the next .jsx file
        return;
      }

      // console.log('inlineContents', inlineContents);

      const inlineContentsStr = inlineContents[0]; // Get the matched content
      // Replace inlineContentsStr with textAllJs
      const newFileData = fileData.replace(new RegExp(inlineContentsStr, 'g'), textAllJs);
      // Write the modified content back to the file
      await fs.promises.writeFile(filePath, newFileData, 'utf8');
    }

    // otherwise
    // REGULAR STYLE

    else {
      console.log('startLine', startLine, 'endLine', endLine, 'so this is a regular style');

      const sourcePath = target.targetSourceRegular.path;


      // console.log('sourcePath', sourcePath);

      const filePath = sourcePath[0] === '.' ? `${targetDir}${sourcePath.slice(1)}` : sourcePath;


      console.log('filePath', filePath);

      // Read file contents
      const fileData = await fs.promises.readFile(filePath, 'utf8');

      // Use regex to find matches
      const selectorContents = fileData.match(new RegExp(`${selector}\\s*\\{([^}]*)`));

      if (!selectorContents) {
        console.log(`Selector ${selector} not found in file ${sourcePath}`);
        return false;
      }

      const selectorContentsStr = selectorContents[0];

      const matches = selectorContentsStr.match(new RegExp(`\\s*${name}:([^;]*);`));

      if (!matches) {
        console.log(`Line with ${name}: not found in selector ${selector} in file ${sourcePath}`);
        return false;
      }

      const line = matches[0];

      const patchedLine = line.replace(new RegExp(valuePrev, 'g'), value);

      const selectorContentsStrNew = selectorContentsStr.replace(line, patchedLine);
      const newFileData = fileData.replace(selectorContentsStr, selectorContentsStrNew);

      await fs.promises.writeFile(filePath, newFileData, 'utf8');
      return true;
    }
    // Return true after successful patching

  } catch (err) {
    console.error('Error writing to file', err);
    return undefined;
  }
}

export { patchFile }
