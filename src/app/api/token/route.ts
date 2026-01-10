import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.HEYGEN_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.heygen.com/v1/streaming.create_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
    });

    if (!response.ok) {
      let errorMessage = 'Failed to create token';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
        console.error('Failed to create token:', errorData);
      } catch (e) {
        const errorText = await response.text();
        console.error('Failed to create token:', errorText);
        if (errorText) {
          errorMessage = errorText;
        }
      }
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating token:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
