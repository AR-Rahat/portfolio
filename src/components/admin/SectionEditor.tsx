import { useState } from 'react';
import { PortfolioData } from '../../types/portfolio';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface SectionEditorProps {
  data: PortfolioData;
  onUpdate: (data: Partial<PortfolioData>) => void;
}

type SectionName = 'hero' | 'about' | 'experience' | 'projects' | 'skills' | 'blog' | 'testimonials' | 'contact';

export function SectionEditor({ data, onUpdate }: SectionEditorProps) {
  const [activeSection, setActiveSection] = useState<SectionName>('hero');

  const toggleSectionVisibility = (section: SectionName) => {
    onUpdate({
      sectionVisibility: {
        ...data.sectionVisibility,
        [section]: !data.sectionVisibility[section],
      },
    });
  };

  const sections: Array<{ id: SectionName; label: string }> = [
    { id: 'hero', label: 'Hero' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'blog', label: 'Blog' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  const renderEditor = () => {
    switch (activeSection) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={data.hero.name}
                onChange={(e) => onUpdate({ hero: { ...data.hero, name: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={data.hero.title}
                onChange={(e) => onUpdate({ hero: { ...data.hero, title: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subtitle</label>
              <input
                type="text"
                value={data.hero.subtitle}
                onChange={(e) => onUpdate({ hero: { ...data.hero, subtitle: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CTA Text</label>
              <input
                type="text"
                value={data.hero.ctaText}
                onChange={(e) => onUpdate({ hero: { ...data.hero, ctaText: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CTA Link</label>
              <input
                type="text"
                value={data.hero.ctaLink}
                onChange={(e) => onUpdate({ hero: { ...data.hero, ctaLink: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
              />
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={data.about.title}
                onChange={(e) => onUpdate({ about: { ...data.about, title: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                value={data.about.bio}
                onChange={(e) => onUpdate({ about: { ...data.about, bio: e.target.value } })}
                rows={5}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-600 outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Highlights (one per line)</label>
              <textarea
                value={data.about.highlights.join('\n')}
                onChange={(e) => onUpdate({ about: { ...data.about, highlights: e.target.value.split('\n').filter(h => h.trim()) } })}
                rows={4}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-600 outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Resume Link (optional)</label>
              <input
                type="text"
                value={data.about.resumeLink || ''}
                onChange={(e) => onUpdate({ about: { ...data.about, resumeLink: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
              />
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={data.contact.title}
                onChange={(e) => onUpdate({ contact: { ...data.contact, title: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subtitle</label>
              <input
                type="text"
                value={data.contact.subtitle}
                onChange={(e) => onUpdate({ contact: { ...data.contact, subtitle: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={data.contact.email}
                onChange={(e) => onUpdate({ contact: { ...data.contact, email: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone (optional)</label>
              <input
                type="text"
                value={data.contact.phone || ''}
                onChange={(e) => onUpdate({ contact: { ...data.contact, phone: e.target.value } })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
              />
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={data.contact.formEnabled}
                  onChange={(e) => onUpdate({ contact: { ...data.contact, formEnabled: e.target.checked } })}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">Enable Contact Form</span>
              </label>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-8 text-center text-gray-500">
            <p className="mb-4">Advanced editing for {activeSection} section</p>
            <p className="text-sm">
              This section contains complex data structures. Use the Export/Import feature to edit the JSON directly.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {/* Section List */}
      <div className="md:col-span-1">
        <h3 className="font-bold mb-4">Sections</h3>
        <div className="space-y-2">
          {sections.map((section) => (
            <div key={section.id} className="flex items-center space-x-2">
              <button
                onClick={() => toggleSectionVisibility(section.id)}
                className="p-1 hover:bg-gray-100 rounded"
                title={data.sectionVisibility[section.id] ? 'Hide section' : 'Show section'}
              >
                {data.sectionVisibility[section.id] ? (
                  <FaEye className="text-primary-600" />
                ) : (
                  <FaEyeSlash className="text-gray-400" />
                )}
              </button>
              <button
                onClick={() => setActiveSection(section.id)}
                className={`flex-1 text-left px-3 py-2 rounded transition-colors ${
                  activeSection === section.id
                    ? 'bg-primary-600 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {section.label}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="md:col-span-3">
        <h3 className="font-bold mb-4">
          Edit {sections.find(s => s.id === activeSection)?.label}
        </h3>
        <div className="bg-gray-50 p-6 rounded-lg">
          {renderEditor()}
        </div>
      </div>
    </div>
  );
}

