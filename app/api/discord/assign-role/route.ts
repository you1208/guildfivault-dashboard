import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('API received body:', body);
    
    const { discordId, roleName } = body;
    
    console.log('Extracted discordId:', discordId);
    console.log('Extracted roleName:', roleName);
    
    if (!discordId || !roleName) {
      console.error('Missing fields - discordId:', !!discordId, 'roleName:', !!roleName);
      return NextResponse.json(
        { success: false, error: 'Missing discordId or tierName' },
        { status: 400 }
      );
    }

    const botUrl = 'http://localhost:3001/assign-role';
    console.log('Forwarding to Discord Bot at', botUrl);
    
    const requestBody = JSON.stringify({ discordId, roleName });
    console.log('Request body to send:', requestBody);
    
    // Forward to Discord Bot
    const response = await fetch(botUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });

    console.log('Discord Bot response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Discord Bot error response:', errorText);
      throw new Error(`Discord Bot returned ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log('Discord Bot response:', result);
    
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API error:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}