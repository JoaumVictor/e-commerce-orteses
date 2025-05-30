import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface ImageCarouselProps {
  images: string[];
  onImageSelect: (image: string) => void;
  selectedImage: string;
}

const ImageCarousel = ({
  images,
  onImageSelect,
  selectedImage,
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleImages = 4;

  const nextSlide = () => {
    if (currentIndex < images.length - visibleImages) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <motion.div
      className="relative flex items-center space-x-2 mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="h-8 w-8 rounded-full"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </motion.div>

      <div className="flex space-x-2 overflow-hidden">
        <AnimatePresence mode="wait">
          {images
            .slice(currentIndex, currentIndex + visibleImages)
            .map((image, index) => {
              const absoluteIndex = currentIndex + index;
              const blurAmount = index * 0.8;

              return (
                <motion.div
                  key={absoluteIndex}
                  className={`w-[120px] h-[90px] border-b-4 rounded cursor-pointer transition-all ${
                    selectedImage === image
                      ? "border-b-orange-500"
                      : "border-gray-200"
                  }`}
                  style={{
                    filter: selectedImage !== image && `blur(${blurAmount}px)`,
                  }}
                  onClick={() => onImageSelect(image)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Product ${absoluteIndex + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          disabled={currentIndex >= images.length - visibleImages}
          className="h-8 w-8 rounded-full"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ImageCarousel;
