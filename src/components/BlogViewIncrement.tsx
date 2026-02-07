'use client';

import { useEffect, useRef } from 'react';

const BlogViewIncrement = ({ id }: { id: string }) => {
  const controller = useRef(new AbortController());

  useEffect(() => {
    controller.current.abort();
    controller.current = new AbortController();

    async function views() {
      await fetch('/api/views', {
        method: 'POST',
        signal: controller.current.signal,
        body: JSON.stringify({
          page_id: id
        })
      });
    }

    process.env.NODE_ENV === 'production' && views();
  }, [id]);

  return null;
};

export default BlogViewIncrement;
