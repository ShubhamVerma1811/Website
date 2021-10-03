import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react'


class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
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
        <meta name="monetization" content="$ilp.uphold.com/RpM3whjzmfzH" />
        <script
          async
          defer
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_UUID}
          src={process.env.NEXT_PUBLIC_UMAMI_URI}></script>
        <Head />
        <body className="bg-gray-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
