import Head from 'next/head';

interface MetaLayoutProps {
  title?: string;
  description?: string;
  image_url?: string;
}

export const MetaLayout = (props: MetaLayoutProps) => {
  const {
    title = 'Shubham Verma | Frontend Developer',
    description = 'Frontend Developer, Likes to build open source tools and write articles.',
    image_url = `${process.env.DOMAIN}/api/og?title=Shubham Verma&desc=Builder, Writer, Learner.`
  } = props;

  const website = process.env.DOMAIN!;

  return (
    <Head>
      <title>{title}</title>
      <meta name='title' content={title} />
      <meta property='twitter:title' content={title} />
      <meta property='og:title' content={title} />

      <meta name='description' content={description} />
      <meta property='twitter:description' content={description} />
      <meta property='og:description' content={description} />

      <meta property='twitter:url' content={website} />
      <meta property='og:url' content={website} />

      <meta property='twitter:image' content={image_url} />
      <meta property='og:image' content={image_url} />

      <meta property='twitter:card' content='summary_large_image' />
      <meta property='og:type' content='website' />

      <link rel='shortcut icon' href='/favicon.ico' />
    </Head>
  );
};
