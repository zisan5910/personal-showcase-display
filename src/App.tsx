
import { useState, useEffect } from 'react';
import { Element, scroller } from 'react-scroll';
import { UserCircle, School, BookOpen, Briefcase, FileBadge, Code, HeartHandshake, Mail, Share2 } from 'lucide-react';

// Import components
import Navigation from './components/Navigation';
import FloatingMenu from './components/FloatingMenu';
import ProfileSection from './components/ProfileSection';
import CertificateSection from './components/CertificateSection';
import Courses from './components/Courses';
import Skill from './components/Skill';
import Contact from './components/Contact';
import Information from './components/Information';
import Education from './components/Education';
import Experience from './components/Experience';
import Footer from './components/Footer';
import { content, certificates } from './data/content';

function App() {
  const [language, setLanguage] = useState<'en' | 'bn'>('en');
  const [activeSection, setActiveSection] = useState<string>('profile');
  const [age, setAge] = useState<number>(0);

  useEffect(() => {
    const calculateAge = () => {
      const birthDate = new Date('2007-12-31');
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      setAge(age);
    };

    calculateAge();
    const interval = setInterval(calculateAge, 86400000); // Update age daily
    return () => clearInterval(interval);
  }, []);

  const navigationItems = [
    { id: 'profile', icon: <UserCircle size={20} /> },
    { id: 'education', icon: <School size={20} /> },
    { id: 'courses', icon: <BookOpen size={20} /> },
    { id: 'experience', icon: <Briefcase size={20} /> },
    { id: 'certificates', icon: <FileBadge size={20} /> },
    { id: 'skills', icon: <Code size={20} /> },
    { id: 'family', icon: <HeartHandshake size={20} /> },
    { id: 'contact', icon: <Mail size={20} /> },
    { id: 'social-links', icon: <Share2 size={20} />, target: 'footer' }
  ];

  const scrollToSection = (section: string) => {
    scroller.scrollTo(section, {
      duration: 800,
      smooth: true,
      offset: -64,
    });
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navigation 
        navigationItems={navigationItems}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        language={language}
        setLanguage={setLanguage}
      />

      <ProfileSection
        language={language}
        content={content as any}
        scrollToSection={scrollToSection}
      />

      <main className="container mx-auto px-4 py-16 space-y-20 max-w-6xl">
        <Element name="education">
          <div className="premium-section animate-fade-in">
            <Education language={language} />
          </div>
        </Element>

        <Element name="courses">
          <div className="premium-section animate-fade-in">
            <Courses language={language} />
          </div>
        </Element>

        <Element name="experience">
          <div className="premium-section animate-fade-in">
            <Experience language={language} />
          </div>
        </Element>

        <CertificateSection
          language={language}
          content={content}
          certificates={certificates}
        />

        <Element name="skills">
          <div className="premium-section animate-fade-in">
            <Skill language={language} />
          </div>
        </Element>

        <Element name="family">
          <div className="premium-section animate-fade-in">
            <Information language={language} age={age} />
          </div>
        </Element>

        <Element name="contact">
          <div className="premium-section animate-fade-in">
            <Contact language={language} />
          </div>
        </Element>
      </main>

      <Element name="footer">
        <Footer language={language} />
      </Element>

      <FloatingMenu />
    </div>
  );
}

export default App;
