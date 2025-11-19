'use client';

import DiaryForm from '@/components/site-diary/diary-form';
import MobileHeader from '@/components/site-diary/mobile-header';
import { CREATE_SITE_DIARY, SITE_DIARIES } from '@/graphql/queries';
import { SiteDiaryInput } from '@/types/__generated__/graphql';
import { useMutation } from '@apollo/client/react';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';

const SiteDiaryCreatePage: React.FC = () => {
  const router = useRouter();
  const [createDiary] = useMutation(CREATE_SITE_DIARY, {
    refetchQueries: [{ query: SITE_DIARIES }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      router.push('/site-diary');
    },
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

    createDiary({
      variables: {
        input,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title="New Diary Entry" />
      <DiaryForm onSubmit={handleSubmit} />
    </div>
  );
};

export default SiteDiaryCreatePage;
