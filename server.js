
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do Mercado Pago
const MP_TOKEN = process.env.MP_ACCESS_TOKEN || 'APP_USR-5486188186277562-123109-0c5bb1142056dd529240d38a493ce08d-650681524';

const client = new MercadoPagoConfig({ 
  accessToken: MP_TOKEN 
});

app.use(express.json());
// Habilitar CORS para o domínio do Netlify especificamente
app.use(cors({
  origin: ['https://sitedevendaswesley.netlify.app', 'http://localhost:5173'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

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
          success: `https://sitedevendaswesley.netlify.app/#/success`,
          failure: `https://sitedevendaswesley.netlify.app/#/failure`,
          pending: `https://sitedevendaswesley.netlify.app/#/pending`,
        },
        auto_return: 'approved',
      }
    });

    res.json({ 
      id: result.id,
      init_point: result.init_point 
    });
  } catch (error) {
    console.error('Erro Mercado Pago:', error);
    res.status(500).json({ error: 'Erro ao gerar link de pagamento' });
  }
});

app.get('/health', (req, res) => res.json({ status: 'online' }));
app.get('/', (req, res) => res.send('API Bizerra Shop rodando no Railway!'));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor Bizerra Shop ativo na porta ${PORT}`);
});
