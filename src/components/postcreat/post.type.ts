export interface Post {
  content: string;
  privacy: 'private' | 'public';
  type: 'image' | 'text';
  emotion: string;
  location: string;
  timestamp: string;
  userId: string;
  img: {
    url?: string| undefined;
    alt?: string| undefined;
  }
  author: {
    name: string,
    avatar: string
  }

}