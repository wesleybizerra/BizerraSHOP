
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MercadoPagoConfig, Preference } = require('mercadopago');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do Mercado Pago
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN || 'APP_USR-5486188186277562-123109-0c5bb1142056dd529240d38a493ce08d-650681524' 
});

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*' // Em produção, substitua pela URL do seu Netlify para maior segurança
}));

// Rota para criar preferência de pagamento
app.post('/create_preference', async (req, res) => {
  try {
    const { items } = req.body;

    // Formata os itens para o padrão do Mercado Pago
    const itemsFormatted = items.map(item => ({
      id: item.id,
      title: item.name,
      unit_price: Number(item.price),
      quantity: Number(item.quantity),
      currency_id: 'BRL'
    }));

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: itemsFormatted,
        back_urls: {
          success: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/#/success`,
          failure: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/#/failure`,
          pending: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/#/pending`,
        },
        auto_return: 'approved',
      }
    });

    res.json({ 
      id: result.id,
      init_point: result.init_point 
    });
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    res.status(500).json({ error: 'Erro interno ao processar o pagamento' });
  }
});

// Rota de saúde para o Railway
app.get('/health', (req, res) => res.send('Bizerra Shop API is Running!'));

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
