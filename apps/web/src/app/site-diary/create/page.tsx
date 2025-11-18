'use client';

import DiaryForm from '@/components/site-diary/diary-form';
import MobileHeader from '@/components/site-diary/mobile-header';
import { siteDiaries, SiteDiary } from '@/data/site-diary';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import React from 'react';

const SiteDiaryCreatePage: React.FC = () => {
  const router = useRouter();

  const handleSubmit = (data: {
    date: string;
    title: string;
    content?: string;
    weatherDescription: string;
    weatherTemperature: number;
    attendees?: string[];
    attachments?: string[];
  }) => {
    const newDiary: SiteDiary = {
      id: nanoid(),
      date: data.date,
      title: data.title,
      content: data.content,
      weather: {
        description: data.weatherDescription,
        temperature: data.weatherTemperature,
      },
      attendees: data.attendees,
      attachments: data.attachments,
      createdBy: 'Demo User',
    };

    // TODO: Use mutation to push new element
    siteDiaries.unshift(newDiary);
    router.push('/site-diary');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title="New Diary Entry" />
      <DiaryForm onSubmit={handleSubmit} />
    </div>
  );
};

export default SiteDiaryCreatePage;
