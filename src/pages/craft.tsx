import { PageLayout } from 'layouts';
import { MetaLayout } from 'layouts/MetaLayout';

export default function Craft() {
  return (
    <PageLayout>
      <MetaLayout
        title='Craft | Shubham Verma'
        image_url={`${process.env.DOMAIN}/api/og?title=Craft`}
      />
      <div className='h-96 flex items-center justify-center'>
        <h1 className='text-6xl font-bold text-skin-secondary md:text-8xl'>
          ✨
        </h1>
      </div>
    </PageLayout>
  );
}
