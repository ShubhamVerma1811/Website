'use client';

import { useEffect } from 'react';

const BlogViewIncrement = ({ id }: { id: string }) => {
  useEffect(() => {
    async function views() {
      await fetch('/api/views', {
        method: 'POST',
        body: JSON.stringify({
          page_id: id
        })
      });
    }

    process.env.NODE_ENV === 'production' && views();
  }, []);

  return null;
};

export default BlogViewIncrement;
