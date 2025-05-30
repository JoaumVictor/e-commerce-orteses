import { motion } from "framer-motion";
import { getProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface RelatedProductsCarouselProps {
  currentProductId: string;
}

const RelatedProductsCarousel = ({
  currentProductId,
}: RelatedProductsCarouselProps) => {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const allProducts = getProducts(lang);
  const relatedProducts = allProducts
    .filter((product) => product.id !== currentProductId)
    .slice(0, 8);

  return (
    <motion.div
      className="mt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.3 }}
    >
      <motion.h2
        className="text-2xl font-bold mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4 }}
      >
        {t("productDetail.seeMore")}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {relatedProducts.map((product, index) => (
              <CarouselItem
                key={product.id}
                className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="h-full"
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    code={product.code}
                    image={product.image}
                    isLaunch={product.isLaunch}
                  />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </motion.div>
    </motion.div>
  );
};

export default RelatedProductsCarousel;
