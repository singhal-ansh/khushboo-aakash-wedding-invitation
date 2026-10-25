import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, Expand } from 'lucide-react';
import { useWedding } from '../context.js';
import { Shell, Eyebrow, Ornament } from '../components/Shared.jsx';

const photos = Object.entries(import.meta.glob('../assets/gallery/*.{png,jpg,jpeg,webp,avif}', {
 eager: true,
 query: '?url',
 import: 'default'
}))
 .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
 .map(([path, src]) => ({
   src,
   title: path.split('/').pop().replace(/\.[^.]+$/, ''),
   category: 'A MOMENT TO TREASURE'
 }));

export default function Gallery() {
 const { t } = useWedding();
 const [active, setActive] = useState(null);
 const next = () => setActive(a => (a + 1) % photos.length);
 const prev = () => setActive(a => (a + photos.length - 1) % photos.length);
 useEffect(() => {
   if (active === null) return;
   const onKey = e => { if (e.key === 'Escape') setActive(null); if (e.key === 'ArrowRight') next(); if (e.key === 'ArrowLeft') prev(); };
   const prevOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden';
   window.addEventListener('keydown', onKey);
   return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prevOverflow; };
 }, [active]);
 const hideBroken = e => { e.currentTarget.style.visibility = 'hidden'; };
 return <Shell className="gallery-page">
   <div className="inner-hero gallery-inner-hero"><div className="inner-hero-image gallery-image"/><div className="inner-hero-shade"/><div className="inner-hero-copy"><Eyebrow light>{t('A VISUAL LOVE LETTER', 'तस्वीरों में एक प्रेम कहानी')}</Eyebrow><h1>{t('The Gallery', 'तस्वीरें')}</h1><p>{t('Beautiful details. Moments to keep.', 'खूबसूरत पल, हमेशा के लिए।')}</p></div></div>
   <section className="gallery-intro"><Eyebrow>{t('A FEW FRAMES OF FOREVER', 'हमेशा के कुछ पल')}</Eyebrow><h2>{t('Love lives in the', 'प्यार बसता है')} <em>{t('little things.', 'छोटी-छोटी बातों में।')}</em></h2><p>{t('A glimpse of the warmth, colour and romance of an Indian wedding.', 'भारतीय विवाह की गर्मजोशी, रंगों और रोमांस की झलक।')}</p><Ornament/></section>
   <section className="gallery-grid">
    {photos.map((photo, i) => <motion.button key={photo.src} className="gallery-tile" onClick={() => setActive(i)} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .1 }} transition={{ duration: .6, delay: (i%3)*.08 }} whileHover={{ y: -5 }}>
      <img src={photo.src} alt={photo.title} loading="lazy" onError={hideBroken}/><span className="gallery-tile-overlay"><small>{photo.category}</small><strong>{photo.title}</strong><Expand size={16}/></span>
    </motion.button>)}
   </section>
   <section className="gallery-note"><span>✦</span><p>{t('With love, from our families to yours.', 'हमारे परिवारों की ओर से, स्नेह सहित।')}</p><span>✦</span></section>
   {createPortal(<AnimatePresence>{active !== null && <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}>
     <button className="lightbox-close" aria-label="Close image" onClick={() => setActive(null)}><X/></button>
     <button className="lightbox-prev" aria-label="Previous image" onClick={e => {e.stopPropagation(); prev();}}><ArrowLeft/></button>
     <motion.div className="lightbox-content" key={active} initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} onClick={e => e.stopPropagation()}><img src={photos[active].src} alt={photos[active].title}/><div><small>{photos[active].category}</small><h3>{photos[active].title}</h3><span className="lightbox-count">{active + 1} / {photos.length}</span></div></motion.div>
     <button className="lightbox-next" aria-label="Next image" onClick={e => {e.stopPropagation(); next();}}><ArrowRight/></button>
   </motion.div>}</AnimatePresence>, document.body)}
 </Shell>;
}
