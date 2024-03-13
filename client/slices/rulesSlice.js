import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  // regularRules are styles specified in .css files (origin=regular)
  // inlineRules are styles specified directly on components (origin=inline)
  // userAgentRules are default browser styles (origin=user-agent)
  regularRules: [],
  inlineRules: [],
  userAgentRules: [],
  inheritedRules: [],
  keyframeRules: [],
  loaded: false, // if we want to track if styles have been loaded
  error: null, // if we want to track errors
};

const rulesSlice = createSlice({
  name: 'rules',
  initialState,
  reducers: {
    // every time user selects a DOM element, inline, regular, and user-agent rules are dispatched by the iFrameComp, updating the store via the reducers below.
    updateInlineRules: (state, action) => {
      // console.log('rulesSlice: state.inlineRules: updated', action.payload);
      state.inlineRules = action.payload;
    },
    updateRegularRules: (state, action) => {
      // console.log('rulesSlice: state.regularRules: updated', action.payload);
      state.regularRules = action.payload;
    },
    updateUserAgentRules: (state, action) => {
      // console.log('rulesSlice: state.userAgentRules: updated', action.payload);
      state.userAgentRules = action.payload;
    },
    updateInheritedRules: (state, action) => {
      // console.log('rulesSlice: state.inheritedRules: updated', action.payload);
      state.inheritedRules = action.payload;
    },
    updateKeyframeRules: (state, action) => {
      // console.log('rulesSlice: state.keyframeRules: updated', action.payload);
      state.keyframeRules = action.payload;
    },
  },
});

export const {
  updateInlineRules,
  updateRegularRules,
  updateUserAgentRules,
  updateInheritedRules,
  updateKeyframeRules
} = rulesSlice.actions;

export default rulesSlice.reducer;
