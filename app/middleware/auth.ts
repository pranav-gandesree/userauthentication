import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

 const SECRET_KEY = "jwtsecret" // not using .env since i ran into some trouble while setting up the env

export function verifyToken(req: Request) {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ message: 'No token provided' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}
