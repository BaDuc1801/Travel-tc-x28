export interface Post {
    content: string;
    img?: { url: string; alt: string };
    privacy: 'private' | 'public';
    type: 'text' | 'image';
    author: { name: string; avatar: string };
    emotion?: string;
    timestamp: string;
    location?: string;
  }
  