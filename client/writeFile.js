import fs from 'fs';
import util from 'util';

import { useDispatch, useSelector } from 'react-redux';

import { updateInlineRules, updateRegularRules, updateUserAgentRules, updateInheritedRules, updateKeyframeRules, updateStyleSheets, updateNodeData } from './slices/rulesSlice.js';

const writeFile = async (data) => {
  // const dispatch = useDispatch();

  // const { data } = useSelector((state) => state.nodeData);
  // const { data: nodeData } = useSelector(state => state.nodeData);

    try {
      console.log('writeFile: data:', data);
      const filePath = `/Users/home/ptri/backtrack2${data.sourcePath.slice(1)}`

      const selector = data.selector;
      const text = data.text;
      const textPrev = data.textPrev;

      // Read file
      const readFilePromise = util.promisify(fs.readFile);
      const writeFilePromise = util.promisify(fs.writeFile);
      const fileData = await readFilePromise(filePath, 'utf8');

      // Use regex to find matches
      const regex = new RegExp(`\\s*${selector}\\s*\\{[^}]*${textPrev}([^}]*)}`, 'g');
      const matches = fileData.match(regex);
      if (matches) {
        const match = matches[0];
        const newContent = match.replace(new RegExp(textPrev, 'g'), text);
        const newFileData = fileData.replace(match, newContent);
        await writeFilePromise(filePath, newFileData, 'utf8');


        // const response = await fetch('/cdp', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(nodeData),
        // });

        // console.log('iFrameComp: response', response);

        // const result = await response.json();

        // // console.log('iFrameComp: Result returned from /cdp');

        // // dispatching the results from the /cdp endpoint to the store
        // dispatch(updateInlineRules(result.inlineRules));
        // dispatch(updateRegularRules(result.regularRules));
        // dispatch(updateUserAgentRules(result.userAgentRules));
        // dispatch(updateStyleSheets(result.styleSheets));
        return true;
      }

      else {
        console.log('writeFile: No matches found');
        return false;
      }

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



export default writeFile;
