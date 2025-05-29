import AppBreadcrumb from "./shared/AppBreadcrumb";
import { useTranslation } from "react-i18next";

const HeroBanner = () => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full">
      <div
        className="relative min-h-[100px] sm:min-h-[400px] lg:min-h-[600px] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/banners/hero-banner.png')" }}
      >
        <div className="relative z-10">
          <AppBreadcrumb
            wrapperDivClassName="bg-transparent pt-8"
            paths={[
              { label: t("heroBanner.home"), href: "/" },
              { label: t("heroBanner.orthopedicLine") },
            ]}
          />
          <div className="max-w-7xl mx-auto px-4 py-12 sm:py-20 lg:py-40">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-left">
                <img
                  src="/images/titles/orthopedic-line.png"
                  alt={t("heroBanner.orthopedicLine")}
                  className="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px]"
                />{" "}
                <ul className="space-y-3 text-gray-700 text-base max-w-2xl">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gray-800 rounded-full mt-[0.4rem] mr-3 flex-shrink-0"></span>
                    <span className="lg:text-[24px] w-full">
                      {t("heroBanner.productDevelopmentInfo")}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12 text-center md:text-start md:w-5/12">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              {t("heroBanner.discoverExclusiveFamiliesLine1")}{" "}
              <span className="text-purple">
                {t("heroBanner.discoverExclusiveFamiliesLine2")}{" "}
              </span>
              {t("heroBanner.discoverExclusiveFamiliesLine3")}
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
            {[
              { name: "Hidrolight Neo", color: "bg-purple text-white" },
              { name: "Comfort Air", color: "bg-gray-100 text-purple" },
              { name: "Ortho Recovery", color: "bg-gray-100 text-purple" },
              { name: "Air Flex", color: "bg-gray-100 text-purple" },
              { name: "Softline", color: "bg-gray-100 text-purple" },
              { name: "Foot Care", color: "bg-gray-100 text-purple" },
              { name: "Lean", color: "bg-gray-100 text-purple" },
            ].map((family, index) => (
              <button
                key={index}
                className={`${family.color} px-4 py-2 rounded-full text-sm font-medium hover:opacity-80 transition-opacity`}
              >
                {family.name} <sup className="text-xs">®</sup>
              </button>
            ))}
          </div>

          <div className="rounded-lg md:w-5/12">
            <p className="text-sm">{t("heroBanner.neopreneFamilyBenefit")}</p>
            <p className="text-gray-600 text-sm">
              {t("heroBanner.neopreneProperties")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
