import db from '@/lib/db';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

interface RequestBody {
  username: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const body: RequestBody = await req.json();
  try {
   const {password,username} = body
   console.log(body)
   const user = await db.user.findFirst({where: {email: username}})
   if(user && (await bcrypt.compare(password, user.password))){
    const {password, ...userWithoutPassword} = user
    return NextResponse.json(userWithoutPassword, {status: 200})
   } else {
    return NextResponse.json('User not found')
   }
  } catch (error) {

   if(error instanceof Error) {
    return NextResponse.json(error.message);
   }
   return NextResponse.json('SignIn Failed')
  }
}
