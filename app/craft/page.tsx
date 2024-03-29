import Link from 'next/link';

export const metadata = {
  title: 'Craft | Shubham Verma',
  openGraph: {
    images: [
      {
        url: `${process.env.DOMAIN}/api/og?title=Crafs | Shubham Verma.`
      }
    ]
  }
};

const crafts = [
  {
    title: "Evervault's Encrypted Card",
    slug: 'evervaults-encrypted-card'
  },
  {
    title: "Jhey's Book A Demo Button",
    slug: 'jhey-book-a-demo-button'
  }
];

export default function Craft() {
  return (
    <>
      <p className='mb-6 font-secondary text-3xl font-extrabold text-skin-secondary'>
        Crafts
      </p>
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
    </>
  );
}
