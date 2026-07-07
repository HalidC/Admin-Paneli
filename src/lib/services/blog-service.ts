import { mockBlogPosts } from '../mock-data/blog-posts';
import { BlogPost } from '../../types/blog';

let stateBlogPosts = [...mockBlogPosts];

export const blogService = {
  async getAll(): Promise<BlogPost[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...stateBlogPosts]), 200);
    });
  },

  async create(post: Omit<BlogPost, 'id' | 'viewCount'>): Promise<BlogPost> {
    return new Promise((resolve) => {
      const newPost: BlogPost = {
        ...post,
        id: `post-${Date.now()}`,
        viewCount: 0,
      };
      stateBlogPosts.push(newPost);
      setTimeout(() => resolve(newPost), 250);
    });
  },

  async update(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    return new Promise((resolve, reject) => {
      const index = stateBlogPosts.findIndex((p) => p.id === id);
      if (index === -1) return reject(new Error('Yazı bulunamadı'));

      const updated = {
        ...stateBlogPosts[index],
        ...updates,
      };
      stateBlogPosts[index] = updated;
      setTimeout(() => resolve(updated), 200);
    });
  },

  async delete(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      stateBlogPosts = stateBlogPosts.filter((p) => p.id !== id);
      setTimeout(() => resolve(true), 150);
    });
  },
};
