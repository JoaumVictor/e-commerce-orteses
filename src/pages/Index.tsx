import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const { t } = useTranslation();

  useEffect(() => {
    if (lang) {
      setTimeout(() => {
        navigate(`/${lang}/products`, { replace: true });
      }, 2000);
    }
  }, [navigate, lang]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <img
          src="/images/titles/orthopedic-line.png"
          alt="logotipo"
          className="mb-8"
        />
        <motion.h1 className="text-3xl font-medium mb-4">
          {t("common.loading")}
        </motion.h1>
      </div>
    </div>
  );
};

export default Index;
