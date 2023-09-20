import db from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';

interface RequestBody {
  image: string;
  email: string;
  tag: string;
}

export async function GET(request: NextRequest) {
  try {
    const upload = await db.upload.findMany({
      orderBy: { createdAt: 'desc' },
    });
    if (!upload)
      return NextResponse.json({ error: 'not found' }, { status: 404 });
    else return NextResponse.json({ uploads: upload || [] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'upload not fetched' }, { status: 400 });
  } finally {
    await db.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  const body: RequestBody = await request.json();
  try {
    const upload = await db.upload.create({
      data: {
        email: body.email,
        image: body.image,
        tag: body.tag,
      },
    });
    if (!upload) {
      return NextResponse.json({ error: 'Upload failed' });
    } else return NextResponse.json(upload || null);
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' });
  } finally {
    await db.$disconnect();
  }
}
