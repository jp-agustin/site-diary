"use client";

import DiaryCard from "@/components/site-diary/diary-card";
import { siteDiaries } from "@/data/site-diary";

const SiteDiaryListPage: React.FC = () => {
  // TODO: Use Apollo to fetch the data
  const filteredDiaries = siteDiaries; // can implement date filtering later

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 space-y-4">
        {filteredDiaries.map((diary) => (
          <DiaryCard key={diary.id} {...diary} />
        ))}
      </div>
    </div>
  );
};

export default SiteDiaryListPage;
