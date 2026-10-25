import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Heart, Sparkles } from 'lucide-react';
import { useWedding } from '../context.js';
import { Shell, Eyebrow, Ornament, ButtonLink } from '../components/Shared.jsx';

export default function Invitation() {
  const { t } = useWedding();
  return <Shell className="invitation-page">
    <div className="inner-hero invite-inner-hero"><div className="inner-hero-image invite-image"/><div className="inner-hero-shade"/><motion.div className="inner-hero-copy" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}><Eyebrow light>{t('A LETTER FROM OUR FAMILIES', 'हमारे परिवारों की ओर से')}</Eyebrow><h1>{t('The Invitation', 'शुभ निमंत्रण')}</h1><p>{t('A heartfelt invitation to share our happiness.', 'हमारी खुशियों में शामिल होने का स्नेहपूर्ण निमंत्रण।')}</p></motion.div></div>
    <section className="invitation-letter">
      <div className="letter-corner corner-tl">❋</div><div className="letter-corner corner-tr">❋</div><div className="letter-corner corner-bl">❋</div><div className="letter-corner corner-br">❋</div>
      <div className="letter-ganesh">॥ श्री गणेशाय नमः ॥</div>
      <Eyebrow>{t('WITH THE BLESSINGS OF GOD', 'ईश्वर के आशीर्वाद से')}</Eyebrow>
      <p className="letter-intro">{t('Shri Radha Rani ki aseem anukampa se', 'श्री राधा रानी की असीम अनुकम्पा से')}</p>
      <h2>{t('Smt. Shalini Singhal & Shri Kuldeep Singhal', 'श्रीमती शालिनी सिंघल एवं श्री कुलदीप सिंघल')}</h2>
      <p className="letter-body">{t('request the honour of your gracious presence & blessings on the auspicious occasion of the "WEDDING CEREMONY" of their beloved daughter', 'अपनी प्रिय पुत्री के शुभ विवाह के अवसर पर आपकी गरिमामयी उपस्थिति एवं आशीर्वाद की प्रार्थना करते हैं।')}</p>
      <div className="letter-names"><span>Khushboo</span><p className="letter-family">{t('(Gd/o Late Smt. Santosh Singhal & Late Shri Jai Prakash Singhal)', '(स्वर्गीय श्रीमती संतोष सिंघल एवं स्वर्गीय श्री जय प्रकाश सिंघल की पौत्री)')}</p><small>{t('with', 'संग')}</small><span>Aakash</span></div>

      <p className="letter-family">{t('(S/o Smt. Pooja Agarwal & Shri Sanjay Agarwal)', '(श्रीमती पूजा अग्रवाल एवं श्री संजय अग्रवाल के सुपुत्र)')}</p>
      <Ornament/>
      <div className="letter-date"><span>TUESDAY</span><strong>24</strong><span>NOVEMBER 2026</span></div>
      <p className="letter-blessing">{t('Your presence will add joy and grace to our celebration.', 'आपकी उपस्थिति हमारे उत्सव की शोभा बढ़ाएगी।')}</p>
      <div className="letter-signoff">{t('With love and warm regards', 'स्नेह सहित')}<br/><b>{t('The Singhal & Agarwal Families', 'सिंघल एवं अग्रवाल परिवार')}</b></div>
    </section>
    <section className="invite-bottom"><div className="invite-bottom-photo"/><div><Eyebrow>{t('THE DAY WE BECOME FAMILY', 'परिवार बनने का दिन')}</Eyebrow><h2>{t('We cannot wait to celebrate with you.', 'आपके साथ जश्न मनाने की प्रतीक्षा है।')}</h2><ButtonLink to="/celebrations">{t('View the celebrations', 'कार्यक्रम देखें')}</ButtonLink></div></section>
  </Shell>;
}
