import { PageLayout } from 'layouts';
import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Notion from 'services/notion';

const Books = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageLayout>
      <p className='text-4xl font-bold text-skin-secondary'>Books</p>
      {props.categories?.map((cat) => {
        if (!cat.books.length) return null;
        return (
          <div>
            <p className='my-4 text-xl text-skin-secondary'>{cat.name}</p>
            <div className='flex flex-col gap-3 lg:flex-row'>
              {cat?.books?.map((book) => (
                <Link href={book.url} passHref>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex-[0.5]'>
                    <div className='flex w-full cursor-pointer rounded-md bg-skin-secondary-muted p-4 transition-all hover:scale-[1.02]'>
                      <Image
                        src={book.image}
                        className='rounded-md'
                        width={100}
                        height={120}
                        objectFit='cover'
                      />
                      <div className='mx-6'>
                        <p className='h-12 text-lg font-bold text-skin-secondary'>
                          {book.title}
                        </p>
                        <p className='mt-2 text-skin-primary-muted'>
                          by {book.author}{' '}
                        </p>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </PageLayout>
  );
};

export default Books;

export const getStaticProps = async () => {
  const notion = new Notion();

  const books = await notion.getBooks();

  const read = {
    name: 'Read',
    books: books.filter((book) => book.progress === 'read'),
  };
  const reading = {
    name: 'Reading',
    books: books.filter((book) => book.progress === 'reading'),
  };
  const wishlist = {
    name: 'Wishlist',
    books: books.filter((book) => book.progress === 'wishlist'),
  };
  const favorite = {
    name: 'Favorite',
    books: books.filter((book) => book.progress === 'favorite'),
  };

  const categories = [read, reading, wishlist, favorite];

  return { props: { categories } };
};
