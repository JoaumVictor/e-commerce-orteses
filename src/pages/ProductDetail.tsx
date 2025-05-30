import { useParams, Navigate, Link } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import ImageZoom from "@/components/ImageZoom";
import ImageCarousel from "@/components/ImageCarousel";
import SizeChart from "@/components/SizeChart";
import ProductDetailSkeleton from "@/components/ProductDetailSkeleton";
import { getProductById } from "@/data/products";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

const ProductDetail = () => {
  const { t } = useTranslation();
  const { lang, id } = useParams<{ lang: string; id: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!id) {
    return <Navigate to="/products" replace />;
  }

  const product = getProductById(id, lang);

  if (!product && !isLoading) {
    return <Navigate to="/products" replace />;
  }

  const productImages = product?.images || [
    product?.image || "/placeholder.svg",
  ];
  const mainImage = selectedImage || productImages[0];

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Header searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ProductDetailSkeleton />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-7xl mx-auto px-4 py-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Breadcrumb className="mb-6">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to="/">{t("common.start")}</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to="/products">Linha Orthopedic</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbPage>{product?.name}</BreadcrumbPage>
                  </BreadcrumbList>
                </Breadcrumb>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-sm  mb-2">{product?.technology}</div>
                  <h1 className="text-3xl font-bold text-purple mb-6">
                    {product?.name}
                  </h1>

                  <ImageZoom src={mainImage} alt={product?.name || ""} />

                  {productImages.length > 1 && (
                    <ImageCarousel
                      images={productImages}
                      selectedImage={mainImage}
                      onImageSelect={handleImageSelect}
                    />
                  )}

                  <motion.div
                    className="mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        className="text-orange-500 border-orange-500 hover:bg-orange-50 transition-colors"
                        onClick={() => {
                          console.log("Download product folder");
                        }}
                      >
                        📁 Baixar Folder do Produto
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex space-x-8 text-sm">
                      <div>
                        <span className="font-medium">Código SKU:</span>{" "}
                        {product?.rightCode || product?.code}
                        <span className=" ml-2">Lado direito</span>
                      </div>
                      {product?.leftCode && (
                        <div>
                          <span className="font-medium">Código SKU:</span>{" "}
                          {product.leftCode}
                          <span className=" ml-2">Lado esquerdo</span>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h2 className="text-lg font-semibold mb-3">Descrição</h2>
                    <p className="text-gray-700 leading-relaxed">
                      {product?.detailedDescription || product?.description}
                    </p>
                  </motion.div>

                  {product?.level && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <h3 className="font-semibold text-gray-800">
                        {product.level}
                      </h3>
                      <p className="">{product.indication}</p>
                    </motion.div>
                  )}

                  {product?.availableColors &&
                    product.availableColors.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <h3 className="font-semibold mb-2">
                          Cores disponíveis:
                        </h3>
                        <div className="flex items-center space-x-3">
                          {product.availableColors.map((color) => (
                            <motion.div
                              key={color.name}
                              className="flex items-center space-x-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <div
                                className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-all ${
                                  selectedColor === color.name
                                    ? "border-orange-500"
                                    : "border-gray-300"
                                }`}
                                style={{ backgroundColor: color.value }}
                                onClick={() => setSelectedColor(color.name)}
                              />
                              <span className="text-sm">{color.name}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                  {product?.model && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <h3 className="font-semibold">Modelo:</h3>
                      <span className="">{product.model}</span>
                    </motion.div>
                  )}

                  {product?.availableSizes &&
                    product.availableSizes.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                      >
                        <h3 className="font-semibold mb-2">
                          Tamanhos disponíveis:
                        </h3>
                        <div className="flex items-center space-x-2 mb-2">
                          {product.availableSizes.map((size) => (
                            <motion.button
                              key={size}
                              onClick={() => setSelectedSize(size)}
                              className={`px-3 py-1 border rounded text-sm transition-all ${
                                selectedSize === size
                                  ? "border-orange-500 bg-orange-50 text-orange-700"
                                  : "border-gray-300 hover:border-gray-400"
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {size}
                            </motion.button>
                          ))}
                        </div>
                        <SizeChart />
                      </motion.div>
                    )}

                  <motion.div
                    className="flex space-x-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 transition-colors">
                        Encontrar lojas online
                      </Button>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="border-t pt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                  >
                    <p className="text-sm ">
                      Gostou desse produto?
                      <Button
                        variant="link"
                        className="text-orange-500 p-0 ml-1"
                      >
                        Seja um vendedor
                      </Button>
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="details">
                        <AccordionTrigger>Detalhes</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 text-sm">
                            <p>
                              <span className="font-medium">Nível:</span>{" "}
                              {product?.level || "Nível 3"}
                            </p>
                            <p>
                              <span className="font-medium">
                                Recuperação e tratamento de lesões GRAVES
                              </span>
                            </p>
                            <p>
                              <span className="font-medium">
                                Nome Comercial:
                              </span>{" "}
                              Órtese Splint Bilateral
                            </p>
                            <p>
                              <span className="font-medium">Linha:</span>{" "}
                              Orthopedic
                            </p>
                            <p>
                              <span className="font-medium">
                                Cód. Produto (referência/SKU):
                              </span>{" "}
                              {product?.code}
                            </p>
                            <p>
                              <span className="font-medium">
                                Família de Produtos:
                              </span>{" "}
                              Hidrolight Neo
                            </p>
                            <p>
                              <span className="font-medium">
                                Modelos do produto(esquerda/direita -
                                bilateral):
                              </span>{" "}
                              Bilateral
                            </p>
                            <p>
                              <span className="font-medium">Composição:</span>{" "}
                              74% borracha de cloropreno, 16% polamida e
                              10%poliéster e 15%PVC
                            </p>
                            <p className="text-orange-600 font-medium">
                              PRODUTO TÉRMICO
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="specifications">
                        <AccordionTrigger>
                          Especificações técnicas
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="text-sm ">
                            Especificações técnicas serão adicionadas aqui.
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="instructions">
                        <AccordionTrigger>
                          Indicações e Instruções de uso
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="text-sm ">
                            Indicações e instruções de uso serão adicionadas
                            aqui.
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="warranty">
                        <AccordionTrigger>Garantia</AccordionTrigger>
                        <AccordionContent>
                          <div className="text-sm ">
                            Informações sobre garantia serão adicionadas aqui.
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                className="mt-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
              >
                <h2 className="text-2xl font-bold mb-6">
                  Conheça também nossos outros produtos
                </h2>
                <div className="text-center text-gray-500 py-12">
                  <p>Seção de produtos relacionados será implementada aqui</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductDetail;
