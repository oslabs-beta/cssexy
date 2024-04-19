import { configureStore } from "@reduxjs/toolkit";
import { rulesReducer } from './slices/rulesSlice.js';
import { targetReducer } from './slices/targetSlice.js';

const store = configureStore({
  reducer: {
    rules: rulesReducer,
    target: targetReducer
  }
});


const logState = (store, key) => {
  if (key === 'target') {
    // useful when the store is small
    console.log(`State: ${key}`, JSON.stringify(store.getState()[key], null, 2));
  }
  else {
    console.log(`store: ${key}`, store.getState()[key]);
  }
}

export default store;
export { logState };
