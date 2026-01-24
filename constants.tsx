
import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'netflix',
    name: 'Netflix Premium 4K',
    description: 'Acesso total aos melhores filmes e séries em ultra definição.',
    image: 'https://picsum.photos/seed/netflix/400/300',
    category: 'Streaming',
    variations: [
      { name: 'Netflix Premium ( Tela ) Mensal', price: 25.00 }
    ]
  },
  {
    id: 'disney',
    name: 'Disney Premium',
    description: 'O mundo mágico da Disney e os melhores esportes da ESPN.',
    image: 'https://picsum.photos/seed/disney/400/300',
    category: 'Streaming',
    variations: [
      { name: 'Disney Premium ( Tela ) Mensal', price: 25.00 }
    ]
  },
  {
    id: 'hbo',
    name: 'HBO MAX',
    description: 'Assista House of the Dragon e sucessos da Warner Bros.',
    image: 'https://picsum.photos/seed/hbomax/400/300',
    category: 'Streaming',
    variations: [
      { name: 'HBO MAX ( Tela ) Mensal', price: 20.00 }
    ]
  },
  {
    id: 'youtube',
    name: 'Youtube Premium',
    description: 'Vídeos sem anúncios e acesso ao YouTube Music.',
    image: 'https://picsum.photos/seed/youtube/400/300',
    category: 'Música',
    variations: [
      { name: 'Youtube Premium 1 Mês ( Convite para 1 conta sua )', price: 20.00 },
      { name: 'Youtube Premium APK somente para o celular ( Eterno/Pra Sempre )', price: 20.00 }
    ]
  },
  {
    id: 'spotify',
    name: 'Spotify',
    description: 'Sua trilha sonora favorita, em qualquer lugar, sem interrupções.',
    image: 'https://picsum.photos/seed/spotify/400/300',
    category: 'Música',
    variations: [
      { name: 'Spotify Premium 1 Mês ( uma conta para você acessar )', price: 20.00 }
    ]
  },
  {
    id: 'prime',
    name: 'Prime Video',
    description: 'O melhor do entretenimento com um super combo de canais.',
    image: 'https://picsum.photos/seed/prime/400/300',
    category: 'Streaming',
    variations: [
      { name: 'PRIME + HBO MAX + APPLE TV + PARAMOUNT + TELECINE+CRUNCHYROLL ( Tela ) Mensal', price: 30.00 }
    ]
  },
  {
    id: 'canva',
    name: 'Canva',
    description: 'Designs profissionais de forma simples e rápida.',
    image: 'https://picsum.photos/seed/canva/400/300',
    category: 'Ferramentas',
    variations: [
      { name: 'Canva Pro Anual ( no seu email )', price: 30.00 }
    ]
  },
  {
    id: 'combate',
    name: 'Combate',
    description: 'O melhor das lutas e eventos de MMA ao vivo.',
    image: 'https://picsum.photos/seed/combate/400/300',
    category: 'Esportes',
    variations: [
      { name: 'Combate ( Tela ) Mensal', price: 15.00 }
    ]
  },
  {
    id: 'crunchyroll',
    name: 'Crunchyroll',
    description: 'O paraíso dos animes com acesso simultâneo ao Japão.',
    image: 'https://picsum.photos/seed/crunchy/400/300',
    category: 'Streaming',
    variations: [
      { name: 'Crunchyroll ( Tela ) Mensal', price: 20.00 }
    ]
  },
  {
    id: 'globoplay',
    name: 'Globo Play',
    description: 'Novelas, séries e o Big Brother Brasil 24h.',
    image: 'https://picsum.photos/seed/globo/400/300',
    category: 'Streaming',
    variations: [
      { name: 'Globo Play Sem Canais ( Conta ) Mensal', price: 20.00 },
      { name: 'Globo Play Sem Canais ( Tela ) Mensal', price: 10.00 },
      { name: 'Globo Play + BBB + Canais ( Conta ) Mensal', price: 25.00 },
      { name: 'Globo Play + BBB + Canais ( Tela ) Mensal', price: 20.00 },
      { name: 'GLOBOPLAY + BBB + CANAIS + TELECINE ( Tela ) Mensal', price: 20.00 }
    ]
  },
  {
    id: 'iptv',
    name: 'IPTV',
    description: 'Milhares de canais, filmes e séries em alta qualidade.',
    image: 'https://picsum.photos/seed/iptv/400/300',
    category: 'IPTV',
    variations: [
      { name: 'IPTV E P2P de Alta Qualidade Mensal', price: 40.00 }
    ]
  },
  {
    id: 'looke',
    name: 'Looke',
    description: 'Filmes e séries para toda a família.',
    image: 'https://picsum.photos/seed/looke/400/300',
    category: 'Streaming',
    variations: [
      { name: 'Looke ( Tela ) Mensal', price: 20.00 }
    ]
  },
  {
    id: 'paramount',
    name: 'Paramount+',
    description: 'Grandes sucessos do cinema e séries exclusivas.',
    image: 'https://picsum.photos/seed/paramount/400/300',
    category: 'Streaming',
    variations: [
      { name: 'Paramount + ( Conta ) Mensal', price: 20.00 },
      { name: 'Paramount + ( Tela ) Mensal', price: 15.00 }
    ]
  },
  {
    id: 'unitv',
    name: 'Uni TV',
    description: 'A melhor experiência em canais e conteúdo sob demanda.',
    image: 'https://picsum.photos/seed/unitv/400/300',
    category: 'IPTV',
    variations: [
      { name: 'Uni TV Código Mensal', price: 30.00 }
    ]
  },
  {
    id: 'recarga-claro',
    name: 'Recarga Claro',
    description: 'Mais barato do mercado! EX: Paga R$ 100 de crédito.',
    image: 'https://picsum.photos/seed/claro/400/300',
    category: 'Recarga',
    variations: [
      { name: 'R$100.00 de crédito', price: 70.00 },
      { name: 'R$50.00 de crédito', price: 40.00 },
      { name: 'R$30.00 de crédito', price: 27.00 }
    ]
  },
  {
    id: 'recarga-tim',
    name: 'Recarga TIM',
    description: 'Mais barato do mercado! EX: Paga R$ 100 de crédito.',
    image: 'https://picsum.photos/seed/tim/400/300',
    category: 'Recarga',
    variations: [
      { name: 'R$100.00 de crédito', price: 70.00 },
      { name: 'R$50.00 de crédito', price: 40.00 },
      { name: 'R$40.00 de crédito', price: 35.00 },
      { name: 'R$30.00 de crédito', price: 27.00 }
    ]
  }
];

export const SOCIAL_LINKS = {
  x: 'https://x.com/WesleyBizerraYT',
  youtube: 'https://www.youtube.com/@WesleyBizerra2026',
  instagram: 'https://www.instagram.com/wesleybizerraofc/',
  facebook: 'https://www.facebook.com/WesleyBizerra2022/',
  whatsapp: 'https://api.whatsapp.com/send/?phone=5571981574664&text=Olá! Vim pelo site Bizerra Shop e gostaria de mais informações.',
  whatsapp_icon: 'https://i.imgur.com/KwTiZyP.png'
};
