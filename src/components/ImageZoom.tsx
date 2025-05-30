import { useState } from "react";
import { ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageZoomProps {
  src: string;
  alt: string;
  images: string[];
}

const ImageZoom = ({ src, alt, images }: ImageZoomProps) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const index = () => {
    return images.findIndex((each) => each === src) + 1;
  };

  return (
    <motion.div
      className="relative bg-white rounded-lg flex items-center justify-center min-h-96 cursor-zoom-in overflow-hidden max-h-[600px] w-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      {src ? (
        <motion.img
          src={src}
          alt={alt}
          className="max-w-full max-h-full object-cover"
          animate={{
            scale: isZoomed ? 1.5 : 1.12,
          }}
          transition={{ duration: 0.2 }}
          style={
            isZoomed
              ? {
                  transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                }
              : {}
          }
        />
      ) : (
        <motion.div
          className="text-gray-400 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="w-32 h-32 bg-gray-200 rounded-lg mx-auto mb-4"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <p>Imagem do produto</p>
        </motion.div>
      )}

      <AnimatePresence>
        <motion.div
          className="absolute bottom-4 left-1/2 bg-[#8d8d8d] rounded-md p-1 shadow-lg opacity-80"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <p className="text-white text-md">{`${index()}/${images.length}`}</p>
        </motion.div>
        {!isZoomed && src && (
          <motion.div
            className="absolute bottom-4 right-4 bg-[#8d8d8d] rounded-md p-1 shadow-lg opacity-80"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
          >
            <ZoomIn className="w-5 h-5 text-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ImageZoom;
