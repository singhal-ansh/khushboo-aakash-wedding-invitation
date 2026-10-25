import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Clock3, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWedding } from '../context.js';
import { useCountdown, toDevanagari } from '../hooks.js';
import { events } from '../data.js';
import { ButtonLink, Eyebrow, Ornament, Garland, Petals } from '../components/Shared.jsx';

function Countdown() {
  const { hindi, t } = useWedding();
  const { d, h, m, s, done } = useCountdown();
  if (done) return <p className="countdown-done">{t('Today, two families become one.', 'आज दो परिवार एक हो रहे हैं।')}</p>;
  const labels = hindi ? ['दिन', 'घंटे', 'मिनट', 'सेकंड'] : ['Days', 'Hours', 'Minutes', 'Seconds'];
  return <div className="countdown-row">{[d, h, m, s].map((n, i) => <div className="countdown-unit" key={i}><strong>{hindi ? toDevanagari(String(n).padStart(2, '0')) : String(n).padStart(2, '0')}</strong><span>{labels[i]}</span></div>)}</div>;
}

export default function Home() {
  const { t, hindi } = useWedding();
  return <>
    <section className="home-hero">
      <div className="hero-photo"/><div className="hero-vignette"/><div className="hero-jaali"/>
      <Garland/><Petals/>
      <motion.div className="hero-arch" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: .2 }}>
        <div className="ganesh-mark" aria-hidden="true">ॐ</div>
        <Eyebrow light>{t('WITH THE BLESSINGS OF GOD', 'ईश्वर के आशीर्वाद से')}</Eyebrow>
        <p className="hero-small">{t('Together with our families', 'अपने परिवारों के साथ')}</p>
        <h1 className="hero-names"><span>Khushboo</span><small>{t('weds', 'विवाह')}</small><span>Aakash</span></h1>
        <Ornament className="hero-ornament"/>
        <p className="hero-date">{t('Tuesday · 24 November 2026', 'मंगलवार · २४ नवंबर २०२६')}</p>
        <p className="hero-place"><MapPin size={15}/> {t('Emerald Greens, Ghaziabad', 'एमराल्ड ग्रीन्स, गाजियाबाद')}</p>
        <Link to="/invitation" className="hero-enter">{t('Enter the celebration', 'उत्सव में पधारें')} <ArrowDown size={16}/></Link>
      </motion.div>
    </section>

    <section className="welcome-section">
      <div className="welcome-photo-wrap"><motion.div className="welcome-photo" initial={{ scale: 1.06 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }}/><div className="welcome-seal" aria-hidden="true">K<span>&</span>A</div></div>
      <div className="welcome-copy">
        <Eyebrow>{t('A JOYOUS UNION', 'एक मंगल मिलन')}</Eyebrow>
        <h2>{t('Some stories are written in the stars.', 'कुछ कहानियाँ सितारों में लिखी होती हैं।')} <em>{t('Ours begins here.', 'हमारी शुरुआत यहाँ से है।')}</em></h2>
        <Ornament/>
        <p>{t('With the blessings of God and the love of our families, we invite you to be part of the beginning of our forever. A celebration of two hearts, two families, and a lifetime of memories waiting to be made.', 'ईश्वर के आशीर्वाद और परिवारों के स्नेह के साथ, हम आपको अपने नए जीवन की शुरुआत का हिस्सा बनने के लिए आमंत्रित करते हैं। दो दिलों, दो परिवारों और जीवन भर की यादों का उत्सव।')}</p>
        <ButtonLink to="/invitation">{t('Read our invitation', 'निमंत्रण पढ़ें')}</ButtonLink>
      </div>
    </section>

    <section className="countdown-panel">
      <div className="countdown-bg"/>
      <div className="countdown-inner">
        <Eyebrow light>{t('THE MOMENT WE HAVE BEEN WAITING FOR', 'उस पल की प्रतीक्षा')}</Eyebrow>
        <h2>{t('Until forever begins', 'हमेशा की शुरुआत तक')}</h2>
        <Countdown/>
        <p>{t('A day filled with blessings, laughter and love.', 'आशीर्वाद, हँसी और प्यार से भरा एक दिन।')}</p>
      </div>
    </section>

    <section className="home-events">
      <div className="home-events-head"><div><Eyebrow>{t('MARK YOUR CALENDAR', 'तारीख याद रखें')}</Eyebrow><h2>{t('The celebration', 'शुभ अवसर')} <em>{t('unfolds', 'शुरू होते हैं')}</em></h2></div><ButtonLink to="/celebrations">{t('Explore all events', 'सभी कार्यक्रम')}</ButtonLink></div>
      <div className="home-event-grid">
        {events.map(e => <Link to="/celebrations" className="home-event-card" key={e.id}><span className="event-num">{e.n}</span><span className="event-date">{hindi ? e.shortHi : e.shortEn}</span><h3>{hindi ? e.titleHi : e.titleEn}</h3><span className="event-clock"><Clock3 size={14}/>{hindi ? e.timeHi : e.timeEn}</span><ArrowUpRight className="event-arrow" size={18}/></Link>)}
      </div>
    </section>

    <section className="home-gallery-tease">
      <div className="gallery-tease-image"/>
      <div className="gallery-tease-copy"><Eyebrow light>{t('LITTLE GLIMPSES OF LOVE', 'प्यार की कुछ झलकियाँ')}</Eyebrow><h2>{t('Moments that become', 'वो पल जो बन जाते हैं')} <em>{t('memories.', 'यादें।')}</em></h2><p>{t('A small collection of moments, details and the magic surrounding our special day.', 'कुछ खास पलों, खूबसूरत विवरणों और हमारे विशेष दिन के जादू का संग्रह।')}</p><ButtonLink to="/gallery" light>{t('Visit the gallery', 'तस्वीरें देखें')}</ButtonLink></div>
    </section>

    <section className="final-invite"><p>{t('The honour of your presence is our greatest gift', 'आपकी उपस्थिति ही हमारा सबसे बड़ा उपहार है')}</p><h2>Khushboo <em>&</em> Aakash</h2><Link to="/venue">{t('Find your way to us', 'हम तक पहुँचें')} <ArrowUpRight size={15}/></Link></section>
  </>;
}
