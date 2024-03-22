import { configureStore } from "@reduxjs/toolkit";
import rulesReducer from './slices/rulesSlice.js';

const store = configureStore({
  reducer: {
    rules: rulesReducer,
  }
});

export default store;
