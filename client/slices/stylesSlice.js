import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  // allRules property includes both matchedCSSRules and inlineCSSRules
  // matchedCSSRules are styles specified in .css files (origin=regular) and default browser styles (origin=user-agent)
  // inlineCSSRules are styles specified directly on components (origin=inline)
  allRules: [],
  inlineRules: [],
  matchedRules: [],
  inheritedRules: [],
  keyframeRules: [],
  loaded: false, // if we want to track if styles have been loaded
  error: null, // if we want to track errors
};

const stylesSlice = createSlice({
  name: 'styles',
  initialState,
  reducers: {
    // every time user selects a DOM element, allRules is dispatched by the iFrameComp
    updateAllRules: (state, action) => {
      console.log('stylesSlice: state.allRules: updated', action.payload);
      state.allRules = action.payload;
    },
    updateInlineRules: (state, action) => {
      console.log('stylesSlice: state.inlineRules: updated', action.payload);
      state.inlineRules = action.payload;
    },
    updateMatchedRules: (state, action) => {
      console.log('stylesSlice: state.matchedRules: updated', action.payload);
      state.matchedRules = action.payload;
    },
    updateInheritedRules: (state, action) => {
      console.log('stylesSlice: state.inheritedRules: updated', action.payload);
      state.inheritedRules = action.payload;
    },
    updateKeyframeRules: (state, action) => {
      console.log('stylesSlice: state.keyframeRules: updated', action.payload);
      state.keyframeRules = action.payload;
    }
  },
});

export const { updateAllRules, updateInlineRules, updateMatchedRules, updateInheritedRules, updateKeyframeRules } = stylesSlice.actions;

export default stylesSlice.reducer;
