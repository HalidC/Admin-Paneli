import { MediaAsset } from '../../types/media';

export const mockMediaAssets: MediaAsset[] = [
  {
    id: 'med-1',
    name: 'bortesoft-dark-logo.svg',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    mimeType: 'image/svg+xml',
    sizeBytes: 12450,
    width: 240,
    height: 80,
    altText: 'Bortesoft Koyu Tema Logosu',
    createdAt: '2026-07-07T08:00:00Z',
  },
  {
    id: 'med-2',
    name: 'hero-mesh-background.jpg',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    mimeType: 'image/jpeg',
    sizeBytes: 345600,
    width: 1920,
    height: 1080,
    altText: 'Kahraman Bölümü Mesh Arka Plan',
    createdAt: '2026-07-06T14:30:00Z',
  },
  {
    id: 'med-3',
    name: 'linear-dashboard-mockup.png',
    url: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&auto=format&fit=crop&q=80',
    mimeType: 'image/png',
    sizeBytes: 890400,
    width: 1440,
    height: 900,
    altText: 'Linear Arayüz Gösterim Şablonu',
    createdAt: '2026-07-05T10:15:00Z',
  },
];
