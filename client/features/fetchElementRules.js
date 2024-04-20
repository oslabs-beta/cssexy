import { updateInlineRules, updateRegularRules, updateUserAgentRules, updateInheritedRules, updateKeyframeRules, updateStyleSheets, findActiveStyles, updateShortLongMaps, setIsActiveFlag, updateMidShortMap } from '../slices/rulesSlice.js';
import { updateTargetSelector, updateTargetSourceInline, updateTargetSourceRegular, updateTarget } from '../slices/targetSlice.js';

const fetchElementRules = async (data, dispatch, storeVar) => {

  console.log('fetchElementRules: storeVar', storeVar);
  const targetPort = storeVar.target.targetPort;
  const targetDir = storeVar.target.targetDir;
  const selector = data.selector;


  console.log('fetchElementRules: targetPort', targetPort);
  console.log('fetchElementRules: targetDir', targetDir);

  if (!data) {
    console.log('data is undefined');
    return;
  }
  try {
    // console.log('fetchElementRules: data', data);
    const response = await fetch('/cdp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    // console.log('fetchElementRules: response', response);

    const result = await response.json();
    // console.warn('fetchElementRules: result', result);

    if (!result) {
      console.log('fetchElementRules: result is undefined');
      return
    }
    dispatch(updateTarget({ targetSelector: selector }));
    dispatch(updateTarget({ targetPort }));
    dispatch(updateTarget({ targetDir }));
    dispatch(updateTarget({ targetData: data }));

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


    if (result.regularRules.length > 0) {
      try {
        const regularRulesAll = result.regularRules[0].rule;

        // console.log('fetchElementRules: regularRulesAll', regularRulesAll);

        // styleSheetId is a variable that we use to keep track of which .css file we want to look at
        const styleSheets = result.styleSheets;
        const styleSheetId = regularRulesAll.style.styleSheetId;
        // we set the firstSourcePath variable to the absolute path (if it exists) or the relative path of the first .css file returned by the styleSheets object for the clicked element.

        const { origin, scopes, ruleTypes, selectorList, style } = regularRulesAll;

        const regularRules = { ...styleSheets[styleSheetId], origin, scopes, ruleTypes, selectorList, style, selector };

        // console.log('\n\n');
        console.warn('fetchElementRules: regularRules', regularRules);
        // console.log('\n\n');

        const absolutePaths = [...regularRules?.absolutePaths];
        const relativePaths = [...regularRules?.relativePaths];

        console.warn('fetchElementRules: absolutePaths', absolutePaths);
        console.warn('fetchElementRules: relativePaths', relativePaths);

        dispatch(updateTargetSourceRegular({ absolutePaths, relativePaths }));

        // KEITH TO-DO 2024-04-20_01-00-AM: need to build out the regularRule logic in findSourceRegular for the below to work.

        // const targetSourceRegularFirstPath =
        // regularRules?.absolutePaths[0] ?
        // regularRules.absolutePaths[0] :
        // regularRules?.relativePaths[0]

        // regularRules.targetSourceRegularFirstPath = targetSourceRegularFirstPath;

        // const responseRegular = await fetch('/findSource', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ regularRules, data }),
        // });

        // const resultRegular = await responseRegular.json();
        // console.warn('fetchElementRules: resultRegular', resultRegular);


        // console.log('targetDir', targetDir);
        // console.log('firstSourcePath', firstSourcePath);
        // if the first .css file is different from the currently selected .css file, we update the sourcePath variable to reflect the new selection
      }
      catch (error) {
        console.log('fetchElementRules: regularRules: error', error);
      }
    }
    // otherwise, there are no regular rules for the clicked element, so we set targetSourceRegular in our store to null
    else {
      dispatch(updateTargetSourceRegular());
      // dispatch(updateTargetSourceRegularAll());
    }

    const inlineRulesAll = result?.inlineRules

    // in the off-chance that there are multiple inlineRules, which is an edge case we have not yet come across, warn us.
    if (inlineRulesAll?.length > 1) {
      console.log('\n\n');
      console.warn('fetchElementRules: inlineRulesAll: more than 1 inlineRules match', inlineRulesAll);
      console.log('\n\n');
    }
    const inlineRules = inlineRulesAll[0] ? inlineRulesAll[0].rule.style : null;

    // if the inline rules has cssProperties, we try to find the source
    if (inlineRules?.cssProperties.length > 0) {
      try {
        // console.warn('fetchElementRules: inlineRules is TRUE', inlineRules);
        const responseInline = await fetch('/findSource', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inlineRules, data }),
        });

        const targetSourceInline = await responseInline.json();
        // console.warn('fetchElementRules: targetSourceInline', targetSourceInline);
        dispatch(updateTargetSourceInline(targetSourceInline));

      }
      catch (error) {
        console.log('fetchElementRules: error', error);
      }
    }
    // otherwise, there are no inline rules for the clicked element, so we set targetSourceInline in our store to null
    else {
      dispatch(updateTargetSourceInline());
    }

  }
  catch (error) {
    console.log('fetchElementRules: error', error);
  }
};

export { fetchElementRules }
