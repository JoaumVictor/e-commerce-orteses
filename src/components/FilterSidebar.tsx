import { useState, memo } from "react";
import { ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { families, technologies, categories } from "@/data/products";
import { FilterState } from "@/hooks/useProductFilters";
import { useTranslation } from "react-i18next";

interface FilterSidebarProps {
  filters: FilterState;
  onToggleArrayFilter: (
    key: "families" | "technologies" | "categories",
    value: string
  ) => void;
  onUpdateFilter: (key: keyof FilterState, value: unknown) => void;
  onClearFilters: () => void;
}

const FilterSidebar = memo(
  ({
    filters,
    onToggleArrayFilter,
    onUpdateFilter,
    onClearFilters,
  }: FilterSidebarProps) => {
    const { t } = useTranslation();
    const [openSections, setOpenSections] = useState({
      launches: true,
      families: true,
      categories: true,
    });

    const toggleSection = (section: keyof typeof openSections) => {
      setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const hasActiveFilters =
      filters.launches ||
      filters.families.length > 0 ||
      filters.technologies.length > 0 ||
      filters.categories.length > 0;

    return (
      <motion.div
        className="w-64 bg-white border border-gray-200 shadow-md rounded-lg"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="flex items-center justify-between p-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold text-gray-800">
            {t("filterSidebar.filters")}
          </h3>
          <AnimatePresence>
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearFilters}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <X className="w-4 h-4 mr-1" />
                  {t("common.clear")}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Filtro de Lançamentos */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Collapsible
            open={openSections.launches}
            onOpenChange={() => toggleSection("launches")}
          >
            <CollapsibleTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-between text-left p-3 bg-gray-100 border-y border-y-gray-200 hover:bg-gray-200 h-[80px] transition-colors"
                >
                  {t("filterSidebar.newProducts")}
                  <motion.div
                    animate={{ rotate: openSections.launches ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </Button>
              </motion.div>
            </CollapsibleTrigger>
            <CollapsibleContent className="my-2 ml-3">
              <motion.div
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Checkbox
                  id="launches"
                  checked={filters.launches}
                  onCheckedChange={(checked) =>
                    onUpdateFilter("launches", !!checked)
                  }
                />
                <Label htmlFor="launches" className="text-sm">
                  {t("filterSidebar.justNewProducts")}
                </Label>
              </motion.div>
            </CollapsibleContent>
          </Collapsible>
        </motion.div>

        {/* Filtro de Famílias/Tecnologias */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Collapsible
            open={openSections.families}
            onOpenChange={() => toggleSection("families")}
          >
            <CollapsibleTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-between text-left bg-gray-100 p-3 border-y border-y-gray-200 hover:bg-gray-200 h-[80px] transition-colors"
                >
                  {t("filterSidebar.familysAndTecnologies")}

                  <motion.div
                    animate={{ rotate: openSections.families ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </Button>
              </motion.div>
            </CollapsibleTrigger>
            <CollapsibleContent className="my-2 ml-3 space-y-3">
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">
                  {t("filterSidebar.familys")}
                </h4>
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {families.map((family, index) => (
                    <motion.div
                      key={family}
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Checkbox
                        id={`family-${family}`}
                        checked={filters.families.includes(family)}
                        onCheckedChange={() =>
                          onToggleArrayFilter("families", family)
                        }
                      />
                      <Label htmlFor={`family-${family}`} className="text-sm">
                        {family}
                      </Label>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-2">
                  {t("filterSidebar.tecnologies")}
                </h4>
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {technologies.map((technology, index) => (
                    <motion.div
                      key={technology}
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Checkbox
                        id={`tech-${technology}`}
                        checked={filters.technologies.includes(technology)}
                        onCheckedChange={() =>
                          onToggleArrayFilter("technologies", technology)
                        }
                      />
                      <Label htmlFor={`tech-${technology}`} className="text-sm">
                        {technology}
                      </Label>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </motion.div>

        {/* Filtro de Produtos */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Collapsible
            open={openSections.categories}
            onOpenChange={() => toggleSection("categories")}
          >
            <CollapsibleTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-between text-left bg-gray-100 p-3 border-y border-y-gray-200 hover:bg-gray-200 h-[80px] transition-colors"
                >
                  {t("filterSidebar.products")}

                  <motion.div
                    animate={{ rotate: openSections.categories ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </Button>
              </motion.div>
            </CollapsibleTrigger>
            <CollapsibleContent className="my-2 ml-3">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {categories.map((category, index) => (
                  <motion.div
                    key={category}
                    className="flex items-center space-x-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Checkbox
                      id={`category-${category}`}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={() =>
                        onToggleArrayFilter("categories", category)
                      }
                    />
                    <Label htmlFor={`category-${category}`} className="text-sm">
                      {category}
                    </Label>
                  </motion.div>
                ))}
              </motion.div>
            </CollapsibleContent>
          </Collapsible>
        </motion.div>
      </motion.div>
    );
  }
);

FilterSidebar.displayName = "FilterSidebar";

export default FilterSidebar;
