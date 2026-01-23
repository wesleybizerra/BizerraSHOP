
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MercadoPagoConfig, Preference } = require('mercadopago');

const app = express();
const PORT = process.env.PORT || 3000;

// Token padrão de teste se a env não estiver configurada (substitua no painel do Railway)
const MP_TOKEN = process.env.MP_ACCESS_TOKEN || 'APP_USR-5486188186277562-123109-0c5bb1142056dd529240d38a493ce08d-650681524';

const client = new MercadoPagoConfig({ 
  accessToken: MP_TOKEN 
});

app.use(express.json());
app.use(cors({ origin: '*' }));

app.post('/create_preference', async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Carrinho vazio' });
    }

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
    console.error('Erro MP:', error);
    res.status(500).json({ error: 'Erro ao processar pagamento' });
  }
});

app.get('/', (req, res) => res.send('API Bizerra Shop Ativa!'));
app.get('/health', (req, res) => res.send('OK'));

app.listen(PORT, () => {
  console.log(`🚀 Server on port ${PORT}`);
});
