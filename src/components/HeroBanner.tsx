import { Button } from "@/components/ui/button";
import AppBreadcrumb from "./shared/AppBreadcrumb";
import { useTranslation } from "react-i18next";

const HeroBanner = () => {
  const { t } = useTranslation();

  const handleDownloadCatalog = () => {
    const catalogData = {
      catalog: t("heroBanner.fullProductCatalog"),
      generatedAt: new Date().toISOString(),
      products: [],
    };
    const dataStr = JSON.stringify(catalogData, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = t("heroBanner.catalogFileName");
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="relative w-full">
      <div
        className="relative min-h-[100px] sm:min-h-[400px] lg:min-h-[600px] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/banners/hero-banner.png')" }}
      >
        <div className="relative z-10">
          <AppBreadcrumb
            wrapperDivClassName="bg-transparent pt-4"
            paths={[
              { label: t("heroBanner.home"), href: "/" },
              { label: t("heroBanner.orthopedicLine") },
            ]}
          />
          <div className="max-w-7xl mx-auto px-4 py-12 sm:py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-left">
                <img
                  src="/images/titles/orthopedic-line.png"
                  alt={t("heroBanner.orthopedicLine")}
                />{" "}
                <ul className="space-y-3 text-gray-700 text-base max-w-lg">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gray-800 rounded-full mt-[0.4rem] mr-3 flex-shrink-0"></span>
                    <span>{t("heroBanner.productDevelopmentInfo")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {t("heroBanner.discoverExclusiveFamiliesLine1")}{" "}
              <span className="text-purple-600">
                {t("heroBanner.discoverExclusiveFamiliesLine2")}
              </span>
            </h3>
            <p className="text-gray-600">
              {t("heroBanner.discoverExclusiveFamiliesLine3")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
            {[
              { name: "Hidrolight Neo", color: "bg-purple-700" },
              { name: "Comfort Air", color: "bg-gray-400" },
              { name: "Ortho Recovery", color: "bg-gray-400" },
              { name: "Air Flex", color: "bg-gray-400" },
              { name: "Softline", color: "bg-gray-400" },
              { name: "Foot Care", color: "bg-gray-400" },
              { name: "Lean", color: "bg-gray-400" },
            ].map((family, index) => (
              <button
                key={index}
                className={`${family.color} text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-80 transition-opacity`}
              >
                {family.name} <sup className="text-xs">®</sup>
              </button>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              <strong>{t("heroBanner.neopreneFamilyBenefit")}</strong>
            </p>
            <p className="text-gray-600 text-sm">
              {t("heroBanner.neopreneProperties")}
            </p>
          </div>

          <div className="flex justify-center mt-8">
            <Button
              onClick={handleDownloadCatalog}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium"
            >
              {t("heroBanner.downloadCatalogButton")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
