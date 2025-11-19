import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface MobileHeaderProps {
  title: string;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  title,
  showBack = true,
  rightAction,
}) => {
  const router = useRouter();

  return (
    <div
      className="sticky top-0 z-50 shadow-sm"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <div className="pt-safe flex items-center justify-between px-4 py-3">
        <div className="flex w-8 items-center">
          {showBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="h-8 w-8 rounded-full"
              style={{ color: 'var(--color-foreground)' }}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
        </div>

        <h1
          className="text-base font-semibold tracking-tight"
          style={{ color: 'var(--color-foreground)' }}
        >
          {title}
        </h1>

        <div className="flex w-8 items-center justify-end">
          {rightAction || null}
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
