
import React, { useState } from 'react';
import { INITIAL_PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';
import { Plus, Check, Package, X, ChevronRight } from 'lucide-react';
import { Product, Variation } from '../types';

const Products: React.FC = () => {
  const { addToCart } = useCart();
  const [filter, setFilter] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = ['Todos', ...Array.from(new Set(INITIAL_PRODUCTS.map(p => p.category)))];
  
  const filteredProducts = filter === 'Todos' 
    ? INITIAL_PRODUCTS 
    : INITIAL_PRODUCTS.filter(p => p.category === filter);

  const handleAddToCart = (product: Product, variation: Variation) => {
    addToCart(product, variation);
    setAddedId(`${product.id}_${variation.name}`);
    setTimeout(() => setAddedId(null), 2000);
    setSelectedProduct(null); // Fecha o modal de opções após adicionar
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Nossos Produtos</h1>
            <p className="text-gray-600">Escolha o seu plano favorito e comece a aproveitar.</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  filter === cat 
                    ? 'bg-orange-500 text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600 transition-colors">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-tighter">A partir de</span>
                    <div className="text-xl font-extrabold text-gray-900">
                      R$ {Math.min(...product.variations.map(v => v.price)).toFixed(2).replace('.', ',')}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-orange-600 transition-all flex items-center gap-2 shadow-lg shadow-orange-200"
                  >
                    Ver Opções <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <Package size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-500">Nenhum produto encontrado nesta categoria.</h3>
          </div>
        )}
      </div>

      {/* Variation Selection Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-2xl font-bold">Opções de {selectedProduct.name}</h2>
              <button onClick={() => setSelectedProduct(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
              {selectedProduct.variations.map((v, idx) => (
                <div 
                  key={idx} 
                  className="p-5 border-2 border-gray-100 rounded-2xl flex items-center justify-between hover:border-orange-500 hover:bg-orange-50 transition-all cursor-pointer group"
                  onClick={() => handleAddToCart(selectedProduct, v)}
                >
                  <div className="flex-grow pr-4">
                    <h4 className="font-bold text-gray-800 leading-tight mb-1">{v.name}</h4>
                    <span className="text-2xl font-black text-orange-600">R$ {v.price.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="bg-orange-500 text-white p-3 rounded-xl group-hover:scale-110 transition-transform">
                    {addedId === `${selectedProduct.id}_${v.name}` ? <Check size={20} /> : <Plus size={20} />}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-gray-100 text-center text-sm text-gray-500 font-medium">
              Selecione uma opção para adicionar ao carrinho.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
