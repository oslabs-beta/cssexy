import { configureStore } from "@reduxjs/toolkit";
import { rulesReducer, nodeDataReducer } from './slices/rulesSlice.js'; // rulesReducer from './slices/rulesSlice.js';

const store = configureStore({
  reducer: {
    rules: rulesReducer,
    nodeData: nodeDataReducer
  }
});

export default store;
