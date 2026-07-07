import { WebPage } from '../../types/web';

export const mockWebPages: WebPage[] = [
  {
    id: 'page-1',
    title: 'Giriş & Karşılama Sayfası',
    slug: '/',
    status: 'published',
    lastModified: '2026-07-07T12:30:00Z',
    author: 'Kaan Aksoy',
    layout: 'landing',
  },
  {
    id: 'page-2',
    title: 'Fiyatlandırma & Paketler',
    slug: '/pricing',
    status: 'published',
    lastModified: '2026-07-06T11:20:00Z',
    author: 'Zeynep Kaya',
    layout: 'default',
  },
  {
    id: 'page-3',
    title: 'Özellikler & Çözümler',
    slug: '/features',
    status: 'published',
    lastModified: '2026-07-05T14:15:00Z',
    author: 'Kaan Aksoy',
    layout: 'default',
  },
  {
    id: 'page-4',
    title: 'Beta Programı Kayıt',
    slug: '/beta',
    status: 'draft',
    lastModified: '2026-07-04T08:00:00Z',
    author: 'Mert Yılmaz',
    layout: 'minimal',
  },
];
