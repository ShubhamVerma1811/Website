export type Book = {
  title: string;
  author: string;
  progress: 'read' | 'reading' | 'wishlist' | 'favorite';
  link: string;
  cover: string;
};
