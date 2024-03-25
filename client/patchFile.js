import fs from 'fs';

const patchFile = async (data) => {

  try {
    // console.log('patchFile: data:', data);
    // importing the target directory path from the environment variables. later we can set this programmatically.
    const targetDirPath = process.env.VITE_TARGET_DIR_PATH;
    console.log('\n\n');
    console.log('patchFile: data:', data);
    console.log('\n\n');
    console.log('patchFile, first char of sourcePath:', data?.sourcePath[0] || 'undefined');
    console.log('\n\n');
    const targetFilePath = data.sourcePath[0] === '.' ? `${targetDirPath}${data.sourcePath.slice(1)}` : data.sourcePath;
    const selector = data.selector;
    // const text = data.text;
    // const textPrev = data.textPrev;
    const name = data.name;
    const value = data.value;
    const valuePrev = data.valuePrev;
    // console.log('patchFile: name:', name);

    // Read file contents
    const fileData = await fs.promises.readFile(targetFilePath, 'utf8');

    // Use regex to find matches
    const selectorContents = fileData.match(new RegExp(`${selector}\\s*\\{([^}]*)`));
    if (!selectorContents) {
      console.log(`Selector ${selector} not found in file ${targetFilePath}`);
      return false;
    }
    const selectorContentsStr = selectorContents[0];
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

export default patchFile;
