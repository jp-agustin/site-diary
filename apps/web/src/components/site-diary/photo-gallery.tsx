interface PhotoGalleryProps {
  photos: string[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  if (!photos?.length) {
    return <p className="text-muted-foreground text-sm">No photos uploaded.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {photos.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`photo-${i}`}
          className="h-32 w-32 rounded-md object-cover"
        />
      ))}
    </div>
  );
};

export default PhotoGallery;
