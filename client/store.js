import { configureStore } from "@reduxjs/toolkit";
import { rulesReducer } from './slices/rulesSlice.js';
import { targetReducer } from './slices/targetSlice.js';

const store = configureStore({
  reducer: {
    rules: rulesReducer,
    target: targetReducer
  }
});

export default store;
