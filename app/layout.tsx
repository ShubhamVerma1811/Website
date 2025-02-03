import { BackToTop, Banner, Footer, Header } from 'components';
import '../src/styles/global.css';
import '../src/styles/tailwind.css';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, viewport-fit=cover'
        />
        <script
          async
          defer
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_UUID}
          src={process.env.NEXT_PUBLIC_UMAMI_URI}
          data-do-not-track='true'
        />
      </head>
      <body className='dark bg-skin-primary'>
        <Banner />
        <div className='mx-5 flex h-[100dvh] max-w-4xl flex-col sm:mx-12 md:mx-32 lg:mx-auto '>
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
        <BackToTop />
      </body>
    </html>
  );
}
