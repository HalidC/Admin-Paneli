import { FAQItem } from '../../types/faq';

export const mockFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Bortesoft hangi veritabanı altyapılarını destekler?',
    answer: 'Bortesoft, şablonlarında varsayılan olarak PostgreSQL (Supabase / Cloud SQL) ve Firestore (Firebase) altyapılarını tam uyumlu şekilde destekler.',
    category: 'Teknik',
    order: 1,
    status: 'active',
    lastModified: '2026-07-07T11:00:00Z',
  },
  {
    id: 'faq-2',
    question: 'Ücretsiz deneme süresi bittiğinde ne olur?',
    answer: '14 günlük ücretsiz deneme süreniz sona erdiğinde kayıtlı kartınızdan ödeme alınmaz; hesabınız dondurulur ve planınızı seçene kadar verileriniz güvenle saklanır.',
    category: 'Fiyatlandırma',
    order: 2,
    status: 'active',
    lastModified: '2026-07-06T09:30:00Z',
  },
  {
    id: 'faq-3',
    question: 'Özel bir alan adı (custom domain) bağlayabilir miyim?',
    answer: 'Evet, Bortesoft paneli üzerinden sadece birkaç tıklama ile kendi alan adınızı (örneğin: app.sirketiniz.com) SSL sertifikasıyla birlikte tanımlayabilirsiniz.',
    category: 'Genel',
    order: 3,
    status: 'active',
    lastModified: '2026-07-05T14:20:00Z',
  },
];
