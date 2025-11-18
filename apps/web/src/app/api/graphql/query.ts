import { SiteDiary } from '@/data/site-diary';

/** @gqlQueryField */
export async function siteDiaries(): Promise<SiteDiary[]> {
  const res = await fetch(`${process.env.NEXT_PRIVATE_API_URL}/site-diary`, {
    headers: { 'x-api-key': process.env.API_KEY || '' },
  });

  if (!res.ok) throw new Error('Failed to fetch site diaries');
  return res.json();
}

/** @gqlQueryField */
export async function siteDiary(id: string): Promise<SiteDiary | undefined> {
  const res = await fetch(
    `${process.env.NEXT_PRIVATE_API_URL}/site-diary/${id}`,
    {
      headers: { 'x-api-key': process.env.API_KEY || '' },
    },
  );

  if (!res.ok) throw new Error('Failed to fetch site diary');
  return res.json();
}
