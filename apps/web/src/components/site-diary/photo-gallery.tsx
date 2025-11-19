interface PhotoGalleryProps {
  photos: string[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  if (!photos?.length) {
    return <p className="text-muted-foreground text-sm">No photos uploaded.</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {photos.map((src, i) => (
        <div key={i} className="h-32 w-full rounded-md border object-cover">
          <img src={src} alt="" className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;
