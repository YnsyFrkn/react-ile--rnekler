import { createSlice } from "@reduxjs/toolkit";
import { translateText } from "../index";

const initialState = {
  translate: "",
  loading: false,
  error: null,
};

export const translateSlice = createSlice({
  name: "translate",
  initialState,
  reducers: {
    setTranslate: (state, action) => {
      state.translate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(translateText.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(translateText.fulfilled, (state, action) => {
        state.loading = false;
        state.translate = action.payload;
      })
      .addCase(translateText.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setTranslate } = translateSlice.actions;

export default translateSlice.reducer;
