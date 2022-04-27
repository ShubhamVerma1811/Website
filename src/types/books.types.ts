export type Book = {
  title: string;
  author: string;
  progress: 'read' | 'reading' | 'wishlist' | 'favorite';
  url: string;
  image: string;
};
