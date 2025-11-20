// lib/ai.ts
import { SiteDiary } from '@/types/__generated__/graphql';
import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateDiarySummary(
  diaries: SiteDiary[],
): Promise<string> {
  const prompt = `
You are a professional site diary assistant. Your task is to summarize the following site diaries in a concise, clear, and factual manner.

Guidelines:
- Only summarize the diaries provided; do not add any external information.
- Output should be in markdown with sections:
  1. Summary (2-3 concise paragraphs)
  2. Key Highlights (bullet points of notable events, weather conditions, or issues)
- Use professional and neutral tone.
- Do not invent names or events.

Diaries (last 7 days):
${JSON.stringify(diaries)}
  `;

  const completion = await client.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 300,
  });

  return completion.choices[0].message?.content ?? '';
}

export async function beautifyDiaryText(text: string): Promise<string> {
  const prompt = `
You are a professional writing assistant. Your task is to improve the user's text for clarity, grammar, and readability.

Guidelines:
- Only improve the text; do NOT add new information.
- Preserve the original meaning and intent.
- Maintain the context of the text (diary content, notes, or descriptions).
- Keep output concise; if maxLength is provided, truncate or rephrase to fit.
- Avoid slang or overly casual expressions unless explicitly present in the original text.
- Output plain text only.

Original text:
"${text}"
  `;

  const completion = await client.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 200,
  });

  return completion.choices[0].message?.content ?? text;
}
