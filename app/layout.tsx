import { PageLayout } from 'layouts/PageLayout';
import '../src/styles/global.css';
import '../src/styles/tailwind.css';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
          data-do-not-track='true'></script>
      </head>
      <body className='dark bg-skin-primary'>
        <PageLayout>{children}</PageLayout>
      </body>
    </>
  );
}
