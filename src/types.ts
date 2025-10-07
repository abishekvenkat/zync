export interface Timezone {
  id: string;
  label: string;
  iana: string;
}

export const TIMEZONES: Timezone[] = [
  { id: 'ist', label: 'India', iana: 'Asia/Kolkata' },
  { id: 'uk', label: 'United Kingdom', iana: 'Europe/London' },
  { id: 'toronto', label: 'Toronto, Canada', iana: 'America/Toronto' },
  { id: 'california', label: 'California, US', iana: 'America/Los_Angeles' },
  { id: 'sweden', label: 'Sweden', iana: 'Europe/Stockholm' },
];
