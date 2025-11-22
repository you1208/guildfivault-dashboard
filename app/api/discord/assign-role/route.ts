import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { discordId, roleName } = await request.json();

    if (!discordId || !roleName) {
      return NextResponse.json(
        { success: false, message: 'Missing discordId or roleName' },
        { status: 400 }
      );
    }

    // 別プロセスで動いているDiscord Botに転送
    const response = await fetch('http://localhost:3001/assign-role', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ discordId, roleName }),
    });

    const result = await response.json();

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}