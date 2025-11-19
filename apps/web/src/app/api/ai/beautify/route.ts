import { beautifyDiaryText } from '@/lib/ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text) throw new Error('No text provided');

    const beautified = await beautifyDiaryText(text);
    return NextResponse.json({ beautified });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
