
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const app = express();
const PORT = process.env.PORT || 3000;

const MP_TOKEN = process.env.MP_ACCESS_TOKEN;

if (!MP_TOKEN) {
  console.error("❌ ERRO: MP_ACCESS_TOKEN não configurado nas variáveis de ambiente!");
}

const client = new MercadoPagoConfig({ 
  accessToken: MP_TOKEN || 'APP_USR-5486188186277562-123109-0c5bb1142056dd529240d38a493ce08d-650681524' 
});

// Middleware
app.use(express.json());
app.use(cors()); // Aceita requisições de qualquer origem para evitar erro de conexão

// Rota de Log para testar se o servidor está vivo
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.post('/create_preference', async (req, res) => {
  try {
    const { items } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'O carrinho está vazio.' });
    }

    console.log("Recebido pedido para checkout:", items.length, "itens");

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
          success: `${process.env.FRONTEND_URL || 'https://sitedevendaswesley.netlify.app'}/#/success`,
          failure: `${process.env.FRONTEND_URL || 'https://sitedevendaswesley.netlify.app'}/#/failure`,
          pending: `${process.env.FRONTEND_URL || 'https://sitedevendaswesley.netlify.app'}/#/pending`,
        },
        auto_return: 'approved',
      }
    });

    console.log("Preferência criada com sucesso:", result.id);
    res.json({ 
      id: result.id,
      init_point: result.init_point 
    });
  } catch (error) {
    console.error('Erro ao criar preferência MP:', error);
    res.status(500).json({ error: 'Erro interno ao processar o pagamento com Mercado Pago.' });
  }
});

app.get('/health', (req, res) => res.json({ status: 'OK', message: 'API Bizerra Shop Ativa' }));
app.get('/', (req, res) => res.send('Backend Bizerra Shop rodando com sucesso!'));

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
