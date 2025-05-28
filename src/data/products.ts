export interface Product {
  id: string;
  name: string;
  code: string;
  image?: string;
  images?: string[];
  isLaunch?: boolean;
  description?: string;
  detailedDescription?: string;
  features?: string[];
  family: string;
  technology: string;
  category: string;
  level?: string;
  indication?: string;
  availableColors?: Array<{
    name: string;
    value: string;
  }>;
  availableSizes?: string[];
  model?: string;
  rightCode?: string;
  leftCode?: string;
}

export const families = [
  "Orthopedic",
  "Sports",
  "Special Cares",
  "Foot Care",
  "Acessibilidade",
];

export const technologies = [
  "Air Technology",
  "Gel Technology",
  "Memory Foam",
  "Carbon Fiber",
  "Silicone",
];

export const categories = [
  "Órteses",
  "Palmilhas",
  "Suportes",
  "Bandagens",
  "Acessórios",
];

export const products: Product[] = [
  {
    id: "1",
    name: "Órtese Splint Bilateral",
    code: "OR83",
    rightCode: "OR83",
    leftCode: "OR83",
    isLaunch: false,
    family: "Orthopedic",
    technology: "Hidrolight Neo",
    category: "Órteses",
    level: "Nível 3",
    indication: "Recuperação e tratamento de lesões GRAVES",
    model: "Bilateral",
    availableColors: [{ name: "Preto", value: "#000000" }],
    availableSizes: ["Único", "Especial"],
    description:
      "A Órtese Splint Bilateral Hidrolight é feita de neoprene Plush, com propriedades isolantes térmicas e um acabamento elegante em plush.",
    detailedDescription:
      "A Órtese Splint Bilateral Hidrolight é feita de neoprene Plush, com propriedades isolantes térmicas e um acabamento elegante em plush. Possui ampla capacidade de ajuste devido à aderência do tecido. Em repouso, a órtese já está pré-ajustada, com fechamento do polegar e uma membrana elástica que funciona como um bolso, facilitando a colocação pelo próprio paciente. As talas internas são facilmente ajustáveis para se adaptarem à mão desejada. São fornecidas duas talas removíveis, uma com curvatura ideal para sustentar o punho até a palma da mão, e a segunda reta na parte dorsal do punho, impedindo movimentos para cima e para baixo. O elástico aderente envolve a articulação, proporcionando compressão de acordo com a indicação médica e a necessidade do paciente.",
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
  },
  {
    id: "2",
    name: "Órtese Soft Curta sem Polegar",
    code: "OR1066",
    isLaunch: true,
    family: "Orthopedic",
    technology: "Gel Technology",
    category: "Órteses",
    level: "Nível 2",
    indication: "Recuperação e prevenção",
    availableColors: [
      { name: "Preto", value: "#000000" },
      { name: "Bege", value: "#F5F5DC" },
    ],
    availableSizes: ["P", "M", "G", "GG"],
    images: ["/placeholder.svg"],
  },
  {
    id: "3",
    name: "Órtese Soft Curta com Polegar",
    code: "OR1065",
    isLaunch: false,
    family: "Sports",
    technology: "Air Technology",
    category: "Órteses",
    images: ["/placeholder.svg"],
  },
  {
    id: "4",
    name: "Órtese Safe Air",
    code: "OR1051",
    isLaunch: true,
    family: "Special Cares",
    technology: "Air Technology",
    category: "Suportes",
    images: ["/placeholder.svg"],
  },
  {
    id: "5",
    name: "Órtese Soft Curta com Polegar",
    code: "OR1065",
    isLaunch: false,
    family: "Foot Care",
    technology: "Silicone",
    category: "Palmilhas",
    images: ["/placeholder.svg"],
  },
  {
    id: "6",
    name: "Órtese Soft Curta sem Polegar",
    code: "OR1066",
    isLaunch: true,
    family: "Acessibilidade",
    technology: "Carbon Fiber",
    category: "Bandagens",
    images: ["/placeholder.svg"],
  },
  {
    id: "7",
    name: "Órtese Safe Air",
    code: "OR1051",
    isLaunch: true,
    family: "Orthopedic",
    technology: "Memory Foam",
    category: "Acessórios",
    images: ["/placeholder.svg"],
  },
  {
    id: "8",
    name: "Órtese Soft Curta com Polegar",
    code: "OR1065",
    isLaunch: false,
    family: "Sports",
    technology: "Gel Technology",
    category: "Órteses",
    images: ["/placeholder.svg"],
  },
  {
    id: "9",
    name: "Órtese Soft Curta sem Polegar",
    code: "OR1066",
    isLaunch: true,
    family: "Special Cares",
    technology: "Air Technology",
    category: "Suportes",
    images: ["/placeholder.svg"],
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};
