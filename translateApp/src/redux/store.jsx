import { configureStore } from "@reduxjs/toolkit";
import TranslateReducer from "./slices/TranslateSlice";
import LanguagesReducer from "./slices/LanguageSlice";

export const store = configureStore({
  reducer: {
    translate: TranslateReducer,
    languages: LanguagesReducer,
  },
});
