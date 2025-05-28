import i18n from "@/lib/i18n";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const flagMap: Record<string, string> = {
  pt: "/images/flags/pt.png",
  en: "/images/flags/en.png",
  es: "/images/flags/es.png",
};

const SelectLanguage = () => {
  const [language, setLanguage] = useState(i18n.language || "pt");

  const handleChangeLanguage = (value: string) => {
    setLanguage(value);
    i18n.changeLanguage(value);
  };

  useEffect(() => {
    setLanguage(i18n.language);
  }, []);

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
          {Object.entries(flagMap).map(([lang, src]) => (
            <SelectItem key={lang} value={lang}>
              <img src={src} alt={lang} className="w-7 h-4 rounded-sm" />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
};

export default SelectLanguage;
