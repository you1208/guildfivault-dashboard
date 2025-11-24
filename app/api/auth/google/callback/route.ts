import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { ethers } from 'ethers';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const REDIRECT_URI = process.env.NODE_ENV === 'production' 
  ? 'https://guildfivault-dashboard-awfh.vercel.app/api/auth/google/callback'
  : 'http://localhost:3000/api/auth/google/callback';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(`${request.nextUrl.origin}/signup/operator?error=${error}`);
  }

  if (!code) {
    return NextResponse.redirect(`${request.nextUrl.origin}/signup/operator?error=no_code`);
  }

  try {
    // Google トークン取得
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID!,
        client_secret: GOOGLE_CLIENT_SECRET!,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(tokenData.error || 'Failed to get token');
    }

    // ユーザー情報取得
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const googleUser = await userInfoResponse.json();

    if (!userInfoResponse.ok) {
      throw new Error('Failed to get user info');
    }

    // ウォレット生成
    const wallet = ethers.Wallet.createRandom();
    const walletAddress = wallet.address;

    // Parse state parameter
    let role = 'operator';
    let serverId = '';
    
    if (state) {
      try {
        const stateData = JSON.parse(state);
        role = stateData.role || 'operator';
        serverId = stateData.serverId || '';
      } catch (e) {
        // If not JSON, treat as role string (backward compatibility)
        role = state;
      }
    }

    // ユーザー情報（DBなしで一時的に作成）
    const user = {
      id: `user_${Date.now()}`,
      email: googleUser.email,
      name: googleUser.name,
      walletAddress,
      role,
      serverId,
    };

    // JWT生成
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // フロントエンドにリダイレクト
    const redirectUrl = new URL(`${request.nextUrl.origin}/auth/success`);
    redirectUrl.searchParams.append('token', token);
    redirectUrl.searchParams.append('user', JSON.stringify(user));
    if (serverId) {
      redirectUrl.searchParams.append('serverId', serverId);
    }

    return NextResponse.redirect(redirectUrl.toString());
  } catch (error: any) {
    console.error('Google auth error:', error);
    return NextResponse.redirect(
      `${request.nextUrl.origin}/signup/operator?error=${encodeURIComponent(error.message)}`
    );
  }
}