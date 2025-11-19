import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const diaries = await prisma.siteDiary.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        date: true,
        title: true,
        createdBy: true,
        content: true,
        attendees: true,
        attachments: true,
        weather: true,
      },
    });

    return NextResponse.json(diaries, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: (e as Error).message || 'Unknown error' },
      { status: 500 },
    );
  }
}

// POST handler: Create a new site diary
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const {
      id,
      date,
      title,
      createdBy,
      content,
      attendees,
      attachments,
      weather,
    } = data;

    if (!id || !date || !title || !createdBy) {
      throw new Error('id, date, title, and createdBy are required');
    }

    const siteDiary = await prisma.siteDiary.create({
      data: {
        id,
        date: new Date(date),
        title,
        createdBy,
        content,
        attendees,
        attachments,
        weather,
      },
    });

    return NextResponse.json({ ...siteDiary }, { status: 201 });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: (e as Error).message || 'Unknown error' },
      { status: 400 },
    );
  }
}
