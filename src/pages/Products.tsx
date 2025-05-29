import { useState, useMemo, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { products } from "@/data/products";
import { useProductFilters } from "@/hooks/useProductFilters";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import HeroBanner from "@/components/HeroBanner";
import FilterSidebar from "@/components/FilterSidebar";
import ProductSkeleton from "@/components/ProductSkeleton";
import ProductCard from "@/components/ProductCard";
import SearchProduct from "@/components/SearchProduct";

const Products = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const productsPerPage = 9;

  const {
    filters,
    filteredProducts,
    updateFilter,
    toggleArrayFilter,
    clearFilters,
  } = useProductFilters(products);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = useCallback(
    (term: string) => {
      updateFilter("searchTerm", term);
      setCurrentPage(1);
    },
    [updateFilter]
  );

  const handleDownloadCatalog = useCallback(() => {
    const catalogData = {
      catalog: t("downloadCatalog.downloadButton"),
      generatedAt: new Date().toISOString(),
      totalProducts: products.length,
      products: products,
    };
    const dataStr = JSON.stringify(catalogData, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = "catalogo-produtos.json";
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  }, []);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    if (startIndex >= filteredProducts.length) {
      return [];
    }
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, currentPage, productsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredProducts.length / productsPerPage);
  }, [filteredProducts.length, productsPerPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const renderPaginationButtons = useMemo(() => {
    const buttons = [];
    const maxVisiblePages = 5;

    buttons.push(
      <Button
        key="prev"
        variant="ghost"
        size="sm"
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        &lt;
      </Button>
    );

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "ghost"}
          size="sm"
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="dots" className="text-gray-500">
            ...
          </span>
        );
      }
      buttons.push(
        <Button
          key={totalPages}
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Button>
      );
    }

    buttons.push(
      <Button
        key="next"
        variant="ghost"
        size="sm"
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        &gt;
      </Button>
    );

    return buttons;
  }, [currentPage, totalPages, handlePageChange]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Header
        searchTerm={filters.searchTerm}
        onSearchChange={handleSearchChange}
      />

      <HeroBanner />

      <div className="max-w-7xl mx-auto flex">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <FilterSidebar
            filters={filters}
            onToggleArrayFilter={toggleArrayFilter}
            onUpdateFilter={updateFilter}
            onClearFilters={clearFilters}
          />
        </motion.div>

        <div className="flex-1 p-6">
          <motion.div
            className="mb-6 flex justify-between items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="flex items-center justify-center space-x-4">
              <h1 className="text-sm font-bold text-gray-800 bg-gray-100 p-2 rounded-md">
                {isLoading
                  ? t("common.loadingProducts")
                  : `${filteredProducts.length} produto${
                      filteredProducts.length !== 1 ? "s" : ""
                    }`}
                {!isLoading && filters.searchTerm && (
                  <span className="text-lg font-normal text-gray-600 ml-2">
                    {t("common.for")} "{filters.searchTerm}"
                  </span>
                )}
              </h1>
              <SearchProduct
                searchTerm={filters.searchTerm}
                onSearchChange={handleSearchChange}
                className="w-64 md:w-80 lg:w-96"
              />
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-colors"
                onClick={handleDownloadCatalog}
                disabled={isLoading}
              >
                {t("downloadCatalog.downloadButton")}
              </Button>
            </motion.div>
          </motion.div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProductSkeleton />
                  </motion.div>
                ))}
              </motion.div>
            ) : filteredProducts.length === 0 ? (
              <motion.div
                key="no-products"
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <p className="text-gray-500 text-lg mb-4">
                  {t("common.noProductsFound")}
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button onClick={clearFilters} variant="outline">
                    {t("common.clearFilters")}
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="products"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                  layout
                >
                  <AnimatePresence>
                    {paginatedProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <ProductCard
                          id={product.id}
                          name={product.name}
                          code={product.code}
                          image={product.image}
                          isLaunch={product.isLaunch}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {totalPages > 1 && (
                  <motion.div
                    className="flex justify-center items-center space-x-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {renderPaginationButtons}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default Products;
