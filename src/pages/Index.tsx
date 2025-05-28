import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  useEffect(() => {
    if (lang) {
      navigate(`/${lang}/products`, { replace: true });
    }
  }, [navigate, lang]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Redirecionando...</h1>
      </div>
    </div>
  );
};

export default Index;
