import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import FilterSidebar from "@/components/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import { products } from "@/data/products";
import { useProductFilters } from "@/hooks/useProductFilters";
import { Button } from "@/components/ui/button";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const productsPerPage = 6;

  const {
    filters,
    filteredProducts,
    updateFilter,
    toggleArrayFilter,
    clearFilters,
  } = useProductFilters(products);

  // Simulate loading delay
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
      catalog: "Catálogo Completo de Produtos",
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

    console.log("Baixando catálogo...");
  }, []);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
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

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
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
            <h1 className="text-2xl font-bold text-gray-800">
              {isLoading
                ? "Carregando produtos..."
                : `${filteredProducts.length} produto${
                    filteredProducts.length !== 1 ? "s" : ""
                  }`}
              {!isLoading && filters.searchTerm && (
                <span className="text-lg font-normal text-gray-600 ml-2">
                  para "{filters.searchTerm}"
                </span>
              )}
            </h1>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-colors"
                onClick={handleDownloadCatalog}
                disabled={isLoading}
              >
                Baixar Catálogo ↓
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
                  Nenhum produto encontrado com os filtros aplicados.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button onClick={clearFilters} variant="outline">
                    Limpar filtros
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

      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">LOGO</h3>
              <p className="text-gray-400 text-sm">Selecionar País 🇧🇷</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Institucional</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Sobre nós</li>
                <li>Trabalhe conosco</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Download de Catálogos</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Catálogo geral</li>
                <li>Linha Orthopedic</li>
                <li>Linha Sports</li>
                <li>Linha Special Cares</li>
                <li>Catálogo Foot Care</li>
                <li>Catálogo Acessibilidade</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">
                Entre em contato e tire suas dúvidas
              </h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>📞 +55 48 3435 8359</p>
                <p>✉️ sac@loremipsum.com.br ou</p>
                <p>regiao@loremipsum.com.br</p>
                <p className="mt-4">Acompanhe também nas redes sociais</p>
                <div className="flex space-x-2 mt-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
                  <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
                  <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
            © 2024 Lorem Ipsum. Todos os direitos reservados.
            <br />
            Av. das flores, 150 - Florianópolis - SC - Brasil
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Products;
