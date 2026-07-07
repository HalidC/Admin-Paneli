export interface MenuLink {
  id: string;
  label: string;
  url: string;
  order: number;
  isOpenNewTab: boolean;
  status: 'active' | 'draft';
}

export const mockNavigationLinks: MenuLink[] = [
  {
    id: 'link-1',
    label: 'Özellikler',
    url: '/features',
    order: 1,
    isOpenNewTab: false,
    status: 'active',
  },
  {
    id: 'link-2',
    label: 'Fiyatlandırma',
    url: '/pricing',
    order: 2,
    isOpenNewTab: false,
    status: 'active',
  },
  {
    id: 'link-3',
    label: 'Blog',
    url: '/blog',
    order: 3,
    isOpenNewTab: false,
    status: 'active',
  },
  {
    id: 'link-4',
    label: 'Belgeler',
    url: 'https://docs.bortesoft.com',
    order: 4,
    isOpenNewTab: true,
    status: 'active',
  },
  {
    id: 'link-5',
    label: 'Topluluk',
    url: '/community',
    order: 5,
    isOpenNewTab: false,
    status: 'draft',
  },
];
