
import React from 'react';
// Changed import from 'react-router-dom' to 'react-router' to resolve missing export errors
import { Link } from 'react-router';
import { Rocket, Heart, ShieldCheck, Star } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gradient-to-br from-orange-400 via-orange-500 to-yellow-400 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-0"></div>
        <div className="container mx-auto px-4 text-center z-10 text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-xl animate-in slide-in-from-bottom duration-1000">
            Bem-vindo à Bizerra Shop
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto drop-shadow-md">
            Transforme sua forma de assistir. Sinta a emoção, viva o melhor do streaming agora mesmo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/produtos" 
              className="px-8 py-4 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-900 hover:scale-105 transition-all shadow-xl"
            >
              Explorar Produtos
            </Link>
            <Link 
              to="/contato" 
              className="px-8 py-4 bg-white/20 backdrop-blur-md text-white border-2 border-white/50 rounded-full font-bold text-lg hover:bg-white/30 transition-all"
            >
              Fale Conosco
            </Link>
          </div>
        </div>

        {/* Floating elements simulation */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-orange-300/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Por que escolher a Bizerra Shop?</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-8 rounded-2xl bg-orange-50 border border-orange-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Planos Acessíveis</h3>
              <p className="text-gray-600">
                Preços flexíveis que cabem no seu bolso, sem comprometer a qualidade da sua diversão.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-yellow-50 border border-yellow-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-yellow-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-3">
                <Rocket size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Compra Instantânea</h3>
              <p className="text-gray-600">
                Checkout simplificado e entrega rápida para você começar a maratonar em minutos.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-red-50 border border-red-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Suporte Humanizado</h3>
              <p className="text-gray-600">
                Atendimento direto via WhatsApp com pessoas reais prontas para te ajudar com qualquer dúvida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Call to Action */}
      <section className="py-16 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Junte-se a milhares de clientes satisfeitos</h2>
            <p className="text-lg text-gray-600 mb-8">
              Nossa missão é democratizar o acesso ao entretenimento digital de qualidade no Brasil. Venha fazer parte da família Bizerra Shop.
            </p>
            <div className="flex items-center gap-4 justify-center md:justify-start">
               <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                   <img key={i} src={`https://picsum.photos/seed/${i + 10}/100/100`} className="w-12 h-12 rounded-full border-2 border-white object-cover" alt="User" />
                 ))}
               </div>
               <span className="font-semibold text-gray-700">+5.000 clientes</span>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative z-10 p-4 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <img src="https://picsum.photos/seed/shop/600/400" className="rounded-2xl w-full" alt="Promo" />
            </div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-400 rounded-full -z-0 blur-2xl opacity-40"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
