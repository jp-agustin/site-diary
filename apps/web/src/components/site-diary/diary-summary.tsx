import { Button } from '@/components/ui/button';
import { SITE_DIARY_SUMMARY } from '@/graphql/queries';
import { SiteDiarySummaryQuery } from '@/types/__generated__/graphql';
import { useLazyQuery } from '@apollo/client/react';
import { ChevronDown, ChevronUp, Loader2, RefreshCcw } from 'lucide-react';
import { useState } from 'react';

const DiarySummaryCard: React.FC = () => {
  const [fetchSummary, { data, loading, error }] =
    useLazyQuery<SiteDiarySummaryQuery>(SITE_DIARY_SUMMARY);

  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleGenerate = async () => {
    await fetchSummary();
  };

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const summaryText = data?.siteDiarySummary.summary ?? '';
  const mobilePreview = summaryText.split('\n').slice(0, 3).join('\n');

  return (
    <div
      className="bg-card space-y-3 rounded-lg border p-4 shadow-md lg:p-6"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          AI Weekly Summary
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="default"
            onClick={handleGenerate}
            disabled={loading}
            className="w-full md:w-auto"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : data ? (
              <>
                <RefreshCcw className="mr-2 h-4 w-4" />
                Regenerate
              </>
            ) : (
              'Generate Summary'
            )}
          </Button>

          {data && (
            <button
              className="text-muted-foreground flex items-center gap-1 text-sm lg:hidden"
              onClick={toggleCollapse}
            >
              {isCollapsed ? 'Show more' : 'Show less'}
              {isCollapsed ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      </div>

      {!data && !loading && !error && (
        <p className="text-muted-foreground text-sm italic">
          Click &quot;Generate Summary&quot; to get the weekly AI summary.
        </p>
      )}

      {loading ? (
        <div className="animate-pulse space-y-2">
          <div className="bg-muted h-3 w-5/6 rounded" />
          <div className="bg-muted h-3 w-4/6 rounded" />
          <div className="bg-muted h-3 w-3/6 rounded" />
        </div>
      ) : error ? (
        <p className="text-destructive text-sm">
          Failed to generate summary. Please try again.
        </p>
      ) : data ? (
        <p className="text-muted-foreground text-sm whitespace-pre-wrap">
          {isCollapsed && window.innerWidth < 1024
            ? mobilePreview + '...'
            : summaryText}
        </p>
      ) : null}
    </div>
  );
};

export default DiarySummaryCard;
