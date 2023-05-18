import { PageLayout } from 'layouts';
import { MetaLayout } from 'layouts/MetaLayout';
import Link from 'next/link';

const crafts = [
  {
    title: "Evervault's Encrypted Card",
    slug: 'evervaults-encrypted-card'
  }
];

export default function Craft() {
  return (
    <PageLayout title='Crafts'>
      <MetaLayout
        title='Craft | Shubham Verma'
        image_url={`${process.env.DOMAIN}/api/og?title=Craft`}
      />
      <div>
        <ul>
          {crafts.map((craft) => (
            <li className='my-2 list-decimal text-skin-secondary'>
              <Link
                href={`/craft/${craft.slug}`}
                className='font-secondary text-xl font-bold'>
                {craft.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  );
}
