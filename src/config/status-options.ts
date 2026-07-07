export const STATUS_OPTIONS = {
  webPage: [
    { value: 'published', label: 'Yayınlandı', color: 'success' },
    { value: 'draft', label: 'Taslak', color: 'warning' },
    { value: 'archived', label: 'Arşivlendi', color: 'neutral' },
  ],
  blogPost: [
    { value: 'published', label: 'Yayında', color: 'success' },
    { value: 'draft', label: 'Taslak', color: 'warning' },
    { value: 'scheduled', label: 'Planlandı', color: 'info' },
  ],
  faqItem: [
    { value: 'active', label: 'Yayında', color: 'success' },
    { value: 'draft', label: 'Taslak', color: 'warning' },
  ],
  formSubmission: [
    { value: 'new', label: 'Yeni', color: 'danger' },
    { value: 'reviewed', label: 'İncelendi', color: 'success' },
    { value: 'spam', label: 'Spam', color: 'neutral' },
  ],
  demoRecord: [
    { value: 'pending', label: 'Bekliyor', color: 'danger' },
    { value: 'scheduled', label: 'Planlandı', color: 'info' },
    { value: 'completed', label: 'Tamamlandı', color: 'success' },
    { value: 'canceled', label: 'İptal Edildi', color: 'neutral' },
  ],
} as const;
