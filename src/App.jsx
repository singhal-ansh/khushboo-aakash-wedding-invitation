import React, { useEffect, useMemo, useState } from 'react';
import { Routes, Route, useLocation, Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, Languages } from 'lucide-react';
import { AppContext } from './context.js';
import { useCountdown, toDevanagari } from './hooks.js';
import { PageTransition, SiteFooter } from './components/Shared.jsx';
import OpeningExperience from './components/OpeningExperience.jsx';
import Home from './pages/Home.jsx';
import Invitation from './pages/Invitation.jsx';
import Celebrations from './pages/Celebrations.jsx';
import Gallery from './pages/Gallery.jsx';
import Venue from './pages/Venue.jsx';

const seen = () => { try { return sessionStorage.getItem('ka-opened') === '1'; } catch { return false; } };

export default function App() {
  const [hindi, setHindi] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [opened, setOpened] = useState(seen);
  const location = useLocation();
  const { d, done } = useCountdown();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const t = useMemo(() => (en, hi) => hindi ? hi : en, [hindi]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); setMenuOpen(false); }, [location.pathname]);
  useEffect(() => { document.documentElement.lang = hindi ? 'hi' : 'en'; }, [hindi]);
  useEffect(() => {
    if (!musicOn) return;
    // Needs a user gesture; starts a soft generated drone after the music button is tapped, with a gentle fade-in.
    let ctx;
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      const master = ctx.createGain(); master.gain.setValueAtTime(0, ctx.currentTime); master.gain.linearRampToValueAtTime(0.018, ctx.currentTime + 2); master.connect(ctx.destination);
      [174.61, 261.63, 349.23].forEach((f, i) => {
        const osc = ctx.createOscillator(); const gain = ctx.createGain();
        osc.type = i === 0 ? 'sine' : 'triangle'; osc.frequency.value = f; gain.gain.value = i === 0 ? 0.55 : 0.2;
        osc.connect(gain); gain.connect(master); osc.start();
      });
    } catch {}
    return () => { if (ctx && ctx.state !== 'closed') ctx.close(); };
  }, [musicOn]);

  const finishOpening = () => { try { sessionStorage.setItem('ka-opened', '1'); } catch {} setOpened(true); };
  const days = hindi ? toDevanagari(d) : d;

  return (
    <AppContext.Provider value={{ hindi, setHindi, musicOn, setMusicOn, t }}>
      {!opened && <OpeningExperience onOpen={finishOpening} />}
      <div className={`app-shell ${opened ? 'app-visible' : 'app-hidden'}`}>
        <motion.div className="reading-progress" style={{ scaleX: progress }} />
        <div className="announcement"><span aria-hidden="true">✦</span>{done ? t('Today is the wedding day', 'आज विवाह का दिन है') : t(`${d} days to go · 24 November 2026`, `${days} दिन शेष · २४ नवंबर २०२६`)}<span aria-hidden="true">✦</span></div>
        <header className="site-header">
          <Link to="/" className="wordmark" aria-label={t('Home', 'मुख्य पृष्ठ')}><span>K<span className="amp">&</span>A</span><small>{t('The Wedding', 'विवाह')}</small></Link>
          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X/> : <Menu/>}</button>
          <nav className={menuOpen ? 'main-nav nav-visible' : 'main-nav'}>
            <NavLink to="/invitation">{t('Invitation', 'निमंत्रण')}</NavLink>
            <NavLink to="/celebrations">{t('Celebrations', 'शुभ अवसर')}</NavLink>
            <NavLink to="/gallery">{t('Gallery', 'तस्वीरें')}</NavLink>
            <NavLink to="/venue">{t('The Venue', 'विवाह स्थल')}</NavLink>
          </nav>
          <div className="header-tools">
            <button className="tool-button" onClick={() => setHindi(!hindi)} aria-label={hindi ? 'Switch to English' : 'हिन्दी में देखें'}><Languages size={16}/><span>{hindi ? 'EN' : 'हि'}</span></button>
            <button className="tool-button music-button" onClick={() => setMusicOn(!musicOn)} aria-pressed={musicOn} aria-label={musicOn ? 'Turn music off' : 'Turn music on'}>{musicOn ? <Volume2 size={16}/> : <VolumeX size={16}/>}<span>{t('Music', 'संगीत')}</span></button>
          </div>
        </header>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home/></PageTransition>} />
            <Route path="/invitation" element={<PageTransition><Invitation/></PageTransition>} />
            <Route path="/celebrations" element={<PageTransition><Celebrations/></PageTransition>} />
            <Route path="/gallery" element={<PageTransition><Gallery/></PageTransition>} />
            <Route path="/venue" element={<PageTransition><Venue/></PageTransition>} />
            <Route path="*" element={<PageTransition><Home/></PageTransition>} />
          </Routes>
        </AnimatePresence>
        <SiteFooter/>
      </div>
    </AppContext.Provider>
  );
}
