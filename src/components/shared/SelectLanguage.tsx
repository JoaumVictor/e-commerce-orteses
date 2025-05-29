import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

const supportedLangs = ["pt", "en", "es"];

const flagMap: Record<string, string> = {
  pt: "/images/flags/pt.png",
  en: "/images/flags/en.png",
  es: "/images/flags/es.png",
};

const SelectLanguage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  const [language, setLanguage] = useState(lang || i18n.language || "pt");

  const handleChangeLanguage = (value: string) => {
    if (!supportedLangs.includes(value)) return;

    const currentPath = location.pathname;
    const newPath = currentPath.replace(/^\/(pt|en|es)/, `/${value}`);
    i18n.changeLanguage(value);
    localStorage.setItem("appLang", value);
    setLanguage(value);
    navigate(newPath, { replace: true });
  };

  useEffect(() => {
    if (lang && supportedLangs.includes(lang)) {
      setLanguage(lang);
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Select value={language} onValueChange={handleChangeLanguage}>
        <SelectTrigger className="w-12 border-none bg-transparent hover:bg-gray-100 transition-colors px-2 py-1">
          <SelectValue>
            <div className="flex items-center space-x-1">
              <img
                src={flagMap[language]}
                alt={language}
                className="w-8 h-4 rounded-sm"
              />
              <ChevronDown className="w-3 h-3" />
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {Object.entries(flagMap).map(([langCode, flag]) => (
            <SelectItem key={langCode} value={langCode}>
              <div className="flex items-center space-x-2">
                <img src={flag} alt={langCode} className="w-7 h-4 rounded-sm" />
                <span className="capitalize">{langCode}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
};

export default SelectLanguage;
