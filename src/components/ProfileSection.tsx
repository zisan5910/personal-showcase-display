
import { Element } from 'react-scroll';
import { Download, ScrollText } from './icons';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface ProfileSectionProps {
  language: 'en' | 'bn';
  content: any;
  scrollToSection: (section: string) => void;
}

const ProfileSection = ({
  language,
  content,
  scrollToSection,
}: ProfileSectionProps) => {
  return (
    <Element name="profile">
      <header className="relative pt-20 pb-16 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100">
        {/* Subtle animated background elements */}
        <motion.div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 2 }}
        >
          <motion.div 
            className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 filter blur-xl"
            animate={{
              scale: [1, 1.1, 1],
              translateX: [-10, 10, -10],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full bg-gradient-to-r from-finance-purple to-finance-deep-purple filter blur-xl"
            animate={{
              scale: [1, 1.05, 1],
              translateY: [0, -10, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="premium-section max-w-4xl mx-auto hover-lift"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Profile Image with subtle animation */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500/20 to-finance-purple/20 animate-pulse"></div>
                <img
                  src="/profile.jpg"
                  alt="Md Ridoan Mahmud Zisan"
                  className="w-48 h-48 rounded-full border-4 border-white shadow-xl object-cover relative z-10"
                />
              </motion.div>

              {/* Profile Content */}
              <motion.div 
                className="flex-1 text-center lg:text-left"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h1 className="premium-title text-center lg:text-left mb-2">
                  {content[language].name}
                </h1>
                <p className="premium-subtitle text-center lg:text-left mb-4 gradient-text">
                  {content[language].role}
                </p>
                <p className="text-slate-600 max-w-2xl mx-auto lg:mx-0 mb-6 leading-relaxed">
                  {content[language].statement}
                </p>

                {/* Action Buttons with consistent styling */}
                <motion.div 
                  className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <motion.a
                    href="/Resume.pdf"
                    download="Md Ridoan Mahmud Zisan.pdf"
                    className="premium-button"
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download size={18} />
                    {content[language].downloadCV}
                  </motion.a>
                  <motion.button
                    onClick={() => scrollToSection('certificates')}
                    className="premium-input border-2 border-finance-purple text-finance-deep-purple font-medium py-2.5 px-5 rounded-lg hover:bg-finance-purple hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ScrollText size={18} />
                    {content[language].certifications}
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </header>
    </Element>
  );
};

export default ProfileSection;
