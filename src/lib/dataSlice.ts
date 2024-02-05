import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {};

// export const requestLibrary = createAsyncThunk(void, () => {})

const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {},
});

export const {} = dataSlice.actions;
export default dataSlice.reducer;
