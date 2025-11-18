'use client';

import DiaryDetail from '@/components/site-diary/diary-detail';
import MobileHeader from '@/components/site-diary/mobile-header';
import { SITE_DIARY } from '@/graphql/queries';
import { SiteDiary, SiteDiaryQuery } from '@/types/__generated__/graphql';
import { useQuery } from '@apollo/client/react';
import { useParams } from 'next/navigation';

const SiteDiaryViewPage: React.FC = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery<SiteDiaryQuery>(SITE_DIARY, {
    variables: { id },
  });

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error.message}</div>;

  const diary = data?.siteDiary as SiteDiary | undefined;

  if (!diary) return <div className="p-4">Diary not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title={diary.title} />

      <div className="p-4">
        <DiaryDetail diary={diary} />
      </div>
    </div>
  );
};

export default SiteDiaryViewPage;
