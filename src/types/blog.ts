export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage?: string;
  author: {
    name: string;
    avatar?: string;
  };
  tags: string[];
  readTime: string;
  publishedAt?: string;
  status: 'draft' | 'published' | 'scheduled' | 'archived' | 'inactive';
  viewCount: number;
}
