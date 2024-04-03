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

    if (data.textPrevAll.length > 0 && !data.sourcePath) {

      const textPrevAllJs = textPrevAll.replace(new RegExp(`\: `, 'g'), `\: \'`)
        .replace(new RegExp(`\; `, 'g'), `', `)
        .replace(new RegExp(`\;`, 'g'), `'`);

      data.textPrevAllJs = textPrevAllJs;

      const textPrevJs = textPrev.replace(new RegExp(`\: `, 'g'), `\: \'`)
        .replace(new RegExp(`\; `, 'g'), `', `)
        .replace(new RegExp(`\;`, 'g'), `'`);
      data.textPrevJs = textPrevJs;

      const textJs = text.replace(new RegExp(`\: `, 'g'), `\: \'`)
        .replace(new RegExp(`\; `, 'g'), `', `)
        .replace(new RegExp(`\;`, 'g'), `'`);
      data.textJs = textJs;

      const textAllJs = textPrevAllJs.replace(new RegExp(textPrevJs, 'g'), textJs);

      async function findJsxFiles(dir) {
        let jsxFiles = [];
        const entriesPromise = new Promise((resolve, reject) => {
          fs.readdir(dir, { withFileTypes: true }, (err, entries) => {
            if (err) {
              reject(err);
            } else {
              resolve(entries);
            }
          });
        });
        const entries = await entriesPromise;

        for (let entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            jsxFiles = jsxFiles.concat(await findJsxFiles(fullPath));
          } else if (entry.isFile() && path.extname(fullPath) === '.jsx') {
            jsxFiles.push(fullPath);
          }
        }
        // console.log('jsxFiles:', jsxFiles);
        return jsxFiles;
      }

      const jsxFiles = await findJsxFiles(targetDir);
      // console.log('jsxFiles:', jsxFiles);

      jsxFiles.forEach(async (jsxFilePath) => {
        const fileData = await fs.promises.readFile(jsxFilePath, 'utf8');

        // Use regex to find matches
        const inlineContents = fileData.match(new RegExp(textPrevAllJs));
        if (!inlineContents) {

          return false;
        }

        const inlineContentsStr = inlineContents[0];

        const newFileData = fileData.replace(new RegExp(inlineContentsStr, 'g'), textAllJs);
        await fs.promises.writeFile(jsxFilePath, newFileData, 'utf8');
      });
    }
    else {

      const targetFilePath = data.sourcePath[0] === '.' ? `${targetDir}${data.sourcePath.slice(1)}` : data.sourcePath;

      // Read file contents
      const fileData = await fs.promises.readFile(targetFilePath, 'utf8');

      // Use regex to find matches
      const selectorContents = fileData.match(new RegExp(`${selector}\\s*\\{([^}]*)`));
      if (!selectorContents) {
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

    return true;

  } catch (err) {
    console.error('Error writing to file', err);
    return undefined;
  }
}

export { patchFile }
