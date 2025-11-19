import { useState } from 'react';

interface PhotoGalleryProps {
  photos: string[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  if (!photos?.length) {
    return (
      <p className="text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
        No photos uploaded.
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {photos.map((src, i) => (
          <div
            key={i}
            className="group relative h-32 w-full cursor-zoom-in overflow-hidden rounded-md border"
            style={{ borderColor: 'var(--color-border)' }}
            onClick={() => setSelectedPhoto(src)}
          >
            <img
              src={src}
              alt={`Photo ${i + 1}`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-200"
            />
            <div className="absolute inset-0 rounded-md bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/70"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <img
              src={selectedPhoto}
              alt="Selected photo"
              className="max-h-full max-w-full rounded-md shadow-lg"
            />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-2 right-2 rounded-full bg-white p-1 text-gray-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoGallery;
