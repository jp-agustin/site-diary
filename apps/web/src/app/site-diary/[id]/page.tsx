'use client';

import DesktopHeader from '@/components/site-diary/desktop-header';
import DiaryDetail from '@/components/site-diary/diary-detail';
import MobileHeader from '@/components/site-diary/mobile-header';
import { SITE_DIARY } from '@/graphql/queries';
import { SiteDiary, SiteDiaryQuery } from '@/types/__generated__/graphql';
import { useQuery } from '@apollo/client/react';
import { AlertCircle } from 'lucide-react';
import { useParams } from 'next/navigation';

const SiteDiaryViewPage: React.FC = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery<SiteDiaryQuery>(SITE_DIARY, {
    variables: { id },
  });

  const diary = data?.siteDiary as SiteDiary | undefined;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <div className="lg:hidden">
        <MobileHeader title={diary?.title || 'Site Diary'} />
      </div>

      <div className="hidden lg:block">
        <DesktopHeader
          title={diary?.title || 'Site Diary'}
          subtitle={diary ? `Created by ${diary.createdBy}` : undefined}
        />
      </div>

      <div className="mx-auto max-w-5xl p-4 lg:p-6">
        {/* Error */}
        {error && (
          <div
            className="mb-4 flex items-center gap-2 rounded-md border px-4 py-3"
            style={{
              borderColor: 'var(--destructive)',
              backgroundColor: 'var(--destructive)',
              color: 'var(--color-background)',
            }}
          >
            <AlertCircle size={18} />
            <span>{error.message}</span>
          </div>
        )}

        {/* Loading skeleton */}
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-md p-4"
                style={{ backgroundColor: 'var(--color-card)' }}
              >
                <div className="mb-2 h-6 w-3/4 rounded bg-gray-200" />
                <div className="mb-1 h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-5/6 rounded bg-gray-200" />
              </div>
            ))}
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-32 w-full animate-pulse rounded-md"
                  style={{ backgroundColor: 'var(--color-muted)' }}
                />
              ))}
            </div>
          </div>
        ) : diary ? (
          <DiaryDetail diary={diary} />
        ) : (
          <div
            className="rounded-md p-4 text-center"
            style={{ color: 'var(--color-muted-foreground)' }}
          >
            Diary not found
          </div>
        )}
      </div>
    </div>
  );
};

export default SiteDiaryViewPage;
