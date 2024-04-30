import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(_, { params }) {
  try {
    const id = params.id;
    const post = await prisma.post.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        tittle: true,
        price: true,
        images: true,
      },
    });
    return NextResponse.json(post);
  } catch (e) {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 417 });
  }
}
