//*asycthunk istekleri - dil ve çevirisi için
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const translateText = createAsyncThunk(
  "translate/translateText",
  async (p) => {
    const params = new URLSearchParams();
    params.set("source_language", p.translatedLanguage.value);
    params.set("target_language", p.targetLanguage.value);
    params.set("text", p.text);

    const res = await api.post("/translate", params);

    return res.data.data.translatedText; // API cevabındaki veriyi doğru şekilde alıyoruz
  }
);

export const getLanguages = createAsyncThunk(
  "languages/getLanguages",
  async () => {
    const response = await api.get("/getLanguages");
    return response.data.data.languages;
  }
);
