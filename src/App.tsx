import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import "@/lib/i18n";
import { useScrollToTop } from "./hooks/use-scrool-to-top";

const queryClient = new QueryClient();
const supportedLangs = ["pt", "en", "es"];

const LangWrapper = () => {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();
  useScrollToTop();

  useEffect(() => {
    const currentPath = location.pathname;
    const isRoot = currentPath === "/";
    const hasLang = supportedLangs.some((l) => currentPath.startsWith(`/${l}`));

    if (isRoot || !hasLang) {
      navigate("/pt", { replace: true });
    } else if (
      lang &&
      supportedLangs.includes(lang) &&
      i18n.language !== lang
    ) {
      i18n.changeLanguage(lang);
      localStorage.setItem("appLang", lang);
    }
  }, [lang, location.pathname, navigate, i18n]);

  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path="products" element={<Products />} />
      <Route path="products/:id" element={<ProductDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryErrorResetBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LangWrapper />} />
            <Route path="/:lang/*" element={<LangWrapper />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </QueryErrorResetBoundary>
);

export default App;
