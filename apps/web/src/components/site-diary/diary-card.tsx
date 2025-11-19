import { formatDate } from '@/lib/utils';
import { SiteDiary } from '@/types/__generated__/graphql';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { Cloud, CloudRain, CloudSnow, CloudSun, Sun, Wind } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface DiaryCardProps extends SiteDiary { }

const weatherIconMap: Record<string, React.JSX.Element> = {
  sunny: <Sun className="h-5 w-5 text-yellow-500" />,
  rainy: <CloudRain className="h-5 w-5 text-blue-500" />,
  cloudy: <Cloud className="h-5 w-5 text-gray-400" />,
  windy: <Wind className="h-5 w-5 text-teal-400" />,
  'partly cloudy': <CloudSun className="h-5 w-5 text-yellow-400" />,
  snowy: <CloudSnow className="h-5 w-5 text-blue-200" />,
};

const DiaryCard: React.FC<DiaryCardProps> = ({
  id,
  date,
  title,
  content,
  createdBy,
  weather,
}) => {
  const router = useRouter();

  const initials = createdBy
    ? createdBy
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
    : '?';

  return (
    <div
      onClick={() => router.push(`/site-diary/${id}`)}
      style={{
        backgroundColor: 'var(--color-card)',
        color: 'var(--color-card-foreground)',
        borderRadius: 'var(--radius-lg)',
        border: `1px solid var(--color-border)`,
      }}
      className="cursor-pointer p-4 shadow-sm transition hover:shadow-md"
    >
      <div
        className="mb-2 flex items-center justify-between text-sm"
        style={{ color: 'var(--color-muted-foreground)' }}
      >
        <span>{formatDate(date)}</span>
        <span className="flex items-center gap-1">
          {weather?.description
            ? weatherIconMap[weather.description.toLowerCase()] ||
            weather.description
            : 'N/A'}
          {weather?.temperature ? (
            <span>{Math.round(weather.temperature)}°C</span>
          ) : null}
        </span>
      </div>

      <h2
        className="mb-1 text-base font-semibold"
        style={{ color: 'var(--color-foreground)' }}
      >
        {title}
      </h2>

      <p
        className="mb-3 line-clamp-2 text-sm"
        style={{ color: 'var(--color-muted-foreground)' }}
      >
        {content}
      </p>

      <div className="flex items-center gap-2 text-xs">
        <Avatar className="h-8 w-8">
          <AvatarFallback
            style={{
              backgroundColor: 'var(--color-secondary)',
              color: 'var(--color-secondary-foreground)',
            }}
          >
            {initials}
          </AvatarFallback>
        </Avatar>
        <span style={{ color: 'var(--color-muted-foreground)' }}>
          By {createdBy}
        </span>
      </div>
    </div>
  );
};

export default DiaryCard;
