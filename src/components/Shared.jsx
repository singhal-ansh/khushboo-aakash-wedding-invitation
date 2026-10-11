import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { useWedding } from '../context.js';

export function PageTransition({ children }) {
  return <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .45, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
export function Shell({ children, className = '' }) { return <section className={`page-shell ${className}`}>{children}</section>; }

// Source strings are written in capitals; show them in readable sentence case.
const soften = c => typeof c === 'string' && /^[A-Z0-9 &'’,.·-]+$/.test(c)
  ? (c.charAt(0) + c.slice(1).toLowerCase()).replace(/\bgod\b/, 'God') : c;
export function Eyebrow({ children, light = false }) {
  return <p className={`eyebrow ${light ? 'eyebrow-light' : ''}`}><span aria-hidden="true"/>{soften(children)}<span aria-hidden="true"/></p>;
}
export function Ornament({ className = '' }) { return <div className={`ornament ${className}`} aria-hidden="true"><i/><span>✦</span><b>❋</b><span>✦</span><i/></div>; }
export function ButtonLink({ to, children, light = false, className = '' }) {
  return <Link className={`lux-button ${light ? 'lux-button-light' : ''} ${className}`} to={to}>{children}<ArrowRight size={16}/></Link>;
}

// Marigold toran: a swag across the top with swaying strands. Pure CSS, no images.
export function Garland() {
  const swag = Array.from({ length: 56 }, (_, i) => { const t = i / 55; return <i key={i} style={{ left: `${t * 100}%`, top: `${4 * 44 * t * (1 - t)}px`, '--c': i % 3 ? '#e9922f' : '#f6c453' }}/>; });
  const drops = [[6, 7, 0], [15, 5, -1.6], [85, 5, -.8], [94, 8, -2.4]];
  return <div className="garland" aria-hidden="true">
    <div className="garland-swag">{swag}</div>
    {drops.map(([x, n, d]) => <div className="drop" key={x} style={{ left: `${x}%`, '--d': `${d}s` }}>{Array.from({ length: n }, (_, i) => <i key={i} style={{ '--c': i % 2 ? '#e9922f' : '#f6c453' }}/>)}</div>)}
  </div>;
}
export function Petals() { return <div className="petals" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <i key={i} style={{ '--i': i }}/>)}</div>; }

export function SiteFooter() {
  const { t } = useWedding();
  return <footer className="site-footer">
    <div className="footer-monogram">K<span>&</span>A</div>
    <p>{t('Two families, one beautiful beginning.', 'दो परिवार, एक खूबसूरत शुरुआत।')}</p>
    <Ornament className="footer-ornament"/>
    <div className="footer-meta"><span>{t('24 November 2026', '२४ नवंबर २०२६')}</span><span>{t('Emerald Greens, Ghaziabad', 'एमराल्ड ग्रीन्स, गाजियाबाद')}</span></div>
    <div className="footer-love"><Heart size={13} fill="currentColor"/> {t('Made with love for Khushboo & Aakash', 'खुशबू और आकाश के लिए प्यार से')}</div>
  </footer>;
}
