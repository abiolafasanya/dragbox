import db from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';

interface RequestBody {
  image: string;
  email: string;
  tag: string;
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
      return NextResponse.json({error: 'Upload failed'});
    }
    else return NextResponse.json(upload || null);
  } catch (error) {
      return NextResponse.json({error: 'Upload failed'});
  } finally {
    await db.$disconnect();
  }
}
