import fs from 'fs';

const patchFile = async (data) => {

    try {
      // console.log('patchFile: data:', data);
      const filePath = `/Users/home/ptri/backtrack2${data.sourcePath.slice(1)}`
      const selector = data.selector;
      // const text = data.text;
      // const textPrev = data.textPrev;
      const name = data.name;
      const value = data.value;
      const valuePrev = data.valuePrev;

      // console.log('patchFile: name:', name);

      // Read file contents
      const fileData = await fs.promises.readFile(filePath, 'utf8');

      // Use regex to find matches
      const selectorContents = fileData.match(new RegExp(`${selector}\\s*\\{([^}]*)`));
      if (!selectorContents) {
        console.log(`Selector ${selector} not found in file ${filePath}`);
        return false;
      }

      const selectorContentsStr = selectorContents[0];
      // console.log('writeFile: selectorContentsStr:', selectorContentsStr);

      const matches = selectorContentsStr.match(new RegExp(`\\s*${name}:([^;]*);`));
      if (!matches) {
        console.log(`Line with ${name}: not found in selector ${selector} in file ${filePath}`);
        return false;
      }
        const line = matches[0];

        const patchedLine = line.replace(new RegExp(valuePrev, 'g'), value);
        // console.log('writeFile: patchedLine:', patchedLine);

        // console.log('endNewContent');
        const selectorContentsStrNew = selectorContentsStr.replace(line, patchedLine);
        const newFileData = fileData.replace(selectorContentsStr, selectorContentsStrNew);

        await fs.promises.writeFile(filePath, newFileData, 'utf8');

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
