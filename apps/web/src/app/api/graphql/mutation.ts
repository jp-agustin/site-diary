import { siteDiaries, SiteDiary } from '@/data/site-diary';
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
