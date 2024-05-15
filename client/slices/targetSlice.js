import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

import {
  updateInlineRules, updateRegularRules, updateUserAgentRules, updateInheritedRules, updateStyleSheets,
  findActiveStyles, updateShortLongMaps, setIsActiveFlag, updateMidShortMap, resetCache, setSpecificity
} from './rulesSlice.js';

const selectTargetState = (state) => state.target;

const fetchElementRules = createAsyncThunk(
  'target/fetchElementRules',
  async ({ data }, { dispatch, getState }) => {
    if (!data) {
      console.log('fetchElementRules: data is undefined');
      return;
    }
    // console.log('fetchElementRules: data', data);

    const state = getState();
    const target = selectTargetState(state);
    const targetPort = target.targetPort;
    const targetDir = target.targetDir;
    const targetInline = target.targetInline;
    const targetRegular = target.targetRegular;
    const targetData = target.targetData;
    const selectorMemo = target?.targetSelector;
    const selector = data.selector;

    // console.log('\n\n');
    // console.warn('targetSlice: fetchElementRules: targetPort', targetPort);
    // console.warn('targetSlice: fetchElementRules: targetDir', targetDir);
    // console.warn('targetSlice: fetchElementRules: selectorMemo', selectorMemo);

    try {

      // console.log('fetchElementRules: fetch cdp');
      const response = await fetch('/cdp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      console.log('fetchElementRules: result.regularRules', result.regularRules);

      try {

        if (!result) {
          console.log('fetchElementRules: result is undefined');
          return;
        }

        // update target state
        dispatch(updateTargetSelector(selector));
        dispatch(updateTargetPort(targetPort));
        dispatch(updateTargetDir(targetDir));
        dispatch(updateTarget({ targetData: data }));


        // update rules state
        dispatch(updateInlineRules(result.inlineRules));
        dispatch(updateRegularRules(result.regularRules));
        dispatch(updateUserAgentRules(result.userAgentRules));
        dispatch(updateStyleSheets(result.styleSheets));
        dispatch(updateInheritedRules(result.inheritedRules));

        // update maps
        dispatch(resetCache());
        dispatch(updateShortLongMaps());
        dispatch(updateMidShortMap());
        dispatch(setIsActiveFlag());
        dispatch(setSpecificity());
        dispatch(findActiveStyles());
        // console.log('\n\n');
        // console.warn('targetSlice: fetchElementRules: result', result);
        // console.log('\n\n');

      } catch (error) {
        console.log('fetchElementRules: dispatch error', error);
      }


      try {
        // REGULAR RULES
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
            // console.log('\n\n');
            // console.warn('targetSlice: fetchElementRules: regularRules0', regularRules0);
            // console.log('\n\n');
            const regularRules = { ...styleSheets[styleSheetId], origin, scopes, ruleTypes, selectorList, style, selector };

            // console.log('\n\n');
            console.warn('targetSlice: fetchElementRules: regularRules', regularRules);
            // console.log('\n\n');

            const absolutePaths = [...regularRules?.absolutePaths];
            const relativePaths = [...regularRules?.relativePaths].map(relativePath => relativePath.slice(1));

            // console.warn('fetchElementRules: absolutePaths', absolutePaths);
            // console.warn('fetchElementRules: relativePaths', relativePaths);

            const pathRelative = relativePaths[0] ? relativePaths[0] : absolutePaths[0].replace(targetDir, '/')
            const path = absolutePaths[0] ? absolutePaths[0] : `${targetDir}${pathRelative}`;

            // console.warn('pathRelative', pathRelative);
            // console.warn('path', path);

            dispatch(updateTargetRegular({ absolutePaths, relativePaths, path, pathRelative }));

            // KEITH TO-DO 2024-04-20_01-00-AM: need to build out the regularRule logic in findSourceRegular for the below to work.

            regularRules.path = path;

            // const responseRegular = await fetch('/findSource', {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify({ regularRules, data, targetDir }),
            // });

            // const targetRegular = await responseRegular.json();
            // console.warn('fetchElementRules: resultRegular', resultRegular);


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
      } catch (error) {
        console.log('fetchElementRules: regularRules: error', error);
      }
      // INLINE RULES
      try {
        const inlineRulesAll = result?.inlineRules;

        const inlineRules = inlineRulesAll[0] ? inlineRulesAll[0].rule.style : null;

        if (inlineRules.cssProperties.length > 0 || selector === selectorMemo) {
          if (selector === selectorMemo) {
            console.log('fetchElementRules: selector is the same as previous selector.');
            // console.log('fetchElementRules: inlineRules', inlineRules);
            // console.log('fetchElementRules: target.targetInline', targetInline);
          }

          if (inlineRulesAll?.length > 1) {

            console.warn('fetchElementRules: inlineRulesAll: more than 1 inlineRules match', inlineRulesAll);

          }

          try {
            const responseInline = await fetch('/findSource', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ inlineRules, data, target }),
            });
            const targetInline = await responseInline.json();

            // console.log('\n\n');
            // console.warn('fetchElementRules: targetInline', targetInline);
            // console.log('\n\n');

            targetInline.length ? dispatch(updateTargetInline(targetInline)) : console.log('fetchElementRules: targetInline is empty.');
          } catch (error) {
            console.log('fetchElementRules: error', error);
          }
        } else {
          dispatch(updateTargetInline());
        }

      } catch (error) {
        console.log('fetchElementRules: inlineRules: error', error);
      }

      return true;
    } catch (error) {
      console.log('fetchElementRules: error', error);
      return false;
    }
  }
);


// Define the thunk action
const fetchTargetData = createAsyncThunk(
  'target/fetchTargetData',
  async () => {
    const response = await fetch('/target');
    const data = await response.json();
    // console.log('targetSlice: fetch: data', data);
    return data;
  });


const initialState = {
  targetDir: '',
  targetPort: '',
  targetSelector: '',
  targetInline: {
    selector: '',
    path: '',
    pathFileName: '',
    pathRelative: '',
    line: '',
    lineText: '',
    lineContext: '',
    type: '',
    typeValue: '',
    stylesJsArr: [],
    stylesJsDx: {},
  },
  targetRegular: {
    path: '',
    pathFileName: '',
    pathRelative: '',
    lines: [],
    selectors: [],
    selectorsDx: {},
    lineText: '',
    type: '',
    typeValue: '',
    absolutePaths: [],
    relativePaths: [],
    allPaths: [],
    selector: '',
  },
  targetData: {},
  targetSubmitted: {
    name: '',
    value: '',
  },
  error: null, // if we want to track errors
}

const targetSlice = createSlice({
  name: 'target',
  // createSlice expects the initial state to be passed as 'initialState'.
  // so we pass initialTargetState as the value of 'initialState'.
  initialState,
  reducers: {
    updateTargetRegular: (state, action) => {

      // console.log('state.targetDir', state.targetDir);

      if (!action.payload) {
        // console.log('state.targetRegular before clearing:', state.targetRegular);
        state.targetRegular = initialState.targetRegular
        return
        // console.log('state.targetRegular after clearing:', state.targetRegular);
      }
      if (action.payload.length === 0) {
        console.log('\n\n');
        // console.warn('targetSlice: updateTargetRegular: action.payloads length is 0.', action.payload);
        // console.log('\n\n');
        return
      }

      Object.keys(action.payload).forEach((key) => {
        if (state.targetRegular.hasOwnProperty(key)) {
          state.targetRegular[key] = action.payload[key];

          // console.log(`targetSlice updated: state.targetRegular:
          // \n${key}: ${state.targetRegular[key]}`);
        }
      });

      const pathSplit = (state.targetRegular.path)?.split('/');
      // console.log('targetSlice: state.targetRegularName: pathSplit', pathSplit);
      state.targetRegular.pathFileName = pathSplit.length > 0 ? `/${pathSplit[pathSplit.length - 1]}` : ''
      // console.log('\n\n');
      // console.warn('targetSlice: state.targetRegular: updated', JSON.parse(JSON.stringify(state.targetRegular)));

    },
    updateTargetInline: (state, action) => {
      // console.log('targetSlice: state.targetInline: updated', action.payload);
      if (!action.payload || action.payload.length === 0) {
        console.log('targetSlice: updateTargetInline: action.payload is empty. Clearing state.targetInline');
        // console.log('state.targetRegular before clearing:', state.targetRegular);
        state.targetInline = initialState.targetInline
        // console.log('state.targetRegular after clearing:', state.targetRegular);
        return
      }
      if (action.payload.length > 1) {
        console.warn('targetSlice: updateTargetInline: MORE THAN 1 MATCHING inline style FILE.', action.payload);
        state.targetInline.allPaths = action.payload;
        return
      }

      Object.keys(action.payload[0]).forEach((key) => {
        if (state.targetInline.hasOwnProperty(key)) {
          state.targetInline[key] = action.payload[0][key];
        }
      });

      const pathSplit = (state.targetInline.path).split('/');

      state.targetInline.pathFileName = `/${pathSplit[pathSplit.length - 1]}`
      // console.log('\n\n');
      // console.warn('targetSlice: state.targetInline: updated', JSON.parse(JSON.stringify(state.targetInline)));
    },
    updateTargetDir: (state, action) => {
      // console.log('targetSlice: state.targetDir: updated', action.payload);
      state.targetDir = action.payload;
    },
    updateTargetPort: (state, action) => {
      // console.log('targetSlice: state.targetPort: updated', action.payload);
      state.targetPort = action.payload;
    },
    updateTargetSelector: (state, action) => {
      // console.log('targetSlice: state.targetSelector: updated', action.payload);
      state.targetSelector = action.payload;
    },
    updateTargetData: (state, action) => {
      // console.log('targetSlice: state.targetData: updated', action.payload);
      state.targetData = action.payload;
    },
    updateTarget: (state, action) => {
      // console.log('\n\n');
      let key = Object.keys(action.payload)[0];
      // console.log('targetSlice: state.target: UPDATE TARGET', action.payload);
      if (typeof action.payload !== 'object') {
        console.log('targetSlice: updateTarget: action.payload is not an object. It needs to be for this action to work.');
        // console.log('targetSlice: state.target: action.payload', action.payload);
        return
      }
      Object.keys(action.payload).forEach((key) => {
        if (state.hasOwnProperty(key)) {
          state[key] = action.payload[key];
        }
      });
      // console.log(`targetSlice updated: state.target.${key}: ${state[key]}`);
    },
  },
  extraReducers: (builder) => {
    builder
  },
});


export const {
  updateTargetDir,
  updateTargetPort,
  updateTargetSelector,
  updateTargetInline,
  updateTargetRegular,
  updateTarget
} = targetSlice.actions;

export { fetchTargetData, fetchElementRules }

export const targetReducer = targetSlice.reducer;
