
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
      // ⚠️ ESTA URL ABAIXO DEVE SER A QUE APARECE NO SEU PAINEL DO RAILWAY (DOMAINS)
      const BACKEND_URL = 'https://bizerrashop-production.up.railway.app'; 
      
      const response = await fetch(`${BACKEND_URL}/create_preference`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cart }),
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
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-2xl rounded-l-3xl overflow-hidden">
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
                  <div key={item.id} className="flex gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h4 className="font-bold">{item.name}</h4>
                        <button onClick={() => removeFromCart(item.id)}><Trash2 size={16} className="text-red-400" /></button>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2">
                          <button onClick={() => updateQuantity(item.id, -1)}><Minus size={14} /></button>
                          <span className="font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)}><Plus size={14} /></button>
                        </div>
                        <span className="font-bold">R$ {(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-gray-50 border-t">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-500">Total</span>
                  <span className="text-2xl font-bold">R$ {totalPrice.toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : <><ArrowRight /> Finalizar Compra</>}
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
