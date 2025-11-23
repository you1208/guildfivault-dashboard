import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get serverId from query parameter
    const { searchParams } = new URL(request.url);
    const serverId = searchParams.get('serverId');
    
    if (!serverId) {
      return NextResponse.json(
        { success: false, error: 'Server ID is required' },
        { status: 400 }
      );
    }

    const botUrl = process.env.DISCORD_BOT_URL || 'http://localhost:3001';
    const response = await fetch(`${botUrl}/members?serverId=${serverId}`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch members');
    }
    
    const members = data.members.map((member: any, index: number) => ({
      id: index + 1,
      name: member.discordUsername,
      email: 'N/A',
      discordId: member.discordId,
      discordUsername: member.discordUsername,
      tier: member.tier,
      joinDate: member.joinedAt,
      status: member.status,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
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