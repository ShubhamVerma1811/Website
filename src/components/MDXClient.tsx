'use client';

import CodeBlock from 'atoms/code';
import { MDXClient as MDXRemote } from 'next-mdx-remote-client';
import Image from 'next/image';

// TODO:: FIX THIS
export const MDXClient = (props: { mdxSource: any }) => {
  const { mdxSource } = props;

  if (!mdxSource) return null;

  return (
    <MDXRemote
      {...mdxSource}
      components={{
        blockquote: (props) => (
          <blockquote className='prose text-skin-secondary'>
            {props.children}
          </blockquote>
        ),
        pre: (props: any) => {
          return (
            <pre className='relative m-0 rounded-t-none p-0'>
              {props.children}
            </pre>
          );
        },
        code(props) {
          return <CodeBlock {...props} />;
        },
        img: (props) => {
          if (!props.src) return null;
          // TODO:: fix types
          // @ts-ignore
          if (!props.width || !props.height || !props.hash) {
            // Fallback until I migrate all images to new syntax in the markdown.
            return (
              <figure>
                <img
                  src={props.src}
                  alt={props.alt}
                  className='my-0 rounded-md'
                />
                <figcaption>{props.alt}</figcaption>
              </figure>
            );
          }
          return (
            <figure>
              <Image
                className='rounded-sm'
                src={props.src}
                alt={props.alt || ''}
                title={props.alt || ''}
                width={props.width as number}
                height={props.height as number}
                placeholder='blur'
                // @ts-ignore
                // TODO:: fix types
                blurDataURL={props.hash}
              />
              <figcaption>{props.alt}</figcaption>
            </figure>
          );
        },
        div: (props) => {
          if (props.className === 'rehype-code-title') {
            // @ts-ignore
            const lang = props.children?.split('.').pop();
            if (!lang) return null;
            return (
              <div className='mt-2 flex items-center rounded-t-lg bg-[#1f2937] px-1 py-2'>
                <Image
                  className='mx-2 my-0 inline'
                  src={`/assets/logos/${lang}.svg`}
                  alt={lang}
                  width={16}
                  height={16}
                />
                <div className='overflow-auto text-skin-primary-muted'>
                  {props.children}
                </div>
              </div>
            );
          }

          return <div {...props} />;
        }
      }}
    />
  );
};
