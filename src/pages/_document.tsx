import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document';

function setInitialColorMode() {
  function getInitialColorMode() {
    const preference = window.localStorage.getItem('theme');
    const hasExplicitPreference = typeof preference === 'string';

    if (hasExplicitPreference) {
      return preference;
    }

    // If there is no saved preference, use a media query
    const mediaQuery = '(prefers-color-scheme: light)';
    const mql = window.matchMedia(mediaQuery);
    const hasImplicitPreference = typeof mql.matches === 'boolean';

    if (hasImplicitPreference) {
      return mql.matches ? 'light' : 'dark';
    }
    return 'dark';
  }

  const colorMode = getInitialColorMode();
  const body = document.querySelector('body');
  body?.classList.toggle('dark', colorMode === 'dark');
}

const blockingSetInitialColorMode = `(function() {
    ${setInitialColorMode.toString()}
    setInitialColorMode();
})()
`;

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
        <body className='bg-skin-primary'>
          <script
            dangerouslySetInnerHTML={{
              __html: blockingSetInitialColorMode
            }}></script>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
