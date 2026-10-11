import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useCountdown } from '../hooks.js';

export default function OpeningExperience({ onOpen }) {
  const { d, h, m, s } = useCountdown();
  const [opening, setOpening] = useState(false);
  const [siteRevealing, setSiteRevealing] = useState(false);
  const [complete, setComplete] = useState(false);
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const open = () => {
    if (opening) return;
    setOpening(true);
    // Fade the site in during the gate movement, then remove the overlay after the welcome reveal.
    timers.current = [
      setTimeout(() => setSiteRevealing(true), 850),
      setTimeout(onOpen, 950),
      setTimeout(() => setComplete(true), 1900),
    ];
  };
  if (complete) return null;
  return <div className={`opening-experience ${opening ? 'opening-active' : ''} ${siteRevealing ? 'site-revealing' : ''}`} role="dialog" aria-label="Wedding invitation">
    <div className="opening-backdrop" aria-hidden="true" />
    <div className="opening-stars" aria-hidden="true">{Array.from({ length: 24 }, (_, i) => <i key={i} style={{ '--i': i }} />)}</div>
    <div className="opening-heading"><span>ॐ</span><p>WITH THE BLESSINGS OF GOD</p></div>
    <div className="envelope-scene"><div className="envelope-glow"/><div className="envelope">
      <div className="envelope-back"/><div className="envelope-letter"><small>THE WEDDING CELEBRATION OF</small><strong>Khushboo</strong><i>WEDS</i><strong>Aakash</strong><span>24 · 11 · 2026</span></div>
      <div className="envelope-flap"/><div className="envelope-front"/><div className="envelope-fold-left"/><div className="envelope-fold-right"/>
      <button className="wax-seal" onClick={open} disabled={opening} autoFocus aria-label="Open wedding invitation"><span>K<em>&</em>A</span><i/></button>
    </div></div>
    <div className="opening-copy"><p className="opening-kicker">YOU ARE CORDIALLY INVITED</p><h1><span>Khushboo</span><em>WEDS</em><span>Aakash</span></h1>
      <div className="opening-date"><b>✦</b> TUESDAY, 24 NOVEMBER 2026 <b>✦</b></div>
      <button className="open-invitation-button" onClick={open} disabled={opening}><Sparkles size={14}/>{opening ? 'OPENING YOUR INVITATION…' : 'TAP THE SEAL TO OPEN'}<Sparkles size={14}/></button>
      <div className="opening-countdown-label">COUNTING DOWN TO THE WEDDING</div>
      <div className="opening-countdown">{[d, h, m, s].map((v, i) => <div className="opening-countdown-unit" key={i}><strong>{String(v).padStart(2, '0')}</strong><span>{['DAYS', 'HOURS', 'MINUTES', 'SECONDS'][i]}</span></div>)}</div>
      <p className="opening-venue">EMERALD GREENS · GHAZIABAD, INDIA</p>
    </div>
    <div className="gate-reveal" aria-hidden="true"><div className="gate-panel gate-left"><div className="gate-pattern"><span>❋</span><b>K</b><span>✦</span></div></div><div className="gate-panel gate-right"><div className="gate-pattern"><span>❋</span><b>A</b><span>✦</span></div></div><div className="gate-center-glow"/><div className="gate-message"><span>WELCOME TO THE CELEBRATION</span><strong>Khushboo <i>&</i> Aakash</strong></div></div>
  </div>;
}
