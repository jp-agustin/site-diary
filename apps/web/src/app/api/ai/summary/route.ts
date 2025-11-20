import { generateDiarySummary } from '@/lib/ai';
import { SiteDiary } from '@/types/__generated__/graphql';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(`${process.env.NEXT_PRIVATE_API_URL}/site-diary`, {
      headers: { 'x-api-key': process.env.API_KEY || '' },
    });

    if (!res.ok) throw new Error('Failed to fetch site diaries');
    const diaries: SiteDiary[] = await res.json();

    const summary = await generateDiarySummary(diaries);
    return NextResponse.json({ summary });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
