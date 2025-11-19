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
}

const weatherOptions = [
  'sunny',
  'rainy',
  'cloudy',
  'windy',
  'partly cloudy',
  'snowy',
];

const DiaryForm: React.FC<DiaryFormProps> = ({ onSubmit }) => {
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

  return (
    <div className="space-y-4 p-4">
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Date"
      />
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content / Description"
      />
      <Input
        type="number"
        value={temperature}
        onChange={(e) => setTemperature(Number(e.target.value))}
        placeholder="Temperature (°C)"
      />
      <Select value={weatherDesc} onValueChange={setWeatherDesc}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Weather" />
        </SelectTrigger>
        <SelectContent>
          {weatherOptions.map((w) => (
            <SelectItem key={w} value={w}>
              {w}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        value={attendees}
        onChange={(e) => setAttendees(e.target.value)}
        placeholder="Attendees (comma separated)"
      />
      <ImageUploader onUploaded={(urls) => setAttachments(urls)} />
      <Button className="mt-4 w-full" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default DiaryForm;
