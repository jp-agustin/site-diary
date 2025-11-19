import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import ImageUploader from './image-uploader';
import { weatherIconMap } from './weather-icon';

interface DiaryFormProps {
  onSubmit: (data: {
    date: string;
    title: string;
    content?: string;
    weatherDescription: string;
    weatherTemperature: number;
    attendees?: string[];
    attachments?: string[];
  }) => void;
  isSubmitting?: boolean;
}

const weatherOptions = [
  'sunny',
  'rainy',
  'cloudy',
  'windy',
  'partly cloudy',
  'snowy',
];

const DiaryForm: React.FC<DiaryFormProps> = ({ onSubmit, isSubmitting }) => {
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [weatherDesc, setWeatherDesc] = useState(weatherOptions[0]);
  const [temperature, setTemperature] = useState<number>(20);
  const [attendees, setAttendees] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);

  const handleSubmit = () => {
    if (!date || !title) return alert('Date and Title are required');
    onSubmit({
      date,
      title,
      content,
      weatherDescription: weatherDesc,
      weatherTemperature: temperature,
      attendees: attendees.split(',').map((s) => s.trim()),
      attachments,
    });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-6 p-4 lg:mx-auto lg:max-w-3xl">
      <div className="space-y-4">
        <Input
          type="date"
          value={date}
          max={today}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Date"
          className="border-[var(--color-border)] bg-[var(--color-input)] text-[var(--color-foreground)]"
        />
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border-[var(--color-border)] bg-[var(--color-input)] text-[var(--color-foreground)]"
        />
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content / Description"
          className="border-[var(--color-border)] bg-[var(--color-input)] text-[var(--color-foreground)]"
        />
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:gap-2">
        <Select value={weatherDesc} onValueChange={setWeatherDesc}>
          <SelectTrigger className="w-full border-[var(--color-border)] bg-[var(--color-input)]">
            <SelectValue placeholder="Weather" />
          </SelectTrigger>
          <SelectContent>
            {weatherOptions.map((w) => (
              <SelectItem key={w} value={w} className="flex items-center gap-2">
                {weatherIconMap[w]}
                {w}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex w-32 items-center gap-2">
          <Input
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            placeholder="Temp"
            className="border-[var(--color-border)] bg-[var(--color-input)] text-[var(--color-foreground)]"
          />
          <span className="text-sm font-medium text-[var(--color-muted-foreground)]">
            °C
          </span>
        </div>
      </div>

      <Input
        value={attendees}
        onChange={(e) => setAttendees(e.target.value)}
        placeholder="Attendees (comma separated)"
        className="border-[var(--color-border)] bg-[var(--color-input)] text-[var(--color-foreground)]"
      />

      <ImageUploader onUploaded={(urls) => setAttachments(urls)} />

      <Button
        className="mt-4 w-full"
        onClick={handleSubmit}
        disabled={isSubmitting}
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-primary-foreground)',
        }}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </div>
  );
};

export default DiaryForm;
