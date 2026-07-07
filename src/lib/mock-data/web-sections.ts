import { LandingSection } from '../../types/landing-section';

export const mockLandingSections: LandingSection[] = [
  {
    id: 'sec-1',
    name: 'Kahraman (Hero) Bölümü',
    type: 'hero',
    title: 'Geleceğin SaaS Mimarisi Burada Başlar',
    subtitle: 'Bortesoft ile uygulamanızı Linear ve Apple kalitesinde tasarlayın, dakikalar içinde canlıya alın.',
    isActive: true,
    order: 1,
    content: {
      ctaText: 'Ücretsiz Deneyin',
      secondaryCtaText: 'Detaylı Bilgi Alın',
      showBadges: true,
      badgeText: 'Bortesoft v2.4 Yayınlandı!',
    },
    lastUpdated: '2026-07-07T12:30:00Z',
  },
  {
    id: 'sec-2',
    name: 'Asimetrik Bento Özellik Izgarası',
    type: 'bento',
    title: 'Her detayıyla ince elenmiş özellikler',
    subtitle: 'Bento Grid düzenimiz sayesinde en kritik bilgileri çarpıcı şekilde öne çıkarın.',
    isActive: true,
    order: 2,
    content: {
      items: [
        { id: 'item-1', title: 'Ultra-Hızlı Sunucu', desc: 'Global CDN entegrasyonu ile 40ms altında yüklenme süreleri.', size: 'large' },
        { id: 'item-2', title: 'Güvenli Altyapı', desc: 'End-to-end şifreleme ve gelişmiş rol yetkilendirmesi.', size: 'small' },
        { id: 'item-3', title: 'Derin Analizler', desc: 'Müşteri davranışlarını ve MRR büyümelerini gerçek zamanlı takip edin.', size: 'medium' },
      ],
    },
    lastUpdated: '2026-07-06T15:40:00Z',
  },
  {
    id: 'sec-3',
    name: 'Harekete Geçirici (CTA)',
    type: 'cta',
    title: 'Bortesoft ile ekibinizi bir üst lige taşıyın',
    subtitle: 'Şimdi kayıt olun ve ilk 14 gün ücretsiz Premium deneyimin tadını çıkarın.',
    isActive: true,
    order: 3,
    content: {
      buttonText: 'Hemen Başlayın',
      supportText: 'Kredi kartı gerekmez. İptal etmek kolaydır.',
    },
    lastUpdated: '2026-07-05T09:12:00Z',
  },
];
