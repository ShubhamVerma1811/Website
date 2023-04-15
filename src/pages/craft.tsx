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
              <Link href={`/craft/${craft.slug}`}>
                <a className='text-xl font-secondary font-bold'>
                  {craft.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  );
}
