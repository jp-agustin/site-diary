'use client';

import DesktopHeader from '@/components/site-diary/desktop-header';
import DiaryCard from '@/components/site-diary/diary-card';
import DiarySummaryCard from '@/components/site-diary/diary-summary';
import MobileHeader from '@/components/site-diary/mobile-header';
import { Button } from '@/components/ui/button';
import { SITE_DIARIES } from '@/graphql/queries';
import { SiteDiariesQuery, SiteDiary } from '@/types/__generated__/graphql';
import { useQuery } from '@apollo/client/react';
import { AlertCircle, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SiteDiaryListPage: React.FC = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery<SiteDiariesQuery>(SITE_DIARIES);

  const diaries = (data?.siteDiaries ?? []) as SiteDiary[];

  return (
    <div
      style={{ backgroundColor: 'var(--color-background)' }}
      className="min-h-screen"
    >
      <div className="lg:hidden">
        <MobileHeader title="Site Diaries" showBack={false} />
      </div>

      <div className="hidden lg:block">
        <DesktopHeader
          title="Site Diaries"
          subtitle="Daily Logs and Activities"
          rightAction={
            <Button
              className="gap-2"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-primary-foreground)',
                borderRadius: 'var(--radius-md)',
              }}
              onClick={() => router.push('/site-diary/create')}
            >
              <Plus size={16} /> Create Diary
            </Button>
          }
        />
      </div>

      <div className="mx-auto max-w-5xl space-y-4 p-4 lg:p-6">
        <DiarySummaryCard />

        {/* Error */}
        {error && (
          <div
            className="mb-4 flex items-center gap-2 rounded-md px-4 py-3"
            style={{
              backgroundColor: 'var(--color-destructive)',
              color: 'var(--color-primary-foreground)',
              border: `1px solid var(--color-border)`,
            }}
          >
            <AlertCircle size={18} />
            <span>{error.message}</span>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex animate-pulse flex-col gap-3 p-4 shadow-sm"
                style={{
                  backgroundColor: 'var(--color-card)',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <div
                  className="h-4 w-1/3 rounded"
                  style={{ backgroundColor: 'var(--color-muted)' }}
                />
                <div
                  className="h-3 w-2/3 rounded"
                  style={{ backgroundColor: 'var(--color-muted)' }}
                />
                <div
                  className="h-3 w-1/2 rounded"
                  style={{ backgroundColor: 'var(--color-muted)' }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && diaries.length === 0 && (
          <div className="flex flex-col items-center py-20 text-center">
            <h2
              className="text-lg font-semibold"
              style={{ color: 'var(--color-muted-foreground)' }}
            >
              No Site Diaries Yet
            </h2>
            <p
              className="mt-1 text-sm"
              style={{ color: 'var(--color-muted-foreground)' }}
            >
              Start by creating your first entry.
            </p>
            <Button
              className="mt-6 gap-2"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-primary-foreground)',
                borderRadius: 'var(--radius-md)',
              }}
              onClick={() => router.push('/site-diary/create')}
            >
              <Plus size={18} /> Create Diary
            </Button>
          </div>
        )}

        {!loading && diaries.length > 0 && (
          <>
            <div className="space-y-4 pb-20">
              {diaries.map((diary) => (
                <DiaryCard key={diary.id} diary={diary} />
              ))}
            </div>

            {/* Mobile FAB */}
            <div className="fixed right-4 bottom-4 z-50 lg:hidden">
              <Button
                onClick={() => router.push('/site-diary/create')}
                className="flex h-12 w-12 items-center justify-center rounded-full p-0 shadow-lg"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-primary-foreground)',
                  borderRadius: '50%',
                }}
              >
                <Plus size={20} />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SiteDiaryListPage;
