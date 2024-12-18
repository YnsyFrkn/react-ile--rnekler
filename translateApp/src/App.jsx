import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "react-select"; // react-select kullanıldı

import { GoArrowSwitch } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translateText } from "./redux/index";
import { setTranslate } from "./redux/slices/TranslateSlice";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { FaRegCopy } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
function App() {
  const dispatch = useDispatch();
  const { translate, loading, error } = useSelector((store) => store.translate);
  const { languages } = useSelector((store) => store.languages);

  const [text, setText] = useState("");
  const [translatedLanguage, setTranslatedLanguage] = useState({
    label: "Turkish",
    value: "tr",
  });
  const [targetLanguage, setTargetLanguage] = useState({
    label: "English",
    value: "en",
  });

  const handleTranslate = () => {
    if (!text) {
      toast.error("Lütfen çevirilecek metin girin");
      return;
    }

    dispatch(
      translateText({
        translatedLanguage,
        targetLanguage,
        text,
      })
    );
  };

  useEffect(() => {
    dispatch(getLanguages());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Dil Seçimlerinizi Kontrol Edin`);
    }
  }, [error]); // error değiştiğinde çalışır

  const chanceLanguages = () => {
    setTranslatedLanguage(targetLanguage); // Kaynak dil ile hedef dili yer değiştiriyoruz
    setTargetLanguage(translatedLanguage); // Hedef dil ile kaynak dil yer değişiyor
    setText(translate); // Çevirilen metni, hedef metin (text) alanına atıyoruz

    dispatch(setTranslate(text));
  };

  // if (languages.length === 0) {
  //   return <div style={{ textAlign: "center" }}>Yükleniyor...</div>; // Diller yüklenene kadar yükleniyor mesajı
  // }  //*sayfada dillerin yüklemesini bekle, gelene kadar yükleniyor yazar

  // text kopyalama işlemi
  const copyToText = (text) => {
    if (text) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          toast.success("Metin başarıyla kopyalandı!");
        })
        .catch(() => {
          toast.error("Metin kopyalanamadı, tekrar deneyin!");
        });
    } else {
      toast.warning("Kopyalanacak metin bulunamadı!");
    }
  };

  //silme işlemi

  const deleteToText = () => {
    setText("");
    dispatch(setTranslate("")); // Çevrilen metni temizler
  };

  return (
    <div className="container">
      <div className="header">
        <FormControl sx={{ m: 1, width: 300 }}>
          <Select
            options={languages.map((lang) => ({
              label: lang.name, // Dilin adı (örneğin: "English")
              value: lang.code, // Dilin kodu (örneğin: "en")
            }))}
            value={translatedLanguage}
            onChange={(e) => setTranslatedLanguage(e)}
            placeholder="Kaynak Dil"
          />
        </FormControl>

        <span className="icons" onClick={chanceLanguages}>
          <GoArrowSwitch title="Değiştir" />
        </span>

        <FormControl sx={{ m: 1, width: 300 }}>
          <Select
            options={languages.map((lang) => ({
              label: lang.name,
              value: lang.code,
            }))}
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e)}
            placeholder="Hedef Dil"
          />
        </FormControl>
      </div>

      <div className="textareas">
        {/* silme ikonu */}

        <div className="currentTranslation">
          <textarea
            className="custom-textarea"
            placeholder="Metin Girin"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <span className="delete" onClick={() => deleteToText()}>
            {text && <CiCircleRemove size={20} />}
          </span>
        </div>

        <div className="targetLanguage">
          <textarea
            className="custom-textarea"
            placeholder="Çeviri"
            disabled
            value={translate}
          ></textarea>

          {/* kopyalama ikonu */}
          <span className="copy" onClick={() => copyToText(translate)}>
            {translate && <FaRegCopy size={15} />}
          </span>
        </div>
      </div>

      <div className="btn" onClick={handleTranslate}>
        Çevir
      </div>
    </div>
  );
}

export default App;
