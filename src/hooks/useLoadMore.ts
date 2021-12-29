import { useState } from 'react';

export const useLoadMore = <T extends Array<any>>(
  arr: T,
  limit = 3,
): {
  items: T;
  index: number;
  hasMore: boolean;
  loadMore(a: number): void;
} => {
  const [items, setItems] = useState(arr.slice(0, limit));
  const [hasMore, setHasMore] = useState(!!arr.length && arr.length > limit);
  const [index, setIndex] = useState(limit);

  const loadMore = (offset = limit) => {
    const newIndex = index + offset;
    const newShowLoadMore = newIndex <= arr.length - 1;
    const newItems = items.concat(arr?.slice(index, newIndex));
    setIndex(newIndex);
    setHasMore(newShowLoadMore);
    setItems(newItems);
  };

  return {
    // @ts-ignore
    items,
    hasMore,
    index,
    loadMore,
  };
};
