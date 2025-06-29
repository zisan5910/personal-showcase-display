
import { Element } from 'react-scroll';
import { Download, ScrollText } from './icons';
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
      <header className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-slate-100/50">
        {/* Enhanced background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10 filter blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [-20, 20, -20],
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-emerald-400/10 to-teal-400/10 filter blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              x: [10, -10, 10],
              y: [15, -15, 15],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <motion.div 
            className="premium-section hover-lift"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Enhanced Profile Image */}
              <motion.div 
                className="relative group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 animate-pulse-slow group-hover:animate-none transition-all duration-500"></div>
                <div className="absolute inset-2 rounded-full bg-gradient-to-r from-white/50 to-white/30 backdrop-blur-sm"></div>
                <img
                  src="/profile.jpg"
                  alt="Md Ridoan Mahmud Zisan"
                  className="w-56 h-56 lg:w-64 lg:h-64 rounded-full border-4 border-white/80 shadow-2xl object-cover relative z-10 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 rounded-full ring-1 ring-gray-200/50 group-hover:ring-2 group-hover:ring-blue-300/50 transition-all duration-500"></div>
              </motion.div>

              {/* Enhanced Profile Content */}
              <motion.div 
                className="flex-1 text-center lg:text-left max-w-2xl"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {content[language].name}
                </motion.h1>
                
                <motion.p 
                  className="text-xl md:text-2xl font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  {content[language].role}
                </motion.p>
                
                <motion.p 
                  className="text-gray-600 text-lg leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                >
                  {content[language].statement}
                </motion.p>

                {/* Enhanced Action Buttons */}
                <motion.div 
                  className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <motion.a
                    href="/Resume.pdf"
                    download="Md Ridoan Mahmud Zisan.pdf"
                    className="premium-button group"
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download size={20} className="group-hover:animate-bounce" />
                    {content[language].downloadCV}
                  </motion.a>
                  
                  <motion.button
                    onClick={() => scrollToSection('certificates')}
                    className="px-6 py-3 border-2 border-purple-200 text-purple-700 font-medium rounded-xl hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 flex items-center justify-center gap-2 group backdrop-blur-sm"
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ScrollText size={20} className="group-hover:rotate-12 transition-transform duration-300" />
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
