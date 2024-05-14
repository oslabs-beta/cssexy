import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

import { updateInlineRules, updateRegularRules, updateUserAgentRules, updateInheritedRules, updateStyleSheets, findActiveStyles, updateShortLongMaps, setIsActiveFlag, updateMidShortMap } from './rulesSlice.js';

const initialState = {
  list: [],
  recent: {},
  edits: [],
  error: null, // if we want to track errors
}

const memoSlice = createSlice({
  name: 'memo',
  // createSlice expects the initial state to be passed as 'initialState'.
  // so we pass initialTargetState as the value of 'initialState'.
  initialState,
  reducers: {
    updateMemoList: (state, action) => {

      console.log('state.targetDir', state.list);

      const pathSplit = (state.targetSourceRegular.path)?.split('/');
      // console.log('memoSlice: state.targetSourceRegularName: pathSplit', pathSplit);
      state.targetSourceRegular.pathName = pathSplit.length > 0 ? `/${pathSplit[pathSplit.length - 1]}` : ''
      // console.warn('memoSlice: state.targetSourceRegularName: updated', state.targetSourceRegularName);
    },
    updateTargetSourceInline: (state, action) => {
      // console.log('memoSlice: state.targetSourceInline: updated', action.payload);
      if (!action.payload || action.payload.length === 0) {
        console.log('memoSlice: updateTargetSourceInline: action.payload is empty. Clearing state.targetSourceInline');
        // console.log('state.targetSourceRegular before clearing:', state.targetSourceRegular);
        state.targetSourceInline = initialState.targetSourceInline
        // console.log('state.targetSourceRegular after clearing:', state.targetSourceRegular);
        return
      }
      if (action.payload.length > 1) {
        console.warn('memoSlice: updateTargetSourceInline: MORE THAN 1 MATCHING inline style FILE.', action.payload);
        state.targetSourceInline.allPaths = action.payload;
        return
      }

      Object.keys(action.payload[0]).forEach((key) => {
        if (state.targetSourceInline.hasOwnProperty(key)) {
          state.targetSourceInline[key] = action.payload[0][key];
        }
      });

      const pathSplit = (state.targetSourceInline.path).split('/');

      state.targetSourceInline.pathName = `/${pathSplit[pathSplit.length - 1]}`
    },
    updateTargetDir: (state, action) => {
      // console.log('memoSlice: state.targetDir: updated', action.payload);
      state.targetDir = action.payload;
    },
    updateTargetPort: (state, action) => {
      // console.log('memoSlice: state.targetPort: updated', action.payload);
      state.targetPort = action.payload;
    },
    updateTargetSelector: (state, action) => {
      // console.log('memoSlice: state.targetSelector: updated', action.payload);
      state.targetSelector = action.payload;
    },
    updateTargetData: (state, action) => {
      // console.log('memoSlice: state.targetData: updated', action.payload);
      state.targetData = action.payload;
    },
    updateTarget: (state, action) => {
      console.log('\n\n');
      let key = Object.keys(action.payload)[0];
      console.log('memoSlice: state.target: UPDATE TARGET', action.payload);
      if (typeof action.payload !== 'object') {
        console.log('memoSlice: updateTarget: action.payload is not an object. It needs to be for this action to work.');
        console.log('memoSlice: state.target: action.payload', action.payload);
        return
      }
      Object.keys(action.payload).forEach((key) => {
        if (state.hasOwnProperty(key)) {
          state[key] = action.payload[key];
        }
      });
      // console.log(`memoSlice updated: state.target.${key}: ${state[key]}`);
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
  updateTargetSourceInline,
  updateTargetSourceRegular,
  updateTarget
} = memoSlice.actions;

export { fetchTargetData, fetchElementRules }

export const targetReducer = memoSlice.reducer;
