import { DateTime } from 'luxon';
import type { Timezone } from '../types';

interface TimezoneSliderProps {
  timezone: Timezone;
  dateTime: DateTime;
  onTimeChange: (iana: string, hours: number, minutes: number) => void;
}

export function TimezoneSlider({ timezone, dateTime, onTimeChange }: TimezoneSliderProps) {
  const localTime = dateTime.setZone(timezone.iana);
  const hours = localTime.hour;
  const minutes = localTime.minute;

  const roundedMinutes = Math.round(minutes / 30) * 30;
  const totalHalfHours = hours * 2 + (roundedMinutes / 30);

  const formattedTime = localTime.toFormat('hh:mm a');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTotalHalfHours = parseInt(e.target.value, 10);
    const newHours = Math.floor(newTotalHalfHours / 2);
    const newMinutes = (newTotalHalfHours % 2) * 30;
    onTimeChange(timezone.iana, newHours, newMinutes);
  };

  return (
    <div className="timezone-slider-container">
      <div className="timezone-header">
        <span className="timezone-label">{timezone.label}</span>
        <span className="timezone-time">{formattedTime}</span>
      </div>
      <div className="slider-wrapper">
        <input
          type="range"
          min="0"
          max="47"
          step="1"
          value={totalHalfHours}
          onChange={handleChange}
          className="slider"
          aria-label={`${timezone.label} time slider`}
        />
      </div>
    </div>
  );
}
