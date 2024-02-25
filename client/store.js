import { configureStore } from "@reduxjs/toolkit";
import sampleReducer from './slices/sampleSlice.js';

const store = configureStore({
  reducer: {
    sample: sampleReducer,
  }
});

export default store;