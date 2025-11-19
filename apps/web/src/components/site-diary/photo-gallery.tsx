interface PhotoGalleryProps {
  photos: string[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  if (!photos?.length) {
    return (
      <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
        No photos uploaded.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {photos.map((src, i) => (
        <div
          key={i}
          className="h-32 w-full rounded-md border"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <img
            src={src}
            alt={`Photo ${i + 1}`}
            className="h-full w-full rounded-md object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;
