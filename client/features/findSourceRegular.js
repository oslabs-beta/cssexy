import fs from 'fs';
import path from 'path';

const findSourceRegular = async ({regularRules, data, targetDir}) => {
  try {
    // console.log('\n\n');
    // console.log('findSourceRegular');
    console.log('\n\n');

    console.log('findSourceRegular: data', data);
    console.log('\n\n');
    console.log('\n\n');
    console.log('findSourceRegular: regularRules', regularRules);
    console.log('\n\n');

    // console.log('findSourceRegular: regularRules.style.cssProperties', regularRules.style.cssProperties);
    // console.log('\n\n');
    const selector = data.selector;
    console.log('findSourceRegular: selector', selector);
    // const selectorShort = selector.match(/^([^\s]*)/).pop();
    console.log('\n\n');
    // console.log('findSourceRegular: selectorShort', selectorShort);

    const sourcePath = regularRules.path;
    // const name = data.name;
    // const valuePrev = data.valuePrev;
    // const value = data.value;

    console.log('findSourceRegular: sourcePath', sourcePath);
    // console.log('findSourceRegular: selector', selector);
    // console.log('findSourceRegular: name', name);
    // console.log('findSourceRegular: valuePrev', valuePrev);
    // console.log('findSourceRegular: value', value);

    // console.warn('findSourceRegular: regularRules', regularRules);
    const targetFilePath = sourcePath.startsWith(targetDir) ? sourcePath : `${targetDir}${sourcePath.slice(1)}`;

    console.log('findSourceRegular: targetFilePath', targetFilePath);

    // Read file contents
    // const fileData = await fs.promises.readFile(targetFilePath, 'utf8');

    // Use regex to find matches
    // const selectorContents = fileData.match(new RegExp(`${selectorShort}\\s*\\{([^}]*)`));

    // if (!selectorContents) {
    //   console.log(`Selector ${selectorShort} not found in file ${targetFilePath}`);
    //   return false;
    // }
    // console.log('findSourceRegular: targetRegularLineNumber is next');
    // console.log('\n\n');

    // const targetRegularLineNumber = fileData.substring(0, selectorContents.index).split('\n').length;

    // console.log('findSourceRegular: targetRegularLineNumber', targetRegularLineNumber);

    // const selectorContentsStr = selectorContents[0];

    // console.log('findSourceRegular: selectorContentsStr', selectorContentsStr);

    // const matches = selectorContentsStr.match(new RegExp(`\\s*${name}:([^;]*);`));

    // if (!matches) {
    //   console.log(`Line with ${name}: not found in selector ${selector} in file ${targetFilePath}`);
    //   return false;
    // }

    // const line = matches[0];

    // console.log('findSourceRegular: line', line);

    // // const matchedLine = line.match(new RegExp(valuePrev, 'g'), value);

    // console.log('findSourceRegular: matchedLine', matchedLine);
  }
  catch (err) {
    console.error(err);
  }

}

export { findSourceRegular }
