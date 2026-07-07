import { FormConfig, FormSubmission } from '../../types/form';

export const mockFormConfigs: FormConfig[] = [
  {
    id: 'form-1',
    name: 'İletişim Formu',
    slug: 'contact-us',
    fields: [
      { id: 'f-1', label: 'Ad Soyad', type: 'text', required: true, placeholder: 'örn. Ahmet Yılmaz' },
      { id: 'f-2', label: 'E-posta Adresi', type: 'email', required: true, placeholder: 'örn. ahmet@sirket.com' },
      { id: 'f-3', label: 'Mesajınız', type: 'textarea', required: true, placeholder: 'Mesajınızı buraya yazın...' },
    ],
    isActive: true,
    notifyEmail: 'contact@bortesoft.com',
    submissionsCount: 42,
  },
  {
    id: 'form-2',
    name: 'Bülten Aboneliği',
    slug: 'newsletter',
    fields: [
      { id: 'f-4', label: 'E-posta Adresi', type: 'email', required: true, placeholder: 'E-posta adresiniz...' },
    ],
    isActive: true,
    notifyEmail: 'newsletter@bortesoft.com',
    submissionsCount: 154,
  },
];

export const mockFormSubmissions: FormSubmission[] = [
  {
    id: 'sub-1',
    formId: 'form-1',
    data: {
      'Ad Soyad': 'Kemal Demirok',
      'E-posta Adresi': 'kemal@demirok.co',
      'Mesajınız': 'Merhabalar, Bortesoft v2 arayüz entegrasyonu hakkında kurumsal bir toplantı talep ediyoruz.',
    },
    submittedAt: '2026-07-07T10:14:00Z',
    status: 'new',
  },
  {
    id: 'sub-2',
    formId: 'form-2',
    data: {
      'E-posta Adresi': 'selin.tan@gmail.com',
    },
    submittedAt: '2026-07-07T08:55:00Z',
    status: 'reviewed',
  },
  {
    id: 'sub-3',
    formId: 'form-1',
    data: {
      'Ad Soyad': 'John Crypto',
      'E-posta Adresi': 'john@scamlink.xyz',
      'Mesajınız': 'Make $5000 a day with this amazing automatic software, try now!',
    },
    submittedAt: '2026-07-06T15:20:00Z',
    status: 'spam',
  },
];
