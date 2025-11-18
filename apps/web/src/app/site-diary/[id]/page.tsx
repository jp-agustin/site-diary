'use client';

import DiaryDetail from '@/components/site-diary/diary-detail';
import { siteDiaries } from '@/data/site-diary';
import { useParams } from 'next/navigation';

const SiteDiaryViewPage: React.FC = () => {
  const { id } = useParams();

  // TODO: Use Apollo to fetch the data
  const diary = siteDiaries.find((d) => d.id === id);

  if (!diary) return <div className="p-4">Diary not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        <DiaryDetail diary={diary} />
      </div>
    </div>
  );
};

export default SiteDiaryViewPage;
