import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

import { updateInlineRules, updateRegularRules, updateUserAgentRules, updateInheritedRules, updateStyleSheets, findActiveStyles, updateShortLongMaps, setIsActiveFlag, updateMidShortMap } from './rulesSlice.js';

const selectTargetState = (state) => state.target;

const selectTargetPort = createSelector(
  selectTargetState,
  (target) => target.targetPort
);

const selectTargetDir = createSelector(
  selectTargetState,
  (target) => target.targetDir
);

const selectTargetSelector = createSelector(
  selectTargetState,
  (target) => target.targetSelector
);

const selectTargetData = createSelector(
  selectTargetState,
  (target) => target.targetData
);

const selectTargetInline = createSelector(
  selectTargetState,
  (target) => target.targeSourceInline
);

const selectTargetRegular = createSelector(
  selectTargetState,
  (target) => target.targetRegular
);

const fetchElementRules = createAsyncThunk(
  'target/fetchElementRules',
  async ({ data }, { dispatch, getState }) => {
    const state = getState();
    const target = selectTargetState(state);
    const targetPort = target.targetPort;
    const targetDir = target.targetDir;
    const targetInline = target.targetInline;
    const targetRegular = target.targetRegular;
    const targetData = target.targetData;
    const selectorMemo = target?.targetSelector;

    console.log('\n\n');
    console.warn(' memoSlice: fetchElementRules: targetPort', targetPort);
    console.warn(' memoSlice: fetchElementRules: targetDir', targetDir);
    console.warn(' memoSlice: fetchElementRules: selectorMemo', selectorMemo);


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
          console.warn(' memoSlice: fetchElementRules: regularRules0', regularRules0);
          console.log('\n\n');
          const regularRules = { ...styleSheets[styleSheetId], origin, scopes, ruleTypes, selectorList, style, selector };

          // console.log('\n\n');
          console.warn(' memoSlice: fetchElementRules: regularRules', regularRules);
          console.log('\n\n');

          const pathsAbsolute = [...regularRules?.pathsAbsolute];
          const pathsRelative = [...regularRules?.pathsRelative].map(relativePath => relativePath.slice(1));

          // console.warn('fetchElementRules: pathsAbsolute', pathsAbsolute);
          console.warn('fetchElementRules: pathsRelative', pathsRelative);

          const pathRelative = pathsRelative[0] ? pathsRelative[0] : pathsAbsolute[0].replace(targetDir, '/')
          const path = pathsAbsolute[0] ? pathsAbsolute[0] : `${targetDir}${pathRelative}`;

          // console.warn('pathRelative', pathRelative);
          // console.warn('path', path);

          dispatch(updateTargetRegular({ pathsAbsolute, pathsRelative, path, pathRelative }));

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
  }
);


// Define the thunk action
const fetchTargetData = createAsyncThunk(
  'target/fetchTargetData',
  async () => {
    const response = await fetch('/target');
    const data = await response.json();
    // console.log(' memoSlice: fetch: data', data);
    return data;
  });


const initialState = {
  targetDir: '',
  targetPort: '',
  targetSelector: '',
  targetInline: {
    path: '',
    pathFileName: '',
    pathRelative: '',
    line: '',
    lineText: '',
    type: '',
    typeValue: '',
    pathsAll: [],
    selector: '',
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
    pathsAbsolute: [],
    pathsRelative: [],
    selector: '',
  },
  targetData: {},
  error: null, // if we want to track errors
}

const  memoSlice = createSlice({
  name: 'target',
  // createSlice expects the initial state to be passed as 'initialState'.
  // so we pass initialTargetState as the value of 'initialState'.
  initialState,
  reducers: {
    updateTargetRegular: (state, action) => {

      console.log('state.targetDir', state.targetDir);

      if (!action.payload) {
        // console.log('state.targetRegular before clearing:', state.targetRegular);
        state.targetRegular = initialState.targetRegular
        return
        // console.log('state.targetRegular after clearing:', state.targetRegular);
      }
      if (action.payload.length === 0) {
        console.log('\n\n');
        console.warn(' memoSlice: updateTargetRegular: action.payloads length is 0.', action.payload);
        console.log('\n\n');
        return
      }

      Object.keys(action.payload).forEach((key) => {
        if (state.targetRegular.hasOwnProperty(key)) {
          state.targetRegular[key] = action.payload[key];
        }
      });

      const pathSplit = (state.targetRegular.path)?.split('/');
      // console.log(' memoSlice: state.targetRegularName: pathSplit', pathSplit);
      state.targetRegular.pathFileName = pathSplit.length > 0 ? `/${pathSplit[pathSplit.length - 1]}` : ''
      // console.warn(' memoSlice: state.targetRegularName: updated', state.targetRegularName);
      console.log('\n\n');
      console.warn(' memoSlice: state.targetRegular: updated', state.targetRegular);
    },
    updateTargetInline: (state, action) => {
      // console.log(' memoSlice: state.targetInline: updated', action.payload);
      if (!action.payload || action.payload.length === 0) {
        console.log(' memoSlice: updateTargetInline: action.payload is empty. Clearing state.targetInline');
        // console.log('state.targetRegular before clearing:', state.targetRegular);
        state.targetInline = initialState.targetInline
        // console.log('state.targetRegular after clearing:', state.targetRegular);
        return
      }
      if (action.payload.length > 1) {
        console.warn(' memoSlice: updateTargetInline: MORE THAN 1 MATCHING inline style FILE.', action.payload);
        state.targetInline.pathsAll = action.payload;
        return
      }

      Object.keys(action.payload[0]).forEach((key) => {
        if (state.targetInline.hasOwnProperty(key)) {
          state.targetInline[key] = action.payload[0][key];
        }
      });

      const pathSplit = (state.targetInline.path).split('/');

      state.targetInline.pathFileName = `/${pathSplit[pathSplit.length - 1]}`
      console.log('\n\n');
      console.warn(' memoSlice: state.targetInline: updated', state.targetInline);
    },
    updateTargetDir: (state, action) => {
      // console.log(' memoSlice: state.targetDir: updated', action.payload);
      state.targetDir = action.payload;
    },
    updateTargetPort: (state, action) => {
      // console.log(' memoSlice: state.targetPort: updated', action.payload);
      state.targetPort = action.payload;
    },
    updateTargetSelector: (state, action) => {
      // console.log(' memoSlice: state.targetSelector: updated', action.payload);
      state.targetSelector = action.payload;
    },
    updateTargetData: (state, action) => {
      // console.log(' memoSlice: state.targetData: updated', action.payload);
      state.targetData = action.payload;
    },
    updateTarget: (state, action) => {
      console.log('\n\n');
      let key = Object.keys(action.payload)[0];
      console.log(' memoSlice: state.target: UPDATE TARGET', action.payload);
      if (typeof action.payload !== 'object') {
        console.log(' memoSlice: updateTarget: action.payload is not an object. It needs to be for this action to work.');
        console.log(' memoSlice: state.target: action.payload', action.payload);
        return
      }
      Object.keys(action.payload).forEach((key) => {
        if (state.hasOwnProperty(key)) {
          state[key] = action.payload[key];
        }
      });
      // console.log(` memoSlice updated: state.target.${key}: ${state[key]}`);
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
} =  memoSlice.actions;

export { fetchTargetData, fetchElementRules }

export const targetReducer =  memoSlice.reducer;
