import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import { generateBlogFuseData } from 'services/fuse';

export async function POST(request: NextRequest) {
  try {
    const headerStore = await headers();
    const token = headerStore.get(process.env.SANITY_WEBHOOK_SECRET_HEADER!);

    if (token !== process.env.SANITY_WEBHOOK_SECRET_TOKEN) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = await request.json();

    await Promise.all([
      revalidatePath('/'),
      revalidatePath('/blog'),
      revalidatePath(`/blog/${slug}`)
    ]);

    await generateBlogFuseData();

    return NextResponse.json({ message: `Updated ${slug}` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
