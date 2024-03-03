import { configureStore } from "@reduxjs/toolkit";
import stylesReducer from './slices/stylesSlice.js';

const store = configureStore({
  reducer: {
    styles: stylesReducer,
  }
});

export default store;