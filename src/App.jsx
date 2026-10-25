import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Routes, Route, useLocation, Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, Languages } from 'lucide-react';
import weddingMusic from './assets/Perfect (Acoustic).mp3';
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
  const [musicOn, setMusicOn] = useState(true);
  const audioRef = useRef(null);
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
    const audio = audioRef.current;
    if (!audio) return;
    const removeResumeListeners = () => {
      window.removeEventListener('pointerdown', resumeAudio);
      window.removeEventListener('keydown', resumeAudio);
    };
    const resumeAudio = () => {
      removeResumeListeners();
      audio.play().catch(error => console.error('Unable to play wedding music:', error));
    };
    if (!musicOn) {
      audio.pause();
      removeResumeListeners();
      return;
    }
    audio.play().catch(error => {
      if (error.name === 'NotAllowedError') {
        window.addEventListener('pointerdown', resumeAudio, { once: true });
        window.addEventListener('keydown', resumeAudio, { once: true });
      } else {
        console.error('Unable to play wedding music:', error);
      }
    });
    return removeResumeListeners;
  }, [musicOn]);

  const finishOpening = () => { try { sessionStorage.setItem('ka-opened', '1'); } catch {} setOpened(true); };
  const days = hindi ? toDevanagari(d) : d;

  return (
    <AppContext.Provider value={{ hindi, setHindi, musicOn, setMusicOn, t }}>
      <audio ref={audioRef} src={weddingMusic} loop preload="auto" onError={() => console.error('Unable to load wedding music.')} />
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
