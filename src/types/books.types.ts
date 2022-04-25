export type Book = {
  title: string;
  author: string;
  tags: Array<'read' | 'reading' | 'wishlist' | 'favorite'>;
};
