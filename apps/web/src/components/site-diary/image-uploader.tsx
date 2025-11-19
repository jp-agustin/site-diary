import { UploadDropzone } from '@/lib/uploadthing';
import { useState } from 'react';

interface ImageUploaderProps {
  onUploaded: (urls: string[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUploaded }) => {
  const [files, setFiles] = useState<string[]>([]);

  const removeImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    onUploaded(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <UploadDropzone
        endpoint="attachments"
        onClientUploadComplete={(res) => {
          if (!res) return;

          const urls = res.map((f) => f.url);
          setFiles((prev) => [...prev, ...urls]);
          onUploaded([...files, ...urls]);
        }}
        onUploadError={(err) => alert(`Upload failed: ${err.message}`)}
      />

      <div className="grid grid-cols-3 gap-2">
        {files.map((url, index) => (
          <div key={index} className="group relative">
            <img
              src={url}
              alt="Uploaded"
              width={200}
              height={200}
              className="h-32 w-full rounded-md border object-cover"
            />

            <button
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 rounded-full bg-black/60 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
