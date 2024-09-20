import Link from 'next/link';
import fs from 'node:fs';
import path from 'node:path';

export const metadata = {
  title: 'Craft | Shubham Verma',
  openGraph: {
    images: [
      {
        url: `${process.env.DOMAIN}/api/og?title=Crafts | Shubham Verma.`
      }
    ]
  }
};

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
    <>
      <p className='mb-6 font-secondary text-3xl font-extrabold text-skin-secondary'>
        Crafts
      </p>
      <div>
        <ul>
          {crafts.map((craft) => (
            <li
              key={craft.slug}
              className='my-2 list-decimal text-skin-secondary'>
              <Link
                href={`/craft/${craft.slug}`}
                className='font-secondary text-xl font-bold'>
                {craft.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
