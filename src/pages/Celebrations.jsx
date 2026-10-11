import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Clock3, Music2, Flower2, Utensils, Heart, ArrowRight } from 'lucide-react';
import { useWedding } from '../context.js';
import { events } from '../data.js';
import { Shell, Eyebrow, ButtonLink } from '../components/Shared.jsx';

const icons = { baraat: Music2, welcome: Flower2, dinner: Utensils, doli: Heart };

export default function Celebrations() {
 const { t, hindi } = useWedding();
 return <Shell className="celebrations-page">
   <div className="inner-hero events-inner-hero"><div className="inner-hero-image events-image"/><div className="inner-hero-shade"/><div className="inner-hero-copy"><Eyebrow light>{t('A DAY OF JOY & TOGETHERNESS', 'खुशी और अपनापन')}</Eyebrow><h1>{t('The Celebrations', 'शुभ अवसर')}</h1><p>{t('Every ritual, every smile, every memory.', 'हर रस्म, हर मुस्कान, हर याद।')}</p></div></div>
   <section className="events-page-intro"><Eyebrow>{t('THE WEDDING TIMELINE', 'विवाह कार्यक्रम')}</Eyebrow><h2>{t('A beautiful day,', 'एक खूबसूरत दिन,')} <em>{t('moment by moment.', 'हर पल खास।')}</em></h2><p>{t('Join us for an evening of traditions, blessings and celebration. Times are shown as printed on the invitation.', 'परंपराओं, आशीर्वाद और उत्सव की शाम में हमारे साथ शामिल हों। समय निमंत्रण पत्र के अनुसार हैं।')}</p></section>
   <section className="timeline">
     <div className="timeline-spine"/>
     {events.map((item, i) => <motion.article key={item.n} className={`timeline-item ${i%2 ? 'timeline-right' : ''}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .7, delay: .08 }}>
       <div className="timeline-dot">{item.n}</div>
       <div className="timeline-card"><div className="timeline-card-top"><span>{hindi ? item.dayHi : item.dayEn}</span>{React.createElement(icons[item.id], { size: 22 })}</div><h3>{hindi ? item.titleHi : item.titleEn}</h3><div className="timeline-time"><Clock3 size={15}/>{hindi ? item.timeHi : item.timeEn}</div><p>{hindi ? item.descHi : item.descEn}</p></div>
     </motion.article>)}
   </section>
   <div className="events-note"><CalendarDays size={18}/><p>{t('The Doli time is not specified on the printed invitation. Please confirm with the family before the day.', 'मुद्रित निमंत्रण में डोली का समय नहीं दिया गया है। कृपया परिवार से पुष्टि करें।')}</p></div>
   <section className="events-bottom"><Eyebrow light>{t('WE LOOK FORWARD TO SEEING YOU', 'आपसे मिलने की प्रतीक्षा है')}</Eyebrow><h2>{t('Come for the rituals.', 'रस्मों के लिए आइए।')} <em>{t('Stay for the memories.', 'यादों के लिए रुकिए।')}</em></h2><ButtonLink to="/venue" light>{t('Explore the venue', 'विवाह स्थल देखें')}</ButtonLink></section>
 </Shell>;
}
