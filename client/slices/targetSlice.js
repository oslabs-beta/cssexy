import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the thunk action
const fetchTargetData = createAsyncThunk('target/fetchTargetData', async () => {
  const response = await fetch('/target');
  const data = await response.json();
  // console.log('targetSlice: fetch: data', data);
  return data;
});

const initialState = {
  targetDir: '',
  targetPort: '',
  targetSelector: '',
  targetSourceInline: {
    name: '',
    path: '',
    line: '',
    lineText: '',
    type: '',
    typeValue: '',
    allPaths: [],
  },
  targetSourceRegular: {
    name: '',
    path: '',
    absolutePaths: [],
    relativePaths: [],
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

      console.log('state.targetDir', state.targetDir);

      if (!action.payload ) {
        // console.log('state.targetSourceRegular before clearing:', state.targetSourceRegular);
        state.targetSourceRegular = initialState.targetSourceRegular
        return
        // console.log('state.targetSourceRegular after clearing:', state.targetSourceRegular);
      }
      if (action.payload.length === 0) {
        console.log('\n\n');
        console.warn('targetSlice: updateTargetSourceRegular: action.payloads length is 0.', action.payload);
        console.log('\n\n');
        return
      }

      Object.keys(action.payload).forEach((key) => {
        if (state.targetSourceRegular.hasOwnProperty(key)) {
          state.targetSourceRegular[key] = action.payload[key];
        }
      });

      const pathSplit = (state.targetSourceRegular.path)?.split('/');
      // console.log('targetSlice: state.targetSourceRegularName: pathSplit', pathSplit);
      state.targetSourceRegular.name = pathSplit.length > 0 ? `/${pathSplit[pathSplit.length - 1]}` : ''
      // console.warn('targetSlice: state.targetSourceRegularName: updated', state.targetSourceRegularName);
    },
    updateTargetSourceInline: (state, action) => {
      // console.log('targetSlice: state.targetSourceInline: updated', action.payload);
      if (!action.payload || action.payload.length === 0) {
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

      Object.keys(action.payload[0]).forEach((key) => {
        if (state.targetSourceInline.hasOwnProperty(key)) {
          state.targetSourceInline[key] = action.payload[0][key];
        }
      });

      const pathSplit = (state.targetSourceInline.path).split('/');

      state.targetSourceInline.name = `/${pathSplit[pathSplit.length - 1]}`
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
      console.log('targetSlice: state.target: UPDATE TARGET', action.payload);
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
