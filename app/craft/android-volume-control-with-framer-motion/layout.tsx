export const metadata = {
  title: 'Android Volume Control with Framer Motion | Craft',
  openGraph: {
    images: [
      {
        url: `${process.env.DOMAIN}/api/og?title=Android Volume Control with Framer Motion | Craft.`
      }
    ]
  }
};

export default function CraftLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
