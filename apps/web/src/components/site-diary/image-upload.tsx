import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';

interface ImageUploadProps {
  onChange: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    // TODO: Use image upload service
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onChange(url);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Image Upload</label>

      <Button type="button" onClick={() => inputRef.current?.click()}>
        {previewUrl ? 'Change Image' : 'Select Image'}
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      {previewUrl && (
        <div className="mt-2 h-32 w-32 overflow-hidden rounded-md border border-gray-200">
          <img
            src={previewUrl}
            alt="Selected image"
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
