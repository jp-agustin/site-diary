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
        <div
          key={i}
          className="aspect-square w-[30%] max-w-[120px] overflow-hidden rounded-lg"
        >
          <img src={src} alt="" className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;
