import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight, Copy, Check, Clock3, CalendarDays, Navigation } from 'lucide-react';
import { useWedding } from '../context.js';
import { Shell, Eyebrow, Ornament, ButtonLink } from '../components/Shared.jsx';

export default function Venue() {
 const { t } = useWedding();
 const [copied, setCopied] = React.useState(false);
 const address = 'Emerald Greens, E-Block, Block D, Swarn Jayanti Puram, Govindpuram, Ghaziabad, Uttar Pradesh 201013';
 const map = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(address);
 const copy = async () => {
   try { await navigator.clipboard.writeText(address); setCopied(true); setTimeout(() => setCopied(false), 1800); }
   catch { window.prompt(t('Copy venue address', 'पता कॉपी करें'), address); }
 };
 return <Shell className="venue-page">
   <div className="inner-hero venue-inner-hero"><div className="inner-hero-image venue-image"/><div className="inner-hero-shade"/><div className="inner-hero-copy"><Eyebrow light>{t('A PLACE FOR OUR FAVOURITE PEOPLE', 'अपने प्रिय लोगों के लिए')}</Eyebrow><h1>{t('The Venue', 'विवाह स्थल')}</h1><p>{t('We’ll meet beneath the lights.', 'रोशनी के बीच मुलाकात होगी।')}</p></div></div>
   <section className="venue-main">
    <motion.div className="venue-details" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .7 }}>
      <Eyebrow>{t('THE PLACE & THE DAY', 'स्थान और दिन')}</Eyebrow><h2>Emerald <em>Greens</em></h2><Ornament/>
      <p className="venue-description">{t('We look forward to welcoming you to a beautiful evening of traditions, family and celebration in Ghaziabad.', 'गाजियाबाद में परंपराओं, परिवार और उत्सव की खूबसूरत शाम में आपका स्वागत करने की प्रतीक्षा है।')}</p>
      <div className="venue-fact"><MapPin/><div><small>{t('ADDRESS', 'पता')}</small><p>{address}</p></div></div>
      <div className="venue-fact"><CalendarDays/><div><small>{t('WEDDING DATE', 'विवाह की तारीख')}</small><p>{t('Tuesday, 24 November 2026', 'मंगलवार, २४ नवंबर २०२६')}</p></div></div>
      <div className="venue-fact"><Clock3/><div><small>{t('CELEBRATIONS BEGIN', 'कार्यक्रम शुरू')}</small><p>{t('7:00 PM · Baraat Arrival', 'शाम ७:०० बजे · बारात आगमन')}</p></div></div>
      <div className="venue-buttons"><a href={map} target="_blank" rel="noreferrer" className="lux-button">{t('Open in Google Maps', 'Google Maps में खोलें')}<ArrowUpRight size={15}/></a><button className="copy-address" onClick={copy}>{copied ? <Check size={15}/> : <Copy size={15}/>} {copied ? t('Copied', 'कॉपी हो गया') : t('Copy address', 'पता कॉपी करें')}</button></div>
    </motion.div>
    <motion.div className="map-panel" initial={{ opacity: 0, scale: .97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .7, delay: .15 }}>
      <iframe title="Map to Emerald Greens, Ghaziabad" src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/>
      <div className="map-caption"><span><Navigation size={14}/> EMERALD GREENS · GHAZIABAD</span><a href={map} target="_blank" rel="noreferrer">{t('Get directions', 'रास्ता देखें')} <ArrowUpRight size={14}/></a></div>
    </motion.div>
   </section>
   <section className="venue-bottom"><Eyebrow light>{t('COME AS YOU ARE, LEAVE WITH MEMORIES', 'आइए खुशियाँ मनाएँ')}</Eyebrow><h2>{t('Your presence means', 'आपकी उपस्थिति')} <em>{t('everything.', 'हमारे लिए सब कुछ है।')}</em></h2><p>{t('We can’t wait to celebrate this special day with you.', 'इस खास दिन को आपके साथ मनाने की प्रतीक्षा है।')}</p></section>
 </Shell>;
}
