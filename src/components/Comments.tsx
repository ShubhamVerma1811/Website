'use client';

import React, { useEffect, useRef } from 'react';

export const Comments = () => {
  const commentBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scriptEl = document.createElement('script');
    scriptEl.setAttribute('theme', 'github-dark');
    scriptEl.setAttribute('src', 'https://utteranc.es/client.js');
    scriptEl.setAttribute('crossorigin', 'anonymous');
    scriptEl.setAttribute('async', 'true');
    scriptEl.setAttribute('repo', 'ShubhamVerma1811/blogs-comments');
    scriptEl.setAttribute('issue-term', 'pathname');
    // @ts-ignore
    commentBox.current.appendChild(scriptEl);
  }, []);

  return (
    <React.Fragment>
      <hr className='my-4 border-skin-primary-muted' />
      <div className='w-full' id='comments'>
        <div ref={commentBox} />
      </div>
    </React.Fragment>
  );
};
