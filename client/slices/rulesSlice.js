import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// regularRules are styles specified in .css files (origin=regular)
// inlineRules are styles specified directly on components (origin=inline)
// userAgentRules are default browser styles (origin=user-agent)
const initialState = {
  regularRules: [],
  inlineRules: [],
  userAgentRules: [],
  inheritedRules: [],
  keyframeRules: [],
  styleSheets: {},
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
      console.log('rulesSlice: state.regularRules: updated', action.payload);
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
    updateStyleSheets: (state, action) => {
      console.log('rulesSlice: state.styleSheets: updated', action.payload);
      state.styleSheets = action.payload;
    },
    updateStyleSheets: (state, action) => {
      console.log('rulesSlice: state.styleSheets: updated', action.payload);
      state.styleSheets = action.payload;
    },
  },
});

const initialNodeDataState = {
  data:{},
  error: null, // if we want to track errors
};

const nodeDataSlice = createSlice({
  name: 'nodeData',
  // createSlice expects the initial state to be passed as 'initialState'.
  // so we pass initialNodeDataState as the value of 'initialState'.
  initialState: initialNodeDataState,
  reducers: {
    // every time user selects a DOM element, inline, regular, and user-agent rules are dispatched by the iFrameComp, updating the store via the reducers below.
    updateNodeData: (state, action) => {
      console.log('nodeDataSlice: state.nodeData: updated', action.payload);
      console.log('\n\n\n');
      state.data = action.payload;
    },
  },
});


export const {
  updateInlineRules,
  updateRegularRules,
  updateUserAgentRules,
  updateInheritedRules,
  updateKeyframeRules,
  updateStyleSheets
} = rulesSlice.actions;

export const {
  updateNodeData
} = nodeDataSlice.actions;

export const rulesReducer = rulesSlice.reducer;
export const nodeDataReducer = nodeDataSlice.reducer;
