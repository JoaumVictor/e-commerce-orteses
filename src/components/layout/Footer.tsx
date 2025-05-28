import { memo } from "react";

const Footer = memo(() => {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">LOGO</h3>
            <p className="text-gray-400 text-sm">Selecionar País 🇧🇷</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Institucional</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Sobre nós</li>
              <li>Trabalhe conosco</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Download de Catálogos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Catálogo geral</li>
              <li>Linha Orthopedic</li>
              <li>Linha Sports</li>
              <li>Linha Special Cares</li>
              <li>Catálogo Foot Care</li>
              <li>Catálogo Acessibilidade</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">
              Entre em contato e tire suas dúvidas
            </h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>📞 +55 48 3435 8359</p>
              <p>✉️ sac@loremipsum.com.br ou</p>
              <p>regiao@loremipsum.com.br</p>
              <p className="mt-4">Acompanhe também nas redes sociais</p>
              <div className="flex space-x-2 mt-2">
                <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
                <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
                <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
          © 2024 Lorem Ipsum. Todos os direitos reservados.
          <br />
          Av. das flores, 150 - Florianópolis - SC - Brasil
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
