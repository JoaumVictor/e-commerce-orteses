import { memo } from "react";
import { useTranslation } from "react-i18next";
import SelectLanguage from "../shared/SelectLanguage";

const extraData = [
  "/images/icons/insta.png",
  "/images/icons/youtube.png",
  "/images/icons/facebook.png",
];

const Footer = memo(() => {
  const { t } = useTranslation();

  const footerData = [
    {
      title: t("footer.institutional"),
      items: [
        { label: t("footer.about_us") },
        { label: t("footer.work_with_us") },
      ],
    },
    {
      title: t("footer.catalogs"),
      items: [
        { label: t("footer.general_catalog") },
        { label: t("footer.orthopedic_line") },
        { label: t("footer.sports_line") },
        { label: t("footer.special_cares_line") },
        { label: t("footer.footcare_catalog") },
        { label: t("footer.accessibility_catalog") },
      ],
    },
    {
      title: t("footer.contact_us"),
      items: [
        {
          label: t("footer.phone"),
          icon: "/images/icons/telephone.png",
        },
        {
          label: t("footer.email"),
          icon: "/images/icons/email.png",
        },
      ],
      extra: (
        <>
          <p className="mt-4 text-white font-semibold w-1/2">
            {t("footer.follow_us")}
          </p>
          <div className="flex space-x-2 mt-2">
            {extraData.map((src, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden"
              >
                <img
                  src={src}
                  alt={`social-${src}`}
                  width={30}
                  height={30}
                  className="object-contain cursor-pointer transition-all hover:scale-105"
                />
              </div>
            ))}
          </div>
        </>
      ),
    },
  ];

  return (
    <footer className="bg-[#4C4D4C] text-white mt-16 w-full">
      <div className="mx-auto py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 px-6">
          {/* Logo e país */}
          <div className="px-4 md:px-0">
            <h3 className="text-3xl font-medium">{t("footer.logo")}</h3>
          </div>

          {/* Demais colunas */}
          {footerData.map(({ title, items, extra }, index) => (
            <div className="px-4 md:px-0" key={index}>
              <h4 className="font-semibold mb-4">{title}</h4>
              <div className="space-y-3 text-sm !text-white">
                {items.map(({ label, icon }, i: number) => (
                  <p
                    key={i}
                    className="cursor-pointer flex items-center justify-start gap-2 text-gray-60"
                  >
                    {icon && (
                      <img
                        src={icon}
                        alt={`social-${icon}`}
                        width={30}
                        height={30}
                        className="object-contain cursor-pointer transition-all hover:scale-105"
                      />
                    )}
                    <span>{label}</span>
                  </p>
                ))}
                {extra}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white w-full mt-10 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-col md:flex-row gap-4 py-10 px-4 md:px-0">
            <div className="flex items-center justify-center gap-2">
              <p className="text-white">{t("footer.select_country")}</p>
              <SelectLanguage />
            </div>
            <span className="text-center md:text-end whitespace-pre-line">
              {t("footer.copyright")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
