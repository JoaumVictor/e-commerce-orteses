
import { Button } from "@/components/ui/button";

const HeroBanner = () => {
  const handleDownloadCatalog = () => {
    // Criar um JSON com todos os produtos
    const catalogData = {
      catalog: "Catálogo Completo de Produtos",
      generatedAt: new Date().toISOString(),
      products: [
        // Aqui virão todos os produtos do site
        // Por enquanto usando dados mock
      ]
    };

    // Converter para JSON e fazer download
    const dataStr = JSON.stringify(catalogData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'catalogo-produtos.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    console.log('Baixando catálogo...');
  };

  return (
    <div className="relative w-full">
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <span>Início</span>
            <span className="mx-2">→</span>
            <span className="text-purple-600">Linha Orthopedic</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-100 to-pink-100 min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-purple-800 mb-4">
                  LINHA
                </h1>
                <h2 className="text-4xl lg:text-5xl font-bold text-purple-600 mb-6">
                  ORTHOPEDIC
                  <div className="w-32 h-1 bg-purple-600 mt-2"></div>
                </h2>
              </div>
              
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Produtos desenvolvidos para auxiliar na prevenção e retorno das atividades, no tratamento e recuperação de pacientes com lesões ortopédicas.</span>
                </li>
              </ul>
            </div>
            
            <div className="relative">
              <img 
                src="/lovable-uploads/c615da18-7208-482f-be15-dbd1fef858b1.png" 
                alt="Profissional usando órtese"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product Families Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Conheça as <span className="text-purple-600">famílias exclusivas</span>
            </h3>
            <p className="text-gray-600">da linha Orthopedic</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
            {[
              { name: "Hidrolight Neo", color: "bg-purple-700" },
              { name: "Comfort Air", color: "bg-gray-400" },
              { name: "Ortho Recovery", color: "bg-gray-400" },
              { name: "Air Flex", color: "bg-gray-400" },
              { name: "Softline", color: "bg-gray-400" },
              { name: "Foot Care", color: "bg-gray-400" },
              { name: "Lean", color: "bg-gray-400" }
            ].map((family, index) => (
              <button
                key={index}
                className={`${family.color} text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-80 transition-opacity`}
              >
                {family.name}
                <sup className="text-xs">®</sup>
              </button>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              <strong>Família voltada para extrair os benefícios do Neoprene.</strong>
            </p>
            <p className="text-gray-600 text-sm">
              Propriedades térmicas, compressivas e elásticas: são essas três propriedades que fazem do Neoprene uma ferramenta eficaz no tratamento e prevenção de lesões no tratamento ortopédico.
            </p>
          </div>

          <div className="flex justify-center mt-8">
            <Button 
              onClick={handleDownloadCatalog}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium"
            >
              Baixar Catálogo ↓
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
