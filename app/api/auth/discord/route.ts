import { NextRequest, NextResponse } from 'next/server';

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const REDIRECT_URI = process.env.NODE_ENV === 'production' 
  ? 'https://guildfivault-dashboard-awfh.vercel.app/api/auth/discord/callback'
  : 'http://localhost:3000/api/auth/discord/callback';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId'); // Google認証後のユーザーID

  // Discord OAuth URL にリダイレクト
  const discordAuthUrl = new URL('https://discord.com/api/oauth2/authorize');
  
  discordAuthUrl.searchParams.append('client_id', DISCORD_CLIENT_ID!);
  discordAuthUrl.searchParams.append('redirect_uri', REDIRECT_URI);
  discordAuthUrl.searchParams.append('response_type', 'code');
  discordAuthUrl.searchParams.append('scope', 'identify guilds.join');
  discordAuthUrl.searchParams.append('state', userId || ''); // userIdをstateで渡す

  return NextResponse.redirect(discordAuthUrl.toString());
}