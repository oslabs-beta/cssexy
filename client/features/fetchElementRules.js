import { updateInlineRules, updateRegularRules, updateUserAgentRules, updateInheritedRules, updateKeyframeRules, updateStyleSheets, findActiveStyles, updateShortLongMaps, setIsActiveFlag, updateMidShortMap } from '../slices/rulesSlice.js';
import { updateTargetSelector, updateTargetInline, updateTargetRegular, updateTarget } from '../slices/targetSlice.js';

import store from '../store.js';


const fetchElementRules = async ({ data, dispatch }) => {
  const state = store.getState();
  const target = state.target;
  const targetPort = target.targetPort;
  const targetDir = target.targetDir;
  const targetInline = target.targetInline;
  const targetRegular = target.targetRegular;
  const targetData = target.targetData;
  const selectorMemo = target?.targetSelector;

  console.log('\n\n');
  console.warn('targetSlice: fetchElementRules: targetPort', targetPort);
  console.warn('targetSlice: fetchElementRules: targetDir', targetDir);
  console.warn('targetSlice: fetchElementRules: selectorMemo', selectorMemo);


  const selector = data.selector;


  if (!data) {
    console.log('data is undefined');
    return;
  }

  try {
    const response = await fetch('/cdp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (!result) {
      console.log('fetchElementRules: result is undefined');
      return;
    }

    dispatch(updateTargetSelector(selector));
    dispatch(updateTargetPort(targetPort));
    dispatch(updateTargetDir(targetDir));
    dispatch(updateTarget({ targetData: data }));
    dispatch(updateInlineRules(result.inlineRules));
    dispatch(updateRegularRules(result.regularRules));
    dispatch(updateUserAgentRules(result.userAgentRules));
    dispatch(updateStyleSheets(result.styleSheets));
    dispatch(updateInheritedRules(result.inheritedRules));
    dispatch(updateShortLongMaps());
    dispatch(updateMidShortMap());
    dispatch(setIsActiveFlag());
    dispatch(findActiveStyles());

    if (result.regularRules.length > 0) {
      try {
        const regularRulesAll = result.regularRules;
        // const regularRulesAll = result.regularRules[0].rule;


        console.warn('fetchElementRules: regularRulesAll', regularRulesAll);

        const regularRules0 = regularRulesAll[0].rule;

        // console.log('fetchElementRules: regularRules0', regularRules0);

        // styleSheetId is a variable that we use to keep track of which .css file we want to look at
        const styleSheets = result.styleSheets;
        const styleSheetId = regularRules0.style.styleSheetId;
        // we set the firstSourcePath variable to the absolute path (if it exists) or the relative path of the first .css file returned by the styleSheets object for the clicked element.

        const { origin, scopes, ruleTypes, selectorList, style } = regularRules0;
        console.log('\n\n');
        console.warn('targetSlice: fetchElementRules: regularRules0', regularRules0);
        console.log('\n\n');
        const regularRules = { ...styleSheets[styleSheetId], origin, scopes, ruleTypes, selectorList, style, selector };

        // console.log('\n\n');
        console.warn('targetSlice: fetchElementRules: regularRules', regularRules);
        console.log('\n\n');

        const absolutePaths = [...regularRules?.absolutePaths];
        const relativePaths = [...regularRules?.relativePaths].map(relativePath => relativePath.slice(1));

        // console.warn('fetchElementRules: absolutePaths', absolutePaths);
        console.warn('fetchElementRules: relativePaths', relativePaths);

        const pathRelative = relativePaths[0] ? relativePaths[0] : absolutePaths[0].replace(targetDir, '/')
        const path = absolutePaths[0] ? absolutePaths[0] : `${targetDir}${pathRelative}`;

        // console.warn('pathRelative', pathRelative);
        // console.warn('path', path);

        dispatch(updateTargetRegular({ absolutePaths, relativePaths, path, pathRelative }));

        // KEITH TO-DO 2024-04-20_01-00-AM: need to build out the regularRule logic in findSourceRegular for the below to work.

        regularRules.path = path;

        const responseRegular = await fetch('/findSource', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ regularRules, data, targetDir }),
        });

        const targetRegular = await responseRegular.json();
        console.warn('fetchElementRules: resultRegular', resultRegular);


        // console.log('targetDir', targetDir);
        // console.log('firstSourcePath', firstSourcePath);
        // if the first .css file is different from the currently selected .css file, we update the sourcePath variable to reflect the new selection
      }
      catch (error) {
        console.log('fetchElementRules: regularRules: error', error);
      }
    }
    // otherwise, there are no regular rules for the clicked element, so we set targetRegular in our store to null
    else {
      console.log('fetchElementRules: targetRegular is empty. clearing targetRegular');
      dispatch(updateTargetRegular());
    }

    const inlineRulesAll = result?.inlineRules;

    if (inlineRulesAll?.length > 1) {

      console.warn('fetchElementRules: inlineRulesAll: more than 1 inlineRules match', inlineRulesAll);

    }

    const inlineRules = inlineRulesAll[0] ? inlineRulesAll[0].rule.style : null;

    if (inlineRules.cssProperties.length > 0 || selector === selectorMemo) {
      if (selector === selectorMemo) {
        console.log('fetchElementRules: selector is the same as previous selector.');
        console.log('fetchElementRules: inlineRules', inlineRules);
        console.log('fetchElementRules: target.targetInline', targetInline);
      }

      try {
        const responseInline = await fetch('/findSource', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ inlineRules, data, target }),
        });
        const targetInline = await responseInline.json();

        // const targetInline = await dispatch(findSourceInline({ inlineRules, data })).unwrap();

        console.log('\n\n');
        console.warn('fetchElementRules: targetInline', targetInline);
        console.log('\n\n');

        targetInline.length ? dispatch(updateTargetInline(targetInline)) : console.log('fetchElementRules: targetInline is empty.');
      } catch (error) {
        console.log('fetchElementRules: error', error);
      }
    } else {
      dispatch(updateTargetInline());
    }

    return true;
  } catch (error) {
    console.log('fetchElementRules: error', error);
    return false;
  }
};

export { fetchElementRules }
