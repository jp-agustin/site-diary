import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';

interface ImageUploadProps {
  onChange: (url: string[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));

    setPreviews((prev) => [...prev, ...urls]);
    onChange([...previews, ...urls]);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Image Upload</label>
      <Button type="button" onClick={() => inputRef.current?.click()}>
        Select Images
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFilesChange}
        className="hidden"
      />
      {previews.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {previews.map((url) => (
            <div
              key={url}
              className="aspect-square w-24 overflow-hidden rounded-md border border-gray-200"
            >
              <img
                src={url}
                alt="Selected image"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
