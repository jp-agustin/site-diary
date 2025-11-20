'use client';

import DesktopHeader from '@/components/site-diary/desktop-header';
import DiaryForm from '@/components/site-diary/diary-form';
import MobileHeader from '@/components/site-diary/mobile-header';
import { CREATE_SITE_DIARY, SITE_DIARIES } from '@/graphql/queries';
import { SiteDiaryInput } from '@/types/__generated__/graphql';
import { useMutation } from '@apollo/client/react';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SiteDiaryCreatePage: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [createDiary] = useMutation(CREATE_SITE_DIARY, {
    refetchQueries: [{ query: SITE_DIARIES }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      setIsSubmitting(false);
      router.push('/site-diary');
    },
    onError: () => setIsSubmitting(false),
  });

  const handleSubmit = (data: {
    date: string;
    title: string;
    content?: string;
    weatherDescription: string;
    weatherTemperature: number;
    attendees?: string[];
    attachments?: string[];
  }) => {
    // For testing purposes, the frontend currently generates unique IDs using nanoid and passes them to the backend
    // In production, IDs should be generated only in the backend to ensure data integrity, prevents conflicts
    const input: SiteDiaryInput = {
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

    setIsSubmitting(true);
    createDiary({ variables: { input } });
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="hidden lg:block">
        <DesktopHeader
          title="New Diary Entry"
          subtitle="Create a record for your site activities"
        />
      </div>

      <div className="lg:hidden">
        <MobileHeader title="New Diary Entry" />
      </div>

      <div className="p-4 md:p-6">
        <DiaryForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
};

export default SiteDiaryCreatePage;
