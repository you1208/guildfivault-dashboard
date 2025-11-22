import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.NODE_ENV === 'production' 
  ? 'https://guildfivault-dashboard-awfh.vercel.app/api/auth/google/callback'
  : 'http://localhost:3000/api/auth/google/callback';

export async function GET(request: NextRequest) {
  // デバッグ情報
  console.log('=== Google OAuth Debug ===');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('GOOGLE_CLIENT_ID exists:', !!GOOGLE_CLIENT_ID);
  console.log('GOOGLE_CLIENT_ID length:', GOOGLE_CLIENT_ID?.length);
  console.log('GOOGLE_CLIENT_SECRET exists:', !!GOOGLE_CLIENT_SECRET);
  console.log('REDIRECT_URI:', REDIRECT_URI);

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    return NextResponse.json({
      error: 'Missing credentials',
      hasClientId: !!GOOGLE_CLIENT_ID,
      hasClientSecret: !!GOOGLE_CLIENT_SECRET
    }, { status: 500 });
  }

  const searchParams = request.nextUrl.searchParams;
  const role = searchParams.get('role') || 'operator';
  
  const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  
  googleAuthUrl.searchParams.append('client_id', GOOGLE_CLIENT_ID);
  googleAuthUrl.searchParams.append('redirect_uri', REDIRECT_URI);
  googleAuthUrl.searchParams.append('response_type', 'code');
  googleAuthUrl.searchParams.append('scope', 'email profile');
  googleAuthUrl.searchParams.append('access_type', 'offline');
  googleAuthUrl.searchParams.append('prompt', 'consent');
  googleAuthUrl.searchParams.append('state', role);

  const finalUrl = googleAuthUrl.toString();
  console.log('Final Google Auth URL:', finalUrl);

  return NextResponse.redirect(finalUrl);
}