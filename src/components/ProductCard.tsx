import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface ProductCardProps {
  id: string;
  name: string;
  code: string;
  image?: string;
  isLaunch?: boolean;
}

const ProductCard = ({ id, name, code, image, isLaunch }: ProductCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  const handleClick = () => {
    if (lang) {
      navigate(`/${lang}/products/${id}`, { replace: true });
    }
  };

  return (
    <motion.div
      className=" rounded-lg cursor-pointer relative overflow-hidden"
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        scale: 1.0,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {isLaunch && (
        <motion.div
          className="absolute left-2 top-2 z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="bg-purple opacity-80 text-white px-2 py-1 rounded text-xs font-medium">
            {t("products.newProduct")}
          </span>
        </motion.div>
      )}

      <motion.div
        className="flex items-center justify-center overflow-hidden min-h-[400px] mb-2"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-32 h-32 bg-gray-200 rounded-lg"></div>
        )}
      </motion.div>

      <h3 className="font-medium text-gray-800 mb-2 text-sm leading-tight">
        {name}
      </h3>
      <div className="flex justify-between items-start text-xs">
        <span className="font-bold w-1/2">{t("products.productCode")}</span>
        <span className="w-1/2">{code}</span>
      </div>
    </motion.div>
  );
};

export default ProductCard;
