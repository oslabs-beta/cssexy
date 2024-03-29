import fs from 'fs';
import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import ignore from 'ignore';

const patchFile = async (data, targetDir) => {
  try {
    // importing the target directory path from the environment variables. later we can set this programmatically.
    // const targetDir = path.resolve(process.cwd(), '..');
    console.log('patchFile: targetDir:', targetDir);
    console.log('\n\n');

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

      // console.log('data updated', data);

      const textAllJs = textPrevAllJs.replace(new RegExp(textPrevJs, 'g'), textJs);
      // console.log('\n\n');

      // Read directory contents
      // const dirData = await fs.promises.readdir(targetDir);
      // console.log('dirData:', dirData);

      async function findJsxFiles() {
        let jsxFiles = [];
        // const dir = targetDir;
        // console.log('dir:', dir);
        // console.log('targetDir:', targetDir);
        const entriesPromise = new Promise((resolve, reject) => {
          fs.readdir(targetDir, { withFileTypes: true }, (err, entries) => {
            if (err) {
              reject(err);
            } else {
              resolve(entries);
            }
          });
        });
        const entries = await entriesPromise;
        // const gitignore = await ignore().add((await fs.promises.readFile(path.join(targetDir, '.gitignore'))).toString());
        // const gitignorePaths = (await fs.promises.readFile(path.join(targetDir, '.gitignore'))).toString().split('\n').map(p => path.join(targetDir, p)).filter(p => !p.endsWith('/') && !p.endsWith('\\'));
        // console.log('gitignore:', gitignorePaths);
        // console.log('\n\n');


        for (let entry of entries) {
          const fullPath = path.join(targetDir, entry.name);
          if (entry.isDirectory()) {
            jsxFiles = jsxFiles.concat(await findJsxFiles(fullPath));
          } else if (entry.isFile() && path.extname(fullPath) === '.jsx') {
            jsxFiles.push(fullPath);
          }
        }
        // console.log('jsxFiles:', jsxFiles);
        return jsxFiles;
      }

      const jsxFiles = await findJsxFiles();
      // console.log('jsxFiles:', jsxFiles);

      jsxFiles.forEach(async (jsxFilePath) => {
        const fileData = await fs.promises.readFile(jsxFilePath, 'utf8');

        // Use regex to find matches
        const inlineContents = fileData.match(new RegExp(textPrevAllJs));
        if (!inlineContents) {
          // console.log('\n\n');
          // console.log('inlineContents not found in file', jsxFilePath);
          return false;
        }
        // console.log(`Selector ${textPrevAllJs} found in file ${jsxFilePath}`);

        // console.log('inlineContents:', inlineContents);

        const inlineContentsStr = inlineContents[0];

        const newFileData = fileData.replace(new RegExp(inlineContentsStr, 'g'), textAllJs);
        await fs.promises.writeFile(jsxFilePath, newFileData, 'utf8');

      });
    }
    else {
      // console.log('\n\n');
      // console.log('patchFile: data:', data);
      // console.log('\n\n');
      // console.log('patchFile, first char of sourcePath:', data?.sourcePath[0] || 'undefined');

      const targetFilePath = data.sourcePath[0] === '.' ? `${targetDir}${data.sourcePath.slice(1)}` : data.sourcePath;

      // console.log('patchFile: name:', name);

      // console.log('targetFilePath:', targetFilePath);
      // console.log('\n\n');
      // console.log('patchFile: selector:', selector);
      // console.log('\n\n');
      // console.log('patchFile: value:', value);
      // console.log('\n\n');
      // console.log('patchFile: valuePrev:', valuePrev);
      // console.log('\n\n');

      // Read file contents
      const fileData = await fs.promises.readFile(targetFilePath, 'utf8');

      // Use regex to find matches
      const selectorContents = fileData.match(new RegExp(`${selector}\\s*\\{([^}]*)`));
      if (!selectorContents) {
        // console.log('\n\n');
        // console.log(`Selector ${selector} not found in file ${targetFilePath}`);
        // console.log('\n\n');
        return false;
      }
      const selectorContentsStr = selectorContents[0];
      // console.log('\n\n');
      // console.log('writeFile: selectorContentsStr:', selectorContentsStr);

      const matches = selectorContentsStr.match(new RegExp(`\\s*${name}:([^;]*);`));
      if (!matches) {
        console.log(`Line with ${name}: not found in selector ${selector} in file ${targetFilePath}`);
        return false;
      }
      const line = matches[0];

      const patchedLine = line.replace(new RegExp(valuePrev, 'g'), value);
      // console.log('writeFile: patchedLine:', patchedLine);

      // console.log('endNewContent');
      const selectorContentsStrNew = selectorContentsStr.replace(line, patchedLine);
      const newFileData = fileData.replace(selectorContentsStr, selectorContentsStrNew);

      await fs.promises.writeFile(targetFilePath, newFileData, 'utf8');
    }

    return true;


  } catch (err) {
    console.error('Error writing to file', err);
    return undefined;
  }
  // finally {
  //     // It is considered a best practice to close resources such as connections in a finally block.
  //     // This ensures they are properly cleaned up, even in the event of an error.
  //     // Leaving connections open can lead to resource leaks and potential issues with system performance.

  // }
}

export { patchFile };
