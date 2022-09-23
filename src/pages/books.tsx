import { Suggest } from 'components/Books';
import { PageLayout } from 'layouts';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Image from 'next/future/image';
import Head from 'next/head';
import Link from 'next/link';
import { urlForImage } from 'services';
import { getClient } from 'services/sanity-server';
import type { Book } from 'types';

const Books = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageLayout title='Books'>
      <Head>
        <title>Books | Shubham Verma</title>
        <meta
          name='description'
          content='Collection of books that I am currently reading or is in my wishlist'
        />
      </Head>
      <Suggest />
      {props.categories?.map((cat, idx) => {
        if (!cat.books.length) return null;
        return (
          <div key={idx}>
            <p className='my-4 text-xl text-skin-secondary'>{cat.name}</p>
            <div className='grid grid-cols-1 gap-3 lg:grid-cols-2'>
              {cat?.books?.map((book, idx) => (
                <Link key={idx} href={book.link} passHref>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex-[0.5]'>
                    <div className='flex cursor-pointer rounded-md bg-skin-secondary-muted p-4 transition-all hover:scale-[1.02]'>
                      {book.cover && (
                        <Image
                          src={urlForImage(book.cover).url()}
                          alt={book.title}
                          className='mr-6 rounded-md'
                          width={100}
                          height={120}
                        />
                      )}
                      <div>
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

export const getStaticProps = async ({
  preview = false
}: GetStaticPropsContext) => {
  const books: Array<Book> = await getClient(preview).fetch(
    `*[_type == "book"] {..., "progress": progress.value}`
  );

  const read = {
    name: 'Read',
    books: books.filter((book) => book.progress === 'read')
  };
  const reading = {
    name: 'Reading',
    books: books.filter((book) => book.progress === 'reading')
  };
  const wishlist = {
    name: 'Wishlist',
    books: books.filter((book) => book.progress === 'wishlist')
  };
  const favorite = {
    name: 'Favorite',
    books: books.filter((book) => book.progress === 'favorite')
  };

  const categories = [read, reading, wishlist, favorite];

  return { props: { categories }, revalidate: 100 };
};
