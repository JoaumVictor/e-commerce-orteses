import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const getInitialLanguage = (): string => {
  const pathLang = window.location.pathname.split("/")[1];
  const supported = ["pt", "en", "es"];
  return supported.includes(pathLang) ? pathLang : "pt";
};

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: getInitialLanguage(),
    fallbackLng: "pt",
    supportedLngs: ["pt", "en", "es"],
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
