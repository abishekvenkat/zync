import { useState } from 'react';
import { DateTime } from 'luxon';
import { TimezoneSlider } from './components/TimezoneSlider';
import { TIMEZONES } from './types';
import { Star } from 'lucide-react';

function App() {
  // Keep today's date fixed
  const today = DateTime.now().setZone('Asia/Kolkata');
  const [baseDateTime, setBaseDateTime] = useState<DateTime>(() => today);

  const handleTimeChange = (iana: string, hours: number, minutes: number) => {
    // Always use today's date when creating new DateTime
    const newDateTime = DateTime.fromObject(
      {
        year: today.year,
        month: today.month,
        day: today.day,
        hour: hours,
        minute: minutes,
      },
      { zone: iana }
    );

    const newBase = newDateTime.setZone('Asia/Kolkata');
    setBaseDateTime(newBase);
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1 className="app-title">zynced</h1>
        <p className="app-date">{baseDateTime.toFormat('DDDD')}</p>
      </div>

      <div className="sliders-container">
        {TIMEZONES.map((tz) => (
          <TimezoneSlider
            key={tz.id}
            timezone={tz}
            dateTime={baseDateTime}
            onTimeChange={handleTimeChange}
          />
        ))}
      </div>

      <footer className="footer">
        <a
          href="https://github.com/abishekvenkat/zync"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
          aria-label="Star on GitHub"
        >
          <Star size={14} />
          <span>Star on GitHub</span>
        </a>
      </footer>
    </div>
  );
}

export default App;
