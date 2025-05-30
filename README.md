# README - Desafio React Responsivo 🎉

## Descrição do Projeto 🚀

Este projeto foi criado para o desafio "Desenvolvimento de Página Web Responsiva com Versão Mobile". Desenvolvi uma página responsiva baseada no layout do Figma usando React com Vite, incluindo uma versão mobile otimizada. 🎨

## Tecnologias Utilizadas 💻

- **React**: Interface dinâmica.
- **Vite**: Build rápido.
- **Tailwind CSS**: Estilização eficiente.
- **Framer Motion**: Animações suaves.
- **TypeScript**: Tipagem estática.

## Funcionalidades ✨

- **Responsividade**: Ajuste perfeito para desktop, tablets e smartphones. 📱💻
- **Versão Mobile**: Menu hamburger, imagens otimizadas e fontes ajustadas. 📲
- **Fidelidade ao Design**: Layout desktop fiel ao Figma, mobile adaptado. 🎨
- **Navegação**: Menu fácil em mobile. 🌐

## Estrutura do Projeto 📂

```
E-COMMERCE-ORTESES/
  ├── node_modules/         # Dependências instaladas
  ├── public/              # Arquivos estáticos
  │   ├── images/          # Imagens do projeto
  │   │   ├── banners/     # Banners
  │   │   ├── flags/       # Flags
  │   │   ├── icons/       # Ícones
  │   │   ├── products/    # Imagens de produtos
  │   │   └── titles/      # Títulos
  │   ├── locales/         # Arquivos de localização
  │   │   ├── en/          # Inglês
  │   │   ├── es/          # Espanhol
  │   │   └── pt/          # Português
  │   ├── vite.svg         # Logo Vite
  │   └── .gitignore       # Arquivo de ignore do Git
  ├── src/                 # Código fonte
  │   ├── components/      # Componentes reutilizáveis
  │   │   ├── layout/      # Componentes de layout
  │   │   ├── shared/      # Componentes compartilhados
  │   │   ├── ui/          # Componentes de interface
  │   │   │   ├── FilterSidebar.tsx
  │   │   │   ├── HeroBanner.tsx
  │   │   │   ├── ImageCarousel.tsx
  │   │   │   ├── ImageZoom.tsx
  │   │   │   ├── ProductCard.tsx
  │   │   │   ├── ProductDetailSkeleton.tsx
  │   │   │   ├── ProductSkeleton.tsx
  │   │   │   └── RelatedProductsCarousel.tsx
  │   │   └── SearchProduct.tsx
  │   ├── data/            # Dados do aplicativo
  │   ├── hooks/           # Hooks personalizados
  │   ├── lib/             # Bibliotecas ou utilitários
  │   ├── pages/           # Páginas da aplicação
  │   │   ├── App.tsx
  │   │   ├── index.css
  │   │   └── main.tsx
  ├── docker-compose.yml   # Configuração Docker Compose
  ├── Dockerfile           # Configuração Docker
```

## Como Rodar o Projeto 🛠️

1. Clone o repo:
   ```bash
   git clone git@github.com:JoaumVictor/e-commerce-orteses.git
   cd e-commerce-orteses
   ```
2. Instale as deps:
   ```bash
   yarn install
   ```
3. Inicie:
   ```bash
   yarn dev
   ```
   Acesse em `http://localhost:8080`. 🌟

## Deploy 🌐

Veja ao vivo: [e-commerce-orteses.vercel.app](https://e-commerce-orteses.vercel.app). 🚀

## Decisões de Design 🎨

- **Mobile**: Menu hamburger, imagens otimizadas. 📱
- **Fontes**: Mínimo 16px, bom contraste. 🔍
- **Performance**: Lazy loading e build otimizado. ⚡

## Critérios de Avaliação ✅

- **Responsividade**: Testada de 320px a 1920px. 📏
- **Layout Mobile**: Fluido e funcional. 📲
- **Usabilidade**: Navegação intuitiva. 🌐
- **Fidelidade**: Desktop fiel, mobile adaptado. 🎨
- **Código**: Limpo e organizado. 💾
- **Performance**: Carregamento rápido. 🚀

## Autor 👨‍💻

- **Nome**: João Victor
- **GitHub**: [github.com/JoaumVictor](https://github.com/JoaumVictor)

## Agradecimentos 🙌

Obrigado pela oportunidade e pelo aprendizado! 🎓
