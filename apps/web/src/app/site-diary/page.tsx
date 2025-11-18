'use client';

import DiaryCard from '@/components/site-diary/diary-card';
import MobileHeader from '@/components/site-diary/mobile-header';
import { Button } from '@/components/ui/button';
import { SiteDiary } from '@/data/site-diary';
import { SITE_DIARIES } from '@/graphql/queries';
import { useQuery } from '@apollo/client/react';
import { useRouter } from 'next/navigation';

interface SiteDiariesQuery {
  siteDiaries: SiteDiary[];
}

const SiteDiaryListPage: React.FC = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery<SiteDiariesQuery>(SITE_DIARIES);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error.message}</div>;

  const diaries = (data?.siteDiaries ?? []) as SiteDiary[];

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title="Site Diaries" />

      <div className="flex justify-end px-4 pt-4">
        <Button onClick={() => router.push('/site-diary/create')}>
          + Create New
        </Button>
      </div>

      <div className="space-y-4 p-4">
        {diaries.map((diary) => (
          <DiaryCard key={diary.id} {...diary} />
        ))}
      </div>
    </div>
  );
};

export default SiteDiaryListPage;
