import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface SearchProductProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  className?: string;
}

const SearchProduct = memo(
  ({ searchTerm, onSearchChange, className }: SearchProductProps) => {
    const { t } = useTranslation();
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);

    const toggleSearch = () => {
      setIsSearchExpanded(!isSearchExpanded);
      if (isSearchExpanded && searchTerm) {
        onSearchChange("");
      }
    };

    return (
      <div className="flex items-center justify-center">
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
                className="hover:bg-gray-100 bg-gray-100 rounded-full hover:scale-125 transition-all"
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
                placeholder={t("searchProduct.placeholder")}
                className={cn("pl-10 w-40 border border-red-500", className)}
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
    );
  }
);

SearchProduct.displayName = "SearchProduct";

export default SearchProduct;
