import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Discord Botから会員リストを取得
    const response = await fetch('http://localhost:3001/members');
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch members');
    }
    
    // データを整形
    const members = data.members.map((member: any, index: number) => ({
      id: index + 1,
      name: member.discordUsername,
      email: 'N/A', // Discord APIからはメールアドレスを取得できない
      discordId: member.discordId,
      discordUsername: member.discordUsername,
      tier: member.tier,
      joinDate: member.joinedAt,
      status: member.status,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30日後
    }));

    return NextResponse.json({ success: true, members });
  } catch (error: any) {
    console.error('Members API error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}