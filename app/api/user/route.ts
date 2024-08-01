import { NextResponse } from 'next/server';
import { verifyToken } from '@/app/middleware/auth';

export async function GET(req: Request) {
  const user = verifyToken(req);
  if (user instanceof NextResponse) {
    return user; 
  }

  return NextResponse.json(user); 
}
