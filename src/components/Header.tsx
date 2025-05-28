
import { memo, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const Header = memo(({ searchTerm, onSearchChange }: HeaderProps) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [language, setLanguage] = useState("pt");

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded && searchTerm) {
      onSearchChange("");
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-xl font-bold text-gray-800">LOGO</div>
            <nav className="hidden md:flex space-x-6">
              {["Produtos", "Sobre nós", "Contato", "Catálogos"].map((item, index) => (
                <motion.a 
                  key={item}
                  href="#" 
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center">
              <AnimatePresence mode="wait">
                {!isSearchExpanded ? (
                  <motion.div
                    key="search-icon"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={toggleSearch}
                      className="hover:bg-gray-100"
                    >
                      <Search className="w-5 h-5" />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="search-input"
                    className="relative flex items-center"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input 
                      placeholder="Buscar produtos por nome ou código..." 
                      className="pl-10 w-80"
                      value={searchTerm}
                      onChange={(e) => onSearchChange(e.target.value)}
                      autoFocus
                    />
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={toggleSearch}
                      className="ml-2"
                    >
                      ✕
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-colors">
                Fale conosco
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
            >
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-20 border-none bg-transparent hover:bg-gray-100 transition-colors">
                  <SelectValue>
                    <div className="flex items-center space-x-1">
                      <span className="text-lg">
                        {language === "pt" ? "🇧🇷" : "🇺🇸"}
                      </span>
                      <ChevronDown className="w-3 h-3" />
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt">
                    <div className="flex items-center space-x-2">
                      <span>🇧🇷</span>
                      <span>Português</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="en">
                    <div className="flex items-center space-x-2">
                      <span>🇺🇸</span>
                      <span>English</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
