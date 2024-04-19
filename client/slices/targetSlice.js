import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the thunk action
const fetchTargetData = createAsyncThunk('target/fetchTargetData', async () => {
  const response = await fetch('/target');
  const data = await response.json();
  console.log('targetSlice: fetch: data', data);
  return data;
});

const initialState = {
    targetDir: '',
    targetPort: '',
    targetSelector: '',
    targetSourceInline: {
      path: '',
      allPaths: [],
      name: '',
      line: ''
    },
    targetSourceRegular: {
      path: '',
      absolutePaths: [],
      relativePaths: [],
      name: ''
    },
    targetData: {},
    error: null, // if we want to track errors
}

const targetSlice = createSlice({
  name: 'target',
  // createSlice expects the initial state to be passed as 'initialState'.
  // so we pass initialTargetState as the value of 'initialState'.
  initialState,
  reducers: {
    updateTargetSourceRegular: (state, action) => {
      if (!action.payload) {
        // console.log('state.targetSourceRegular before clearing:', state.targetSourceRegular);
        state.targetSourceRegular = initialState.targetSourceRegular
        return
        // console.log('state.targetSourceRegular after clearing:', state.targetSourceRegular);
      }
      console.warn('targetSlice: state.targetSourceRegular: action.payload', action.payload);
      const absolutePaths = action.payload?.absolutePaths
      const relativePaths = action.payload?.relativePaths

      state.targetSourceRegular.absolutePaths = absolutePaths;
      state.targetSourceRegular.relativePaths = relativePaths;
      const path = absolutePaths[0] || relativePaths[0];
      state.targetSourceRegular.path = path;
      const pathSplit = (path)?.split('/');
      // console.log('targetSlice: state.targetSourceRegularName: pathSplit', pathSplit);
      state.targetSourceRegular.name = pathSplit.length > 0 ? `/${pathSplit[pathSplit.length - 1]}` : ''
      // console.warn('targetSlice: state.targetSourceRegularName: updated', state.targetSourceRegularName);
    },
    updateTargetSourceInline: (state, action) => {
      if (!action.payload) {
        console.log('targetSlice: updateTargetSourceInline: action.payload is empty. Clearing state.targetSourceInline');
        // console.log('state.targetSourceRegular before clearing:', state.targetSourceRegular);
        state.targetSourceInline = initialState.targetSourceInline
        // console.log('state.targetSourceRegular after clearing:', state.targetSourceRegular);
        return
      }
      if (action.payload.length > 1) {
        console.warn('targetSlice: updateTargetSourceInline: MORE THAN 1 MATCHING inline style FILE.', action.payload);
        state.targetSourceInline.allPaths = action.payload;
        return
      }
      // console.warn('targetSlice: updateTargetSourceInline: action.payload', action.payload);

      state.targetSourceInline.path = action.payload[0].path;

      state.targetSourceInline.line = action.payload[0].line;
      const splitPaths = (state.targetSourceInline.path).split('/');
      state.targetSourceInline.name = `/${splitPaths[splitPaths.length - 1]}`
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
  updateTargetSourceRegular,
  updateTarget
} = targetSlice.actions;

export { fetchTargetData }

export const targetReducer = targetSlice.reducer;
