
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Configuração do Mercado Pago
  const MP_TOKEN = process.env.MP_ACCESS_TOKEN || 'APP_USR-5486188186277562-123109-0c5bb1142056dd529240d38a493ce08d-650681524';

  const client = new MercadoPagoConfig({ 
    accessToken: MP_TOKEN 
  });

  app.use(express.json());
  // Habilitar CORS
  app.use(cors());

  // API Routes
  app.post('/api/create_preference', async (req, res) => {
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
            success: `${process.env.APP_URL || 'http://localhost:3000'}/#/success`,
            failure: `${process.env.APP_URL || 'http://localhost:3000'}/#/failure`,
            pending: `${process.env.APP_URL || 'http://localhost:3000'}/#/pending`,
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

  app.get('/api/health', (req, res) => res.json({ status: 'online' }));

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Servidor Bizerra Shop ativo na porta ${PORT}`);
  });
}

startServer();
