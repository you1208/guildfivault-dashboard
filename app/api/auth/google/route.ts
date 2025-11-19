import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { PrismaClient } from '@prisma/client';
import { ethers } from 'ethers';
import { encrypt } from '@/lib/encryption';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_SECRET);

export async function POST(request: NextRequest) {
  try {
    const { credential, role } = await request.json();

    // Google トークンを検証
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload?.email) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    const { email, name } = payload;

    // 既存ユーザーをチェック
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // 新規ユーザー: ウォレットを生成
      const wallet = ethers.Wallet.createRandom();
      const encryptedKey = encrypt(wallet.privateKey);

      user = await prisma.user.create({
        data: {
          email,
          name: name || email.split('@')[0],
          walletAddress: wallet.address,
          encryptedKey,
          role: role || 'member',
        },
      });

      console.log(`✅ 新規ユーザー作成: ${email} (${wallet.address})`);
    }

    // JWTトークンを発行
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        walletAddress: user.walletAddress,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error('Google認証エラー:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}