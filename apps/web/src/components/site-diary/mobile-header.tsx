import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const MobileHeader: React.FC<{ title: string }> = ({ title }) => {
  const router = useRouter();
  return (
    <div className="sticky top-0 z-50 flex items-center bg-white p-4 shadow-sm">
      <Button variant="ghost" size="icon" onClick={() => router.back()}>
        <ArrowLeft />
      </Button>
      <h1 className="ml-2 text-lg font-medium">{title}</h1>
    </div>
  );
};

export default MobileHeader;
