import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SiteDiary } from '@/types/__generated__/graphql';
import { useRouter } from 'next/navigation';

const DiaryCard: React.FC<SiteDiary> = ({
  id,
  date,
  title,
  content,
  createdBy,
  weather,
}) => {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/site-diary/${id}`)}
      className="cursor-pointer gap-0 p-0 transition hover:shadow-md"
    >
      <CardHeader className="p-3">
        <div className="flex justify-between text-sm text-gray-500">
          <span>{date}</span>
          <span>{weather?.description || 'N/A'}</span>
        </div>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>

      <CardContent className="px-3 py-0">
        <p className="line-clamp-2 text-sm">{content}</p>
      </CardContent>

      <CardFooter className="p-3">
        <span className="text-xs text-gray-400">By {createdBy}</span>
      </CardFooter>
    </Card>
  );
};

export default DiaryCard;
