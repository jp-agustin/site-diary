import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatDate = (rawDate?: string) => {
  if (!rawDate) return 'N/A';
  const dateObj = new Date(rawDate);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(dateObj);
};

export const getInitials = (rawName?: string) => {
  return rawName
    ? rawName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : '?';
};
