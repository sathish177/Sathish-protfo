import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code, Sun, Moon } from 'lucide-react';
import { navLinks } from '../constants';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { ThemeContext } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const sectionIds = navLinks.map(link => link.href.substring(1));
  const activeId = useScrollSpy(sectionIds, { offset: 100 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header ref={headerRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3 bg-light-surface/80 dark:bg-background/80 backdrop-blur-lg shadow-lg' : 'py-5 bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="#" className="flex items-center space-x-2" onClick={(e) => {
          e.preventDefault();
          window.scrollTo({top: 0, behavior: 'smooth'});
        }}>
          <Code className="text-primary" size={32} />
          <span className="text-xl font-bold tracking-wider text-light-text-primary dark:text-text-primary">Sathish M.</span>
        </a>
        
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className={`relative text-light-text-secondary dark:text-text-secondary hover:text-light-text-primary dark:hover:text-text-primary transition-colors duration-300 ${activeId === link.href.substring(1) ? 'text-primary dark:text-primary' : ''}`}>
              {link.name}
              {activeId === link.href.substring(1) && (
                <motion.div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary" layoutId="underline" />
              )}
            </a>
          ))}
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-light-background/50 dark:hover:bg-surface/50" aria-label="Toggle theme">
              <AnimatePresence mode="wait">
                  <motion.div
                      key={theme}
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                  >
                      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                  </motion.div>
              </AnimatePresence>
          </button>
        </nav>

        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full" aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          </button>
          <button onClick={toggleMenu} aria-label="Toggle menu">
            <Menu size={28} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-light-surface/95 dark:bg-background/95 backdrop-blur-sm"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col">
              <div className="self-end mb-8">
                <button onClick={toggleMenu} aria-label="Close menu">
                  <X size={28} />
                </button>
              </div>
              <nav className="flex flex-col items-center space-y-8">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-2xl text-light-text-secondary dark:text-text-secondary hover:text-light-text-primary dark:hover:text-text-primary transition-colors duration-300"
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: i * 0.1 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;