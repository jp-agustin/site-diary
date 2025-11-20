import { SiteDiary } from '@/types/__generated__/graphql';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

async function callGemini(prompt: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
  });

  return response.text ?? '';
}

export async function generateDiarySummary(
  diaries: SiteDiary[],
): Promise<string> {
  const prompt = `
You are a professional site diary assistant. Summarize the following diaries in a concise, factual manner.

Guidelines:
- Only summarize the diaries provided; do not add external information.
- Output in markdown with:
  1. Summary (2-3 paragraphs)
  2. Key Highlights (bullet points)
- Professional and neutral tone.
- Do not invent names or events.

Diaries (last 7 days):
${JSON.stringify(diaries)}
  `;

  return callGemini(prompt);
}

export async function beautifyDiaryText(text: string): Promise<string> {
  const prompt = `
You are a professional writing assistant. Improve the text for clarity, grammar, and readability.

Guidelines:
- Only improve text; do not add new information.
- Preserve original meaning.
- Maintain context (diary, notes, descriptions).
- Keep output concise.
- Avoid slang unless present.
- Output plain text only.

Original text:
"${text}"
  `;

  return callGemini(prompt);
}
