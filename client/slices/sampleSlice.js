import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {

};

// rename slice, file and reference to the file in store.js
const sampleSlice = createSlice({
  name: 'sample',
  initialState,
  reducers: {

  }
});


export default sampleSlice.reducer;