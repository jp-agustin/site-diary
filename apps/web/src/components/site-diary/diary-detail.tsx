import { formatDate, getInitials } from '@/lib/utils';
import { SiteDiary } from '@/types/__generated__/graphql';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { Cloud, CloudRain, CloudSnow, CloudSun, Sun, Wind } from 'lucide-react';
import DetailSection from './detail-section';
import PhotoGallery from './photo-gallery';
import WeatherIcon from './weather-icon';

interface DiaryDetailsProps {
  diary: SiteDiary;
}

const DiaryDetails: React.FC<DiaryDetailsProps> = ({ diary }) => {
  return (
    <div className="mx-auto max-w-5xl space-y-4 p-2 md:p-6">
      <div
        className="flex flex-col border-b pb-4 md:flex-row md:items-center md:justify-between"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <h1
            className="text-2xl font-semibold break-words"
            style={{ color: 'var(--color-foreground)' }}
          >
            {diary.title || (
              <span className="inline-block h-6 w-48 animate-pulse rounded bg-gray-200" />
            )}
          </h1>

          <div className="mt-1 flex items-center gap-2 md:mt-0">
            <Avatar className="h-8 w-8">
              <AvatarFallback
                style={{
                  backgroundColor: 'var(--color-secondary)',
                  color: 'var(--color-secondary-foreground)',
                }}
              >
                {getInitials(diary.createdBy)}
              </AvatarFallback>
            </Avatar>
            <span
              className="text-sm"
              style={{ color: 'var(--color-muted-foreground)' }}
            >
              {diary.createdBy}
            </span>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-3 md:mt-0">
          <span
            className="text-sm"
            style={{ color: 'var(--color-muted-foreground)' }}
          >
            {formatDate(diary.date)}
          </span>
          <span className="flex items-center gap-1 text-sm">
            <WeatherIcon
              description={diary.weather?.description.toLowerCase()}
              temperature={diary.weather?.temperature}
            />
          </span>
        </div>
      </div>

      <DetailSection title="Content">
        <p style={{ color: 'var(--color-card-foreground)' }}>
          {diary.content || 'No content available.'}
        </p>
      </DetailSection>

      <DetailSection title="Attendees">
        {diary.attendees?.length ? (
          <ul
            className="ml-5 list-disc space-y-1"
            style={{ color: 'var(--color-card-foreground)' }}
          >
            {diary.attendees.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        ) : (
          <p style={{ color: 'var(--color-muted-foreground)' }}>
            No attendees listed.
          </p>
        )}
      </DetailSection>

      <DetailSection title="Attachments">
        <PhotoGallery photos={diary.attachments ?? []} />
      </DetailSection>
    </div>
  );
};

export default DiaryDetails;
