'use client';

import DiaryCard from '@/components/site-diary/diary-card';
import MobileHeader from '@/components/site-diary/mobile-header';
import { siteDiaries } from '@/data/site-diary';

const SiteDiaryListPage: React.FC = () => {
  // TODO: Use Apollo to fetch the data
  const filteredDiaries = siteDiaries; // can implement date filtering later

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title="Site Diaries" />

      <div className="space-y-4 p-4">
        {filteredDiaries.map((diary) => (
          <DiaryCard key={diary.id} {...diary} />
        ))}
      </div>
    </div>
  );
};

export default SiteDiaryListPage;
