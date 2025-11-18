'use client';

import DiaryCard from '@/components/site-diary/diary-card';
import MobileHeader from '@/components/site-diary/mobile-header';
import { Button } from '@/components/ui/button';
import { siteDiaries } from '@/data/site-diary';
import { useRouter } from 'next/navigation';

const SiteDiaryListPage: React.FC = () => {
  const router = useRouter();

  // TODO: Use Apollo to fetch the data
  const filteredDiaries = siteDiaries; // can implement date filtering later

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title="Site Diaries" />

      <div className="flex justify-end px-4 pt-4">
        <Button onClick={() => router.push('/site-diary/create')}>
          + Create New
        </Button>
      </div>

      <div className="space-y-4 p-4">
        {filteredDiaries.map((diary) => (
          <DiaryCard key={diary.id} {...diary} />
        ))}
      </div>
    </div>
  );
};

export default SiteDiaryListPage;
