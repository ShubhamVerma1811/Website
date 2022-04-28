import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='en'>
        <title>Shubham Verma | Frontend Developer</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, viewport-fit=cover'
        />
        <meta name='monetization' content='$ilp.uphold.com/RpM3whjzmfzH' />
        <script
          async
          defer
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_UUID}
          src={process.env.NEXT_PUBLIC_UMAMI_URI}></script>
        <Head />
        <body className='dark bg-skin-primary'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
