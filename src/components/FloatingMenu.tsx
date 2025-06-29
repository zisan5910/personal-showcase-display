
import React, { useState, useEffect } from 'react';
import { ChevronUp, Sun, Moon, Palette, Type, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [colorScheme, setColorScheme] = useState<'default' | 'blue' | 'green' | 'purple'>('default');

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const changeFontSize = () => {
    const sizes = ['small', 'medium', 'large'] as const;
    const currentIndex = sizes.indexOf(fontSize);
    const nextSize = sizes[(currentIndex + 1) % sizes.length];
    setFontSize(nextSize);
    
    const sizeClasses = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg'
    };
    
    document.documentElement.className = document.documentElement.className
      .replace(/text-(sm|base|lg)/, sizeClasses[nextSize]);
  };

  const changeColorScheme = () => {
    const schemes = ['default', 'blue', 'green', 'purple'] as const;
    const currentIndex = schemes.indexOf(colorScheme);
    const nextScheme = schemes[(currentIndex + 1) % schemes.length];
    setColorScheme(nextScheme);
  };

  const menuItems = [
    {
      icon: <Sun size={18} />,
      label: 'Toggle Theme',
      action: toggleTheme,
      active: theme === 'dark'
    },
    {
      icon: <Type size={18} />,
      label: 'Font Size',
      action: changeFontSize,
      active: fontSize !== 'medium'
    },
    {
      icon: <Palette size={18} />,
      label: 'Color Scheme',
      action: changeColorScheme,
      active: colorScheme !== 'default'
    }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="flex flex-col items-end space-y-3">
            {/* Menu Items */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="flex flex-col space-y-2 mb-2"
                >
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        transition: { delay: index * 0.1 }
                      }}
                      exit={{ opacity: 0, x: 20 }}
                      onClick={item.action}
                      className={`p-3 rounded-full shadow-lg transition-all duration-300 backdrop-blur-md ${
                        item.active 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white/90 text-gray-700 hover:bg-white hover:text-blue-500'
                      }`}
                      title={item.label}
                    >
                      {item.icon}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Menu Button */}
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors duration-300 backdrop-blur-md"
                title="Accessibility Options"
              >
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Zap size={20} />
                </motion.div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={scrollToTop}
                className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300 backdrop-blur-md"
                title="Back to Top"
              >
                <ChevronUp size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingMenu;
