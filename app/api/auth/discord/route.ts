import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
  const REDIRECT_URI = `${request.nextUrl.origin}/api/auth/discord/callback`;
  
  // Get serverId from query parameter
  const { searchParams } = new URL(request.url);
  const serverId = searchParams.get('serverId');
  
  // Save serverId in state parameter
  const state = serverId || 'no-server';
  
  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&response_type=code&scope=identify%20guilds.join&state=${state}`;

  return NextResponse.redirect(discordAuthUrl);
}