import { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Blog } from './components/sections/Blog';
import { Testimonials } from './components/sections/Testimonials';
import { Contact } from './components/sections/Contact';
import { PinModal } from './components/admin/PinModal';
import { AdminPanel } from './components/admin/AdminPanel';
import { ThemeProvider } from './components/ThemeProvider';
import { usePortfolioData } from './hooks/usePortfolioData';

function App() {
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const {
    data,
    isLoading,
    updateData,
    resetToDefaults,
    exportData,
    importData,
  } = usePortfolioData();

  useEffect(() => {
    // Keyboard shortcut listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'E') {
        e.preventDefault();
        setIsPinModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePinSuccess = () => {
    setIsAdminPanelOpen(true);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data to defaults? This cannot be undone.')) {
      resetToDefaults();
    }
  };

  const sections = [
    { id: 'hero', label: 'Home', visible: data.sectionVisibility.hero },
    { id: 'about', label: 'About', visible: data.sectionVisibility.about },
    { id: 'experience', label: 'Experience', visible: data.sectionVisibility.experience },
    { id: 'projects', label: 'Projects', visible: data.sectionVisibility.projects },
    { id: 'skills', label: 'Skills', visible: data.sectionVisibility.skills },
    { id: 'blog', label: 'Blog', visible: data.sectionVisibility.blog },
    { id: 'testimonials', label: 'Testimonials', visible: data.sectionVisibility.testimonials },
    { id: 'contact', label: 'Contact', visible: data.sectionVisibility.contact },
  ];

  // Show loading state while fetching data
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider theme={data.theme}>
      <div className="min-h-screen bg-white">
        <Header sections={sections} />

        <main>
          {data.sectionVisibility.hero && <Hero data={data.hero} />}
          {data.sectionVisibility.about && <About data={data.about} />}
          {data.sectionVisibility.experience && <Experience data={data.experience} />}
          {data.sectionVisibility.projects && <Projects data={data.projects} />}
          {data.sectionVisibility.skills && <Skills data={data.skills} />}
          {data.sectionVisibility.blog && <Blog data={data.blog} />}
          {data.sectionVisibility.testimonials && <Testimonials data={data.testimonials} />}
          {data.sectionVisibility.contact && <Contact data={data.contact} />}
        </main>

        <Footer social={data.contact.social} />

        <PinModal
          isOpen={isPinModalOpen}
          onClose={() => setIsPinModalOpen(false)}
          onSuccess={handlePinSuccess}
        />

        <AdminPanel
          isOpen={isAdminPanelOpen}
          onClose={() => setIsAdminPanelOpen(false)}
          data={data}
          onUpdate={updateData}
          onReset={handleReset}
          onExport={exportData}
          onImport={importData}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;

