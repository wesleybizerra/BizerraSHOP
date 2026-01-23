
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
      const BACKEND_URL = 'https://bizerrashop-production.up.railway.app'; 
      
      const response = await fetch(`${BACKEND_URL}/create_preference`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          items: cart.map(item => ({
            id: item.id,
            name: `${item.name} - ${item.variationName}`,
            price: item.price,
            quantity: item.quantity
          })) 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro no servidor');
      }

      const data = await response.json();
      
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert('Erro: O Mercado Pago não retornou o link de pagamento.');
      }
    } catch (error: any) {
      console.error('Erro de Checkout:', error);
      alert('Erro de conexão com o servidor. Verifique se o backend no Railway está ativo e se a URL está correta.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-2xl rounded-l-3xl overflow-hidden animate-in slide-in-from-right duration-300">
            <div className="px-6 py-6 bg-gray-50 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShoppingBag className="text-orange-500" />
                Seu Carrinho ({totalItems})
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto px-6 py-4 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300">
                    <ShoppingBag size={40} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Seu carrinho está vazio</h3>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl shadow-sm" />
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0">
                          <h4 className="font-bold text-sm truncate">{item.name}</h4>
                          <p className="text-[10px] text-orange-600 font-bold uppercase leading-tight mt-1">{item.variationName}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="flex-shrink-0 text-red-400 hover:text-red-600 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-2 py-1">
                          <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-orange-500"><Minus size={14} /></button>
                          <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-orange-500"><Plus size={14} /></button>
                        </div>
                        <span className="font-extrabold text-gray-900">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-white border-t-2 border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-500 font-bold">Total do Pedido</span>
                  <span className="text-2xl font-black text-gray-900">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-orange-200"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : <><ArrowRight size={24} /> Finalizar Agora</>}
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
