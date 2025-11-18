import type { SiteDiary } from '@/data/site-diary';
import DetailSection from './detail-section';
import PhotoGallery from './photo-gallery';

interface DiaryDetailsProps {
  diary: SiteDiary;
}

const DiaryDetails: React.FC<DiaryDetailsProps> = ({ diary }) => {
  const formattedDate = new Date(diary.date).toLocaleDateString();
  const weatherText = diary.weather
    ? `${diary.weather.description}, ${diary.weather.temperature}°C`
    : 'N/A';

  return (
    <div className="space-y-6">
      <div className="border-b pt-4 pb-3 backdrop-blur">
        <h1 className="text-2xl leading-tight font-semibold break-words">
          {diary.title}
        </h1>

        <p className="text-muted-foreground mt-1 text-sm">
          Created by <span className="font-medium">{diary.createdBy}</span>
          {' · '}
          {formattedDate}
          {' · '}
          {weatherText}
        </p>
      </div>

      <DetailSection title="Content">
        <p>{diary.content ?? 'No content available.'}</p>
      </DetailSection>

      <DetailSection title="Attendees">
        {diary.attendees?.length ? (
          <ul className="ml-5 list-disc space-y-1">
            {diary.attendees.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-sm">No attendees listed.</p>
        )}
      </DetailSection>

      <DetailSection title="Attachments">
        <PhotoGallery photos={diary.attachments ?? []} />
      </DetailSection>
    </div>
  );
};

export default DiaryDetails;
