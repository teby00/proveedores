import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const productos = await prisma.post.findMany({
      select: {
        id: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(productos);
  } catch (e) {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 417 });
  }
}
