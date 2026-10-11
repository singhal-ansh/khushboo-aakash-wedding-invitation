import { useEffect, useState } from 'react';
const TARGET = new Date('2026-11-24T19:00:00+05:30').getTime();
const calc = () => {
  const ms = Math.max(0, TARGET - Date.now());
  return { d: Math.floor(ms / 864e5), h: Math.floor(ms % 864e5 / 36e5), m: Math.floor(ms % 36e5 / 6e4), s: Math.floor(ms % 6e4 / 1e3), done: ms === 0 };
};
export function useCountdown() {
  const [time, setTime] = useState(calc);
  useEffect(() => { const id = setInterval(() => setTime(calc()), 1000); return () => clearInterval(id); }, []);
  return time;
}
export const toDevanagari = n => String(n).replace(/\d/g, d => '०१२३४५६७८९'[d]);
