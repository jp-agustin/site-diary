import { formatDate, getInitials } from '@/lib/utils';
import { SiteDiary } from '@/types/__generated__/graphql';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { Cloud, CloudRain, CloudSnow, CloudSun, Sun, Wind } from 'lucide-react';
import { useRouter } from 'next/navigation';
import WeatherIcon from './weather-icon';

interface DiaryCardProps extends SiteDiary {}

const DiaryCard: React.FC<DiaryCardProps> = ({
  id,
  date,
  title,
  content,
  createdBy,
  weather,
}) => {
  const router = useRouter();

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
          <WeatherIcon
            description={weather?.description.toLowerCase()}
            temperature={weather?.temperature}
          />
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
            {getInitials(createdBy)}
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
