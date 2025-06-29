
import { useState, useEffect } from 'react';
import { Menu, X, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface NavigationProps {
  navigationItems: Array<{
    id: string;
    icon: JSX.Element;
    target?: string;
  }>;
  activeSection: string;
  scrollToSection: (section: string) => void;
  language: 'en' | 'bn';
  setLanguage: (lang: 'en' | 'bn') => void;
}

const Navigation = ({
  navigationItems,
  activeSection,
  scrollToSection,
  language,
  setLanguage,
}: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { ref } = useInView({
    threshold: 0,
    initialInView: true,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const getIconColor = (id: string): string => {
    const colors: Record<string, string> = {
      profile: 'text-indigo-500',
      education: 'text-blue-500',
      courses: 'text-emerald-500',
      experience: 'text-amber-500',
      certificates: 'text-red-500',
      skills: 'text-purple-500',
      family: 'text-pink-500',
      contact: 'text-cyan-500',
      'social-links': 'text-teal-500',
    };
    return colors[id] || 'text-gray-500';
  };

  return (
    <motion.nav
      ref={ref}
      initial={{ y: -100 }}
      animate={{
        y: 0,
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.90)',
        boxShadow: isScrolled ? '0 8px 32px rgba(0, 0, 0, 0.12)' : '0 2px 8px rgba(0, 0, 0, 0.05)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed w-full z-50 transition-all duration-300 backdrop-blur-xl border-b border-gray-200/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100/80 focus:outline-none transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMenuOpen ? 'close' : 'menu'}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ 
                  scale: 1.02,
                  y: -1,
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection(item.target || item.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                  activeSection === (item.target || item.id)
                    ? 'bg-white/80 text-gray-900 shadow-lg ring-1 ring-gray-200/50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                }`}
              >
                <motion.div
                  animate={{
                    rotate: activeSection === (item.target || item.id) ? 360 : 0,
                    scale: activeSection === (item.target || item.id) ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.5, ease: "backOut" }}
                  className={`w-5 h-5 ${getIconColor(item.id)}`}
                >
                  {item.icon}
                </motion.div>
                <span className="font-medium text-sm tracking-wide">
                  {item.id.charAt(0).toUpperCase() + item.id.slice(1).replace('-', ' ')}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Language Toggle Button */}
          <motion.button
            whileHover={{ 
              scale: 1.05,
              y: -1,
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
            className="p-2.5 rounded-xl transition-all duration-300 text-purple-600 hover:text-purple-700 border border-purple-200 hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400/30 bg-purple-50/70 hover:bg-purple-100/70"
            aria-label="Toggle language"
          >
            <motion.div
              key={language}
              initial={{ rotate: 0 }}
              animate={{ rotate: language === 'en' ? 0 : 180 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <Languages size={18} />
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: 1, 
                height: 'auto',
              }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50 rounded-b-2xl shadow-xl"
            >
              <div className="px-3 pt-3 pb-4 space-y-1">
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { 
                        delay: index * 0.05,
                        type: 'spring',
                        stiffness: 300,
                        damping: 20
                      }
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      scrollToSection(item.target || item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeSection === (item.target || item.id)
                        ? 'bg-gray-100/80 text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100/50 hover:text-gray-900'
                    }`}
                  >
                    <motion.div
                      animate={{
                        rotate: activeSection === (item.target || item.id) ? 360 : 0,
                      }}
                      transition={{ duration: 0.5 }}
                      className={`w-5 h-5 ${getIconColor(item.id)}`}
                    >
                      {item.icon}
                    </motion.div>
                    <span className="font-medium text-sm">
                      {item.id.charAt(0).toUpperCase() + item.id.slice(1).replace('-', ' ')}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
