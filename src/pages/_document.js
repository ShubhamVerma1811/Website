import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <title>Frontend Developer | Shubham Verma</title>
        <link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
        <link rel="manifest" href="manifest.json"></link>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta
          name="description"
          content="Shubham Verma - Frontend Developer Portfolio"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="msapplication-config" content="browserconfig.xml" />
        <script
          async
          defer
          data-website-id="49bdc54c-3163-4375-9cf9-c4ee6487e195"
          src="https://umami-azure.vercel.app/umami.js"></script>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
