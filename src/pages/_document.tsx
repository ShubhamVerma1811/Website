import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

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
        <meta
          name='description'
          content='Frontend Developer, Likes to build open source tools and write articles. '
        />
        {process.env.NEXT_PUBLIC_UMAMI_UUID &&
          process.env.NEXT_PUBLIC_UMAMI_URI && (
            <script
              async
              defer
              data-website-id={process.env.NEXT_PUBLIC_UMAMI_UUID}
              src={process.env.NEXT_PUBLIC_UMAMI_URI}></script>
          )}
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
