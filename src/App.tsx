import { useState } from 'react';
import { DateTime } from 'luxon';
import { TimezoneSlider } from './components/TimezoneSlider';
import { TIMEZONES } from './types';
import { Star } from 'lucide-react';

function App() {
  const [baseDateTime, setBaseDateTime] = useState<DateTime>(() =>
    DateTime.now().setZone('Asia/Kolkata')
  );

  const referenceDate = baseDateTime.toISODate() || '';

  const handleTimeChange = (iana: string, hours: number, minutes: number) => {
    const newDateTime = DateTime.fromObject(
      {
        year: baseDateTime.year,
        month: baseDateTime.month,
        day: baseDateTime.day,
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
        <h1 className="app-title">zync</h1>
        <p className="app-date">{baseDateTime.toFormat('DDDD')}</p>
      </div>

      <div className="sliders-container">
        {TIMEZONES.map((tz) => (
          <TimezoneSlider
            key={tz.id}
            timezone={tz}
            dateTime={baseDateTime}
            referenceDate={referenceDate}
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
