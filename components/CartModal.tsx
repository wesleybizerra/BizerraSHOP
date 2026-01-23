
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    setIsLoading(true);
    try {
      // Aqui você deve colocar a URL do seu Railway após o deploy
      // Para testes locais, usa localhost:3000
      const BACKEND_URL = 'https://SUA-URL-DO-RAILWAY.up.railway.app'; 
      
      const response = await fetch(`${BACKEND_URL}/create_preference`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cart }),
      });

      if (!response.ok) throw new Error('Erro ao processar checkout');

      const data = await response.json();
      
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert('Erro ao gerar link de pagamento. Tente novamente.');
      }
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao conectar com o servidor. Verifique sua conexão.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md animate-in slide-in-from-right duration-300">
          <div className="h-full flex flex-col bg-white shadow-2xl rounded-l-3xl overflow-hidden">
            <div className="px-6 py-6 bg-gray-50 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShoppingBag className="text-orange-500" />
                Seu Carrinho ({totalItems})
              </h2>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto px-6 py-4 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag size={40} className="text-gray-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Seu carrinho está vazio</h3>
                  <p className="text-gray-500 mb-6">Explore nossos produtos e encontre algo incrível.</p>
                  <button 
                    onClick={onClose}
                    className="px-6 py-3 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition-colors"
                  >
                    Voltar às compras
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 group">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover rounded-2xl shadow-sm border"
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-gray-800 leading-tight">{item.name}</h4>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-gray-500 text-xs mb-3">Unitário: R$ {item.price.toFixed(2)}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-gray-100 rounded-full px-2 py-1">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-full shadow-sm transition-all"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-bold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-full shadow-sm transition-all"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-bold text-gray-900">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-gray-50 border-t space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="text-2xl font-bold text-gray-900">R$ {totalPrice.toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all shadow-xl flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      Finalizar Compra
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
