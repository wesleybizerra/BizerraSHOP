
import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import { MessageCircle, Mail, MapPin, Send, Instagram, Youtube, Facebook, Twitter } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="py-20 bg-gray-50 animate-in fade-in duration-500">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Entre em Contato</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Estamos prontos para tirar suas dúvidas e ajudar você a encontrar o melhor plano. Escolha o canal de sua preferência.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-6 hover:shadow-md transition-shadow">
              <div className="bg-orange-100 text-orange-600 p-4 rounded-2xl">
                <MessageCircle size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
                <p className="text-gray-500 mb-4">Atendimento rápido e personalizado de segunda a sábado.</p>
                <a 
                  href={SOCIAL_LINKS.whatsapp} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-orange-600 font-bold hover:underline"
                >
                  Abrir Conversa Agora →
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-6 hover:shadow-md transition-shadow">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl">
                <Mail size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">E-mail</h3>
                <p className="text-gray-500 mb-4">Envie-nos uma mensagem para suporte técnico ou parcerias.</p>
                <a 
                  href="mailto:contato@bizerrashop.com" 
                  className="text-blue-600 font-bold hover:underline"
                >
                  contato@bizerrashop.com →
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-6 hover:shadow-md transition-shadow">
              <div className="bg-red-100 text-red-600 p-4 rounded-2xl">
                <MapPin size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Atendimento Digital</h3>
                <p className="text-gray-500">Operamos 100% online para garantir os melhores preços do mercado nacional.</p>
              </div>
            </div>
          </div>

          {/* Social Links Form Style */}
          <div className="bg-black text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-8">Nossas Redes</h2>
              <p className="mb-10 text-gray-400">Fique por dentro de todas as novidades, sorteios e promoções exclusivas seguindo nossos canais oficiais.</p>
              
              <div className="grid grid-cols-2 gap-4">
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 bg-gray-900 rounded-2xl hover:bg-orange-600 transition-colors group">
                  <Instagram className="group-hover:scale-110 transition-transform" />
                  <span>Instagram</span>
                </a>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 bg-gray-900 rounded-2xl hover:bg-red-600 transition-colors group">
                  <Youtube className="group-hover:scale-110 transition-transform" />
                  <span>YouTube</span>
                </a>
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 bg-gray-900 rounded-2xl hover:bg-blue-600 transition-colors group">
                  <Facebook className="group-hover:scale-110 transition-transform" />
                  <span>Facebook</span>
                </a>
                <a href={SOCIAL_LINKS.x} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 bg-gray-900 rounded-2xl hover:bg-gray-700 transition-colors group">
                  <Twitter className="group-hover:scale-110 transition-transform" />
                  <span>X (Twitter)</span>
                </a>
              </div>

              <div className="mt-12 p-6 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl text-black">
                <div className="flex items-center gap-4">
                  <Send size={24} />
                  <div>
                    <p className="font-bold text-lg">Precisa de ajuda urgente?</p>
                    <p className="text-sm font-medium opacity-80">Nosso suporte via WhatsApp é 24/7 para emergências.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
