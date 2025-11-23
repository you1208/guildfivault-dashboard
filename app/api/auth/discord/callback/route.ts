import { NextRequest, NextResponse } from 'next/server';

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

const REDIRECT_URI = process.env.NODE_ENV === 'production' 
  ? 'https://guildfivault-dashboard-awfh.vercel.app/api/auth/discord/callback'
  : 'http://localhost:3000/api/auth/discord/callback';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state'); // serverId
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(`${request.nextUrl.origin}/plans?error=${error}`);
  }

  if (!code) {
    return NextResponse.redirect(`${request.nextUrl.origin}/plans?error=no_code`);
  }

  try {
    // Discord トークン取得
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: DISCORD_CLIENT_ID!,
        client_secret: DISCORD_CLIENT_SECRET!,
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(tokenData.error || 'Failed to get Discord token');
    }

    // Discordユーザー情報取得
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const discordUser = await userResponse.json();

    if (!userResponse.ok) {
      throw new Error('Failed to get Discord user info');
    }

    // Get serverId from state parameter
    const serverId = state && state !== 'no-server' ? state : null;

    // サーバーに自動参加させる
    if (serverId) {
      try {
        const joinResponse = await fetch(
          `https://discord.com/api/guilds/${serverId}/members/${discordUser.id}`,
          {
            method: 'PUT',
            headers: {
              'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              access_token: tokenData.access_token,
            }),
          }
        );

        if (joinResponse.ok || joinResponse.status === 204) {
          console.log(`✅ User ${discordUser.username} joined server ${serverId} automatically`);
        } else {
          const joinError = await joinResponse.json();
          console.log('Join response:', joinError);
          // すでに参加している場合は無視
          if (joinResponse.status !== 204 && joinResponse.status !== 201) {
            console.warn('Failed to auto-join server, but continuing...');
          }
        }
      } catch (joinError) {
        console.error('Auto-join error:', joinError);
        // エラーでも続行（すでに参加している可能性）
      }
    } else {
      console.warn('No server ID in state parameter, skipping auto-join');
    }

    // ユーザー情報を更新
    const redirectUrl = new URL(`${request.nextUrl.origin}/auth/discord-success`);
    redirectUrl.searchParams.append('discordId', discordUser.id);
    redirectUrl.searchParams.append('discordUsername', `${discordUser.username}#${discordUser.discriminator}`);
    redirectUrl.searchParams.append('discordAvatar', discordUser.avatar || '');

    return NextResponse.redirect(redirectUrl.toString());
  } catch (error: any) {
    console.error('Discord auth error:', error);
    return NextResponse.redirect(
      `${request.nextUrl.origin}/plans?error=${encodeURIComponent(error.message)}`
    );
  }
}