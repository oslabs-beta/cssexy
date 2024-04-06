import { updateInlineRules, updateRegularRules, updateUserAgentRules, updateInheritedRules, updateKeyframeRules, updateStyleSheets, findActiveStyles, updateShortLongMaps, setIsActiveFlag, updateNodeData, updateMidShortMap } from '../slices/rulesSlice.js';

const fetchElementRules = async (data, dispatch) => {
  if (!data) {
    console.log('RunCdp: runCdp: data is undefined');
    return;
  }
  const response = await fetch('/cdp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  console.log('sidebarStyling: runCdp: result', result);

  if (result) {
    console.log('sidebarStyling: runCdp: data', data);
    dispatch(updateNodeData(data));

    dispatch(updateInlineRules(result.inlineRules));
    dispatch(updateRegularRules(result.regularRules));
    dispatch(updateUserAgentRules(result.userAgentRules));
    dispatch(updateStyleSheets(result.styleSheets));
    dispatch(updateInheritedRules(result.inheritedRules));

    // actions needed for style overwrite functionality
    dispatch(updateShortLongMaps());
    dispatch(updateMidShortMap());
    dispatch(setIsActiveFlag());
    dispatch(findActiveStyles());

  }
};

export { fetchElementRules }
