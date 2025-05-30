import { useParams, Navigate } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import ImageZoom from "@/components/ImageZoom";
import ImageCarousel from "@/components/ImageCarousel";
import ProductDetailSkeleton from "@/components/ProductDetailSkeleton";
import { getProductById } from "@/data/products";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";
import AppBreadcrumb from "@/components/shared/AppBreadcrumb";
import { DownloadIcon } from "lucide-react";
import Footer from "@/components/layout/Footer";
import RelatedProductsCarousel from "@/components/RelatedProductsCarousel";

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

  useEffect(() => {
    // tempo pra vc ver o skeleton que apliquei
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

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

  const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(/[?&]v=([^&]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : url.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}`;
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
            className="p-4 md:px-10"
          >
            <div className="max-w-7xl mx-auto py-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <AppBreadcrumb
                  paths={[
                    {
                      label: t("common.start"),
                      href: "/",
                    },
                    {
                      label: t("appBreadcrumb.orthopedicLine"),
                      href: "/",
                    },
                    {
                      label: product?.name,
                      href: "/",
                    },
                  ]}
                />
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 my-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <ImageZoom
                    src={mainImage}
                    images={productImages}
                    alt={product?.name || ""}
                  />

                  {productImages.length > 1 && (
                    <ImageCarousel
                      images={productImages}
                      selectedImage={mainImage}
                      onImageSelect={handleImageSelect}
                    />
                  )}

                  <motion.div
                    className="mt-6 flex items-center justify-center md:justify-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="ghost"
                        className="text-orange transition-colors"
                        onClick={() => {
                          console.log("Download product folder");
                        }}
                      >
                        {t("productDetail.downloadFolder")}
                        <DownloadIcon />
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="flex-col flex"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="font-semibold mb-2">{product.technology}</p>
                  <h1 className="bg-purple text-white text-3xl md:text-[48px] font-bold py-2 px-4 rounded-xl">
                    {product?.name}
                  </h1>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex space-x-8 my-6 text-sm text-gray-300">
                      <div>
                        <span className="font-medium">
                          {t("productDetail.SKUCode")}
                        </span>{" "}
                        {product?.rightCode || product?.code}
                        <span className=" ml-2">
                          {t("productDetail.rightSide")}
                        </span>
                      </div>
                      {product?.leftCode && (
                        <div>
                          <span className="font-medium">
                            {t("productDetail.SKUCode")}
                          </span>{" "}
                          {product.leftCode}
                          <span className=" ml-2">
                            {t("productDetail.leftSide")}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-4"
                  >
                    <h2 className="text-black text-lg font-semibold mb-3">
                      {t("productDetail.description")}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {product?.detailedDescription || product?.description}
                    </p>
                  </motion.div>

                  {product?.level && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="mb-4"
                    >
                      <h3 className="font-semibold text-gray-800">
                        {product.level}
                      </h3>
                      <p className="">{product.indication}</p>
                    </motion.div>
                  )}

                  <div className="w-full h-[2px] bg-gray-200 mt-2 mb-4" />

                  {product?.availableColors &&
                    product.availableColors.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex items-center justify-start gap-4 my-2"
                      >
                        <h3 className="font-semibold">
                          {t("productDetail.colors")}
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
                                    ? "border-orange"
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
                      className="flex items-center justify-start gap-4 my-2"
                    >
                      <h3 className="font-semibold">
                        {t("productDetail.model")}
                      </h3>
                      <span className="">{product.model}</span>
                    </motion.div>
                  )}

                  {product?.availableSizes &&
                    product.availableSizes.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="flex items-center justify-start gap-4 my-2"
                      >
                        <h3 className="font-semibold">
                          {t("productDetail.sizes")}
                        </h3>
                        <div className="flex items-center space-x-2 mb-2">
                          {product.availableSizes.map((size) => (
                            <motion.button
                              key={size}
                              onClick={() => setSelectedSize(size)}
                              className={`px-3 py-1 border rounded text-sm transition-all ${
                                selectedSize === size
                                  ? "border-orange bg-orange-50 text-orange-700"
                                  : "bg-gray-60 hover:border-gray-400"
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {size}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                  <div className="flex gap-4 mb-4">
                    <span className="flex gap-2">
                      <img
                        src="/images/icons/size.png"
                        alt="icon"
                        width={20}
                        height={20}
                      />
                      <p className="text-orange hover:underline cursor-pointer">
                        {t("productDetail.discoverYourSize")}
                      </p>
                    </span>
                    <span className="flex gap-2">
                      <img
                        src="/images/icons/fita.png"
                        alt="icon"
                        width={20}
                        height={20}
                      />
                      <p className=" hover:underline cursor-pointer">
                        {t("productDetail.table")}
                      </p>
                    </span>
                  </div>

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
                      <Button className="bg-orange hover:bg-orange-600 text-white px-8 py-3 transition-colors">
                        {t("productDetail.shopsOnline")}
                      </Button>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className=" pt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                  >
                    <p className="text-sm underline text-black">
                      {t("productDetail.seeler")}
                    </p>
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                className="w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.iframe
                  src={getYouTubeEmbedUrl(
                    "https://www.youtube.com/watch?v=dTS_aNfpbIM&pp=ygURcmVwbyBpIGxvdmUgbXVzaWPSBwkJsAkBhyohjO8%3D"
                  )}
                  className="w-full min-h-[300px] md:min-h-[600px] object-contain mb-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                />
                <motion.img
                  src={"/images/banners/product.png"}
                  alt={t("videoImageBanner.bannerAlt")}
                  className="w-full object-cover mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="details">
                    <AccordionTrigger>
                      {t("productDetail.mockDetails.detailsTrigger")}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">
                            {t("productDetail.mockDetails.level")}
                          </span>{" "}
                          {product?.level ||
                            t("productDetail.mockDetails.defaultLevel")}
                        </p>
                        <p>
                          <span className="font-medium">
                            {t("productDetail.mockDetails.recoveryTreatment")}
                          </span>
                        </p>
                        <p>
                          <span className="font-medium">
                            {t("productDetail.mockDetails.commercialName")}
                          </span>{" "}
                          {t("productDetail.mockDetails.splintBilateral")}
                        </p>
                        <p>
                          <span className="font-medium">
                            {t("productDetail.mockDetails.line")}
                          </span>{" "}
                          {t("productDetail.mockDetails.orthopedic")}
                        </p>
                        <p>
                          <span className="font-medium">
                            {t("productDetail.mockDetails.productCode")}
                          </span>{" "}
                          {product?.code}
                        </p>
                        <p>
                          <span className="font-medium">
                            {t("productDetail.mockDetails.productFamily")}
                          </span>{" "}
                          {t("productDetail.mockDetails.hidrolightNeo")}
                        </p>
                        <p>
                          <span className="font-medium">
                            {t("productDetail.mockDetails.models")}
                          </span>{" "}
                          {t("productDetail.mockDetails.bilateral")}
                        </p>
                        <p>
                          <span className="font-medium">
                            {t("productDetail.mockDetails.composition")}
                          </span>{" "}
                          {t("productDetail.mockDetails.compositionValue")}
                        </p>
                        <p className="text-orange-600 font-medium">
                          {t("productDetail.mockDetails.thermalProduct")}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="specifications">
                    <AccordionTrigger>
                      {t("productDetail.mockDetails.specificationsTrigger")}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="text-sm ">
                        {t("productDetail.mockDetails.specificationsContent")}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="instructions">
                    <AccordionTrigger>
                      {t("productDetail.mockDetails.instructionsTrigger")}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="text-sm ">
                        {t("productDetail.mockDetails.instructionsContent")}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="warranty">
                    <AccordionTrigger>
                      {t("productDetail.mockDetails.warrantyTrigger")}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="text-sm ">
                        {t("productDetail.mockDetails.warrantyContent")}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>

              <motion.div
                className="mt-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
              >
                <RelatedProductsCarousel currentProductId={id} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </motion.div>
  );
};

export default ProductDetail;
