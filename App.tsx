import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Achievements from './components/Achievements';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ImageEditor from './components/ImageEditor';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-light-background dark:bg-background font-sans overflow-x-hidden">
      <motion.div className="progress-bar fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[100]" style={{ scaleX }} />
      <Header />
      <main>
        <Hero />
        <About />
        <Achievements />
        <Skills />
        <Experience />
        <Projects />
        <ImageEditor />
        <Education />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-primary hover:bg-violet-500 text-white rounded-full p-3 shadow-lg z-50 transition-colors duration-300"
            aria-label="Back to top"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;