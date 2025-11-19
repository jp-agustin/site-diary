import { SiteDiary } from '@/data/site-diary';
import type { Int } from 'grats';

/** @gqlInput */
interface WeatherInput {
  temperature: Int;
  description: string;
}

/** @gqlInput */
interface SiteDiaryInput {
  id: string;
  date: string;
  createdBy: string;
  title: string;
  content?: string;
  attendees?: string[];
  attachments?: string[];
  weather?: WeatherInput;
}

/** @gqlType */
interface BeautifiedDiary {
  /** @gqlField */
  beautified: string;
}

/** @gqlMutationField */
export async function createSiteDiary(
  input: SiteDiaryInput,
): Promise<SiteDiary> {
  const res = await fetch(`${process.env.NEXT_PRIVATE_API_URL}/site-diary`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY || '',
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to create site diary: ${errorText}`);
  }

  const created: SiteDiary = await res.json();
  return created;
}

/** @gqlMutationField */
export async function beautifyDiaryInput(
  content: string,
): Promise<BeautifiedDiary> {
  const res = await fetch(`${process.env.NEXT_PRIVATE_API_URL}/ai/beautify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY || '',
    },
    body: JSON.stringify({ text: content }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to beautify text: ${text}`);
  }

  return res.json();
}
