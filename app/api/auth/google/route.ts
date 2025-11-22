import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.NODE_ENV === 'production' 
  ? 'https://guildfivault-dashboard-awfh.vercel.app/api/auth/google/callback'
  : 'http://localhost:3000/api/auth/google/callback';

export async function GET(request: NextRequest) {
  // roleパラメータを取得
  const searchParams = request.nextUrl.searchParams;
  const role = searchParams.get('role') || 'operator';
  
  // Google OAuth URL にリダイレクト
  const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  
  googleAuthUrl.searchParams.append('client_id', GOOGLE_CLIENT_ID!);
  googleAuthUrl.searchParams.append('redirect_uri', REDIRECT_URI);
  googleAuthUrl.searchParams.append('response_type', 'code');
  googleAuthUrl.searchParams.append('scope', 'email profile');
  googleAuthUrl.searchParams.append('access_type', 'offline');
  googleAuthUrl.searchParams.append('prompt', 'consent');
  googleAuthUrl.searchParams.append('state', role); // roleをstateパラメータで渡す

  return NextResponse.redirect(googleAuthUrl.toString());
}