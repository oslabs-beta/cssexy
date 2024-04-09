import { updateInlineRules, updateRegularRules, updateUserAgentRules, updateInheritedRules, updateKeyframeRules, updateStyleSheets, findActiveStyles, updateShortLongMaps, setIsActiveFlag, updateMidShortMap } from '../slices/rulesSlice.js';
import { updateTargetSelector, updateTargetSourceInline, updateTargetSourceInlineLineNumber, updateTargetSourceRegular, updateTargetSourceRegularAll, updateTarget } from '../slices/targetSlice.js';

const fetchElementRules = async (data, dispatch) => {

  const targetPort = import.meta.env.VITE_TARGET_PORT;
  const targetDir = import.meta.env.VITE_TARGET_DIR;
  const selector = data.selector;

  if (!data) {
    console.log('data is undefined');
    return;
  }
  try {
    console.log('fetchElementRules: data', data);
    const response = await fetch('/cdp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log('fetchElementRules: response', response);

    const result = await response.json();
    console.warn('fetchElementRules: result', result);

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
        // console.warn('fetchElementRules: regularRules', regularRules);
        // console.log('\n\n');

        dispatch(updateTargetSourceRegularAll(regularRules.absolutePaths, regularRules?.relativePaths));

        const targetSourceRegular =
        regularRules?.absolutePaths[0] ?
        regularRules.absolutePaths[0] :
        regularRules?.relativePaths[0]
        dispatch(updateTargetSourceRegular(targetSourceRegular));

        regularRules.targetSourceRegular = targetSourceRegular;


        // console.warn('fetchElementRules: regularRules', regularRules);


        const splitPaths = targetSourceRegular.split('/');
        // sourceNameString is a variable that we use to keep track of the name of the currently selected .css file
        const sourceNameString = `/${splitPaths[splitPaths.length - 1]}`;

        const responseRegular = await fetch('/findSource', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ regularRules, data }),
        });

        const resultRegular = await responseRegular.json();
        console.warn('fetchElementRules: resultRegular', resultRegular);


        // console.log('targetDir', targetDir);
        // console.log('firstSourcePath', firstSourcePath);
        // if the first .css file is different from the currently selected .css file, we update the sourcePath variable to reflect the new selection
      }
      catch (error) {
        console.log('fetchElementRules: regularRules: error', error);
      }
    }
    else {
      dispatch(updateTargetSourceRegular());
      dispatch(updateTargetSourceRegularAll());
    }

    const inlineRulesAll = result?.inlineRules

    if (inlineRulesAll?.length > 1) {
      console.warn('fetchElementRules: inlineRulesAll: more than 1 inlineRules match');
    }
    const inlineRules = inlineRulesAll[0] ? inlineRulesAll[0].rule.style : null;

    if (inlineRules) {
      try {
        // console.warn('fetchElementRules: inlineRules is TRUE', inlineRules);

        // console.log('fetchElementRules: inlineRules', inlineRules);
        const responseInline = await fetch('/findSource', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inlineRules, data }),
        });
        // console.log('fetchElementRules: response', responseInline);

        const targetSourceInlineAll = await responseInline.json();
        console.log('fetchElementRules: targetSourceInlineAll', targetSourceInlineAll);
        const targetSourceInline = targetSourceInlineAll[0]?.targetSourceInline;
        const targetSourceInlineLineNumber = targetSourceInlineAll[0]?.targetSourceInlineLineNumber;
        if (targetSourceInlineAll.length > 1) {
          console.warn('fetchElementRules: inline: MORE THAN 1 MATCHING FILE. Updating targetSourceInlineAll in store');
          dispatch(updateTarget({ targetSourceInlineAll }))
        }

        dispatch(updateTarget({ targetSourceInline }));
        dispatch(updateTarget({ targetSourceInlineLineNumber }));

      }
      catch (error) {
        console.log('fetchElementRules: error', error);
      }
    }
    else {
      dispatch(updateTargetSourceInline());
      dispatch(updateTargetSourceInlineLineNumber());
    }


  }
  catch (error) {
    console.log('fetchElementRules: error', error);
  }
};

export { fetchElementRules }
