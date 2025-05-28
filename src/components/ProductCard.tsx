import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface ProductCardProps {
  id: string;
  name: string;
  code: string;
  image?: string;
  isLaunch?: boolean;
}

const ProductCard = ({ id, name, code, image, isLaunch }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${id}`);
  };

  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer"
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {isLaunch && (
        <motion.div
          className="mb-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="bg-pink-400 text-white px-2 py-1 rounded text-xs font-medium">
            Lançamento
          </span>
        </motion.div>
      )}

      <motion.div
        className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="w-32 h-32 bg-gray-200 rounded-lg"></div>
        )}
      </motion.div>

      <h3 className="font-medium text-gray-800 mb-2 text-sm leading-tight">
        {name}
      </h3>
      <div className="flex justify-between items-center text-xs">
        <span>Cód. Produto</span>
        <span>{code}</span>
      </div>
    </motion.div>
  );
};

export default ProductCard;
