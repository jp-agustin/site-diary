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
export function createSiteDiary(input: SiteDiaryInput): SiteDiary {
  return input;
}
