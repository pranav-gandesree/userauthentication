import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const users = [
  { username: 'testuser', password: 'password123' }, 
];

const SECRET_KEY = "jwtsecret" ; 

export async function POST(request: Request) {
  const { username, password } = await request.json();
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    return NextResponse.json({ token, username});
  } else {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
}
