
import React, { useState } from 'react';
import { INITIAL_PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';
// Fix: Added 'Package' to the imports from lucide-react
import { ShoppingCart, Plus, Check, Package } from 'lucide-react';

const Products: React.FC = () => {
  const { addToCart } = useCart();
  const [filter, setFilter] = useState('Todos');
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = ['Todos', ...Array.from(new Set(INITIAL_PRODUCTS.map(p => p.category)))];
  
  const filteredProducts = filter === 'Todos' 
    ? INITIAL_PRODUCTS 
    : INITIAL_PRODUCTS.filter(p => p.category === filter);

  const handleAddToCart = (product: any) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
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
                    : 'bg-white text-gray-600 hover:bg-gray-100'
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
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
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
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600 transition-colors">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-sm text-gray-400">A partir de</span>
                    <div className="text-2xl font-bold text-gray-900">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className={`p-3 rounded-2xl transition-all flex items-center justify-center ${
                      addedId === product.id 
                        ? 'bg-green-500 text-white' 
                        : 'bg-orange-500 text-white hover:bg-orange-600 active:scale-95'
                    }`}
                  >
                    {addedId === product.id ? <Check size={24} /> : <Plus size={24} />}
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
    </div>
  );
};

export default Products;
