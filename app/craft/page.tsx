import { PageLayout } from 'layouts';
import Link from 'next/link';
import fs from 'node:fs';
import path from 'node:path';
import { generateMetaData } from 'services/util';

export const metadata = generateMetaData({
  title: 'Crafts | Shubham Verma',
  description: 'Crafts/Experienents I have made.'
});

function getCrafts() {
  const craftDir = path.join(process.cwd(), 'app/craft');
  const craftFolders = fs
    .readdirSync(craftDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const craftsWithTime = craftFolders.map((slug) => {
    const folderPath = path.join(craftDir, slug);
    const stats = fs.statSync(folderPath);
    return {
      title: slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      slug,
      birthtime: stats.birthtime
    };
  });

  craftsWithTime.sort((a, b) => a.birthtime.getTime() - b.birthtime.getTime());

  return craftsWithTime.map(({ title, slug }) => ({ title, slug }));
}

export default function Craft() {
  const crafts = getCrafts();

  return (
    <PageLayout>
      <ul className='ml-4'>
        {crafts.map((craft) => (
          <li
            key={craft.slug}
            className='my-4 list-decimal text-skin-secondary'>
            <Link
              href={`/craft/${craft.slug}`}
              className='font-secondary text-xl font-bold'>
              {craft.title}
            </Link>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}
