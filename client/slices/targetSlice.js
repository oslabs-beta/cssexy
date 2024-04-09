import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the thunk action
const fetchTargetData = createAsyncThunk('target/fetchTargetData', async () => {
  const response = await fetch('/target');
  const data = await response.json();
  console.log('targetSlice: fetch: data', data);
  return data;
});

const targetSlice = createSlice({
  name: 'target',
  // createSlice expects the initial state to be passed as 'initialState'.
  // so we pass initialTargetState as the value of 'initialState'.
  initialState: {
    targetDir: '',
    targetPort: '',
    targetSelector: '',
    targetSourceInline: '',
    targetSourceInlineAll: [],
    targetSourceInlineName: '',
    targetSourceInlineLineNumber: '',
    targetSourceRegular: '',
    targetSourceRegularName: '',
    targetSourceRegularAll: [],
    targetData: {},
    error: null, // if we want to track errors
  },
  reducers: {
    updateTargetSourceRegular: (state, action) => {
      // console.log('targetSlice: state.targetSourceRegular: updated', action.payload);
      state.targetSourceRegular = action.payload;
      const splitPaths = (state.targetSourceRegular)?.split('/');
      // console.log('targetSlice: state.targetSourceRegularName: splitPaths', splitPaths);
      state.targetSourceRegularName = splitPaths.length > 0 ? `/${splitPaths[splitPaths.length - 1]}` : ''
      console.warn('targetSlice: state.targetSourceRegularName: updated', state.targetSourceRegularName);
    },
    updateTargetSourceRegularAll: (state, action) => {
      // console.log('targetSlice: state.targetSourceRegularAll: updated', action.payload);
      state.targetSourceRegularAll = action.payload
    },
    updateTargetSourceInline: (state, action) => {
      // console.log('targetSlice: state.targetSourceInline: updated', action.payload);
      state.targetSourceInline = action.payload;
      const splitPaths = (state.targetSourceInline).split('/');

      console.log('\n\n');
      console.log('TARGETSLICE: STATE.TARGETSOURCEINLINENAME: SPLITPATHS', splitPaths);
      console.log('TARGETSLICE: STATE.TARGETSOURCEINLINENAME: SPLITPATHS', `/${splitPaths[splitPaths.length - 1]}`);
      state.targetSourceInlineName = `/${splitPaths[splitPaths.length - 1]}`
      console.log('\n\n');
      console.warn('TARGETSLICE: STATE.TARGETSOURCEINLINENAME: UPDATED', state.targetSourceInlineName);
      console.log('\n\n');
    },
    updateTargetSourceInlineAll: (state, action) => {
      // console.log('targetSlice: state.targetSourceInline: updated', action.payload);
      state.targetSourceInline = action.payload;
    },
    updateTargetSourceInlineLineNumber: (state, action) => {
      // console.log('targetSlice: state.targetSourceInlineLineNumber: updated', action.payload);
      state.targetSourceInlineLineNumber = action.payload;
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
      console.log('\n\n');
      let key = Object.keys(action.payload)[0];
      // console.log('targetSlice: state.target: UPDATE TARGET', action.payload);
      if (typeof action.payload !== 'object') {
        console.log('targetSlice: updateTarget: action.payload is not an object. It needs to be for this action to work.');
        console.log('targetSlice: state.target: action.payload', action.payload);
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
    builder.addCase(fetchTargetData.fulfilled, (state, action) => {
      // Update the state based on the fetched data
      Object.keys(action.payload).forEach((key) => {
        if (state.hasOwnProperty(key)) {
          state[key] = action.payload[key];
        }
      });
    });
  },
});


export const {
  updateTargetDir,
  updateTargetPort,
  updateTargetSelector,
  updateTargetSourceInline,
  updateTargetSourceInlineAll,
  updateTargetSourceInlineLineNumber,
  updateTargetSourceRegular,
  updateTargetSourceRegularAll,
  updateTarget
} = targetSlice.actions;

export { fetchTargetData }

export const targetReducer = targetSlice.reducer;
