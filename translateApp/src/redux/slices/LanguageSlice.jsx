import { createSlice } from "@reduxjs/toolkit";
import { getLanguages } from "../index";

const initialState = {
  // translate: "",
  languages: [], //*API'den gelen dilleri tutacak
};

export const LanguagesSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLanguages.fulfilled, (state, action) => {
      state.languages = action.payload; //*Gelen dilleri state'e ekler
    });
  },
});

export const {} = LanguagesSlice.actions;

export default LanguagesSlice.reducer;
