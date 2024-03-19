import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateInlineRules, updateRegularRules, updateUserAgentRules, updateInheritedRules, updateKeyframeRules, updateStyleSheets, updateNodeData } from '../slices/rulesSlice.js';

const RunCdpComp = ( {data} ) => {


  const dispatch = useDispatch();

  console.log('\n\n\n');
  console.log('runCdpComp');
  console.log('RunCdpComp: data', data);
  console.log('\n\n\n');

  useEffect(() => {
    const runCdp = async () => {
      if (!data) {
        console.log('RunCdpComp: runCdp: data is undefined');
        return;
      }
        const response = await fetch('/cdp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        console.log('runCdpComp: response', response);

        const result = await response.json();

        console.log('runCdpComp: Result returned from /cdp');

      if (result) {
        dispatch(updateNodeData(data));

        dispatch(updateInlineRules(result.inlineRules));
        dispatch(updateRegularRules(result.regularRules));
        dispatch(updateUserAgentRules(result.userAgentRules));
        dispatch(updateStyleSheets(result.styleSheets));
      }
    };

    runCdp();
  }, [data, dispatch]);

  return null;
};

export {RunCdpComp} ;
