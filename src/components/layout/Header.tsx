import { memo, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import SearchProduct from "../SearchProduct";
import SelectLanguage from "../shared/SelectLanguage";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const Header = memo(({ searchTerm, onSearchChange }: HeaderProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    t("header.products"),
    t("header.about"),
    t("header.contactUs"),
    t("header.catalogs"),
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div
            className="cursor-pointer w-1/3 pl-0 md:pl-16"
            onClick={() => navigate("/")}
          >
            <h1 className="text-xl font-medium text-[32px]">LOGO</h1>
          </div>

          <motion.div
            className="hidden lg:flex items-center space-x-8 ml-2 w-1/3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex space-x-6 items-center justify-center">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  className="hover:text-gray-800 transition-colors text-sm md:text-md"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item}
                </motion.a>
              ))}
              <SearchProduct
                searchTerm={searchTerm}
                onSearchChange={onSearchChange}
              />
            </nav>
          </motion.div>

          <div className="lg:hidden w-1/3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu />
            </Button>
          </div>

          <motion.div
            className="flex items-end space-x-4 w-1/3 justify-end"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl transition-colors">
                {t("header.contact")}
              </Button>
            </motion.div>

            <SelectLanguage />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="lg:hidden px-4 pb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-start space-y-3">
              {menuItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-700 hover:text-black transition-colors"
                >
                  {item}
                </a>
              ))}
              <SearchProduct
                searchTerm={searchTerm}
                onSearchChange={onSearchChange}
              />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
