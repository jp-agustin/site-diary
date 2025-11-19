import { Cloud, CloudRain, CloudSnow, CloudSun, Sun, Wind } from 'lucide-react';

interface WeatherIconProps {
  description?: string;
  temperature?: number;
  showTemperature?: boolean;
}

const weatherIconMap: Record<string, React.JSX.Element> = {
  sunny: <Sun className="h-5 w-5 text-yellow-500" />,
  rainy: <CloudRain className="h-5 w-5 text-blue-500" />,
  cloudy: <Cloud className="h-5 w-5 text-gray-400" />,
  windy: <Wind className="h-5 w-5 text-teal-400" />,
  'partly cloudy': <CloudSun className="h-5 w-5 text-yellow-400" />,
  snowy: <CloudSnow className="h-5 w-5 text-blue-200" />,
};

const WeatherIcon: React.FC<WeatherIconProps> = ({
  description = 'sunny',
  temperature,
  showTemperature = true,
}) => {
  const key = description.toLowerCase();
  const icon = weatherIconMap[key] ?? <span>N/A</span>;

  return (
    <div className="flex items-center gap-1">
      {icon}
      {showTemperature && temperature !== undefined && (
        <span style={{ color: 'var(--color-muted-foreground)' }}>
          {Math.round(temperature)}°C
        </span>
      )}
    </div>
  );
};

export default WeatherIcon;
