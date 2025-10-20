import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { SocialLink } from '../../types/portfolio';

interface FooterProps {
  social: SocialLink[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
};

export function Footer({ social }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex space-x-6">
            {social.map((link) => {
              const Icon = iconMap[link.icon] || FaEnvelope;
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={link.platform}
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </div>
          <p className="text-gray-400 text-sm text-center">
            ©Md. Asfakur Rahat {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
          {/* <p className="text-gray-500 text-xs">
            Press <kbd className="px-2 py-1 bg-gray-800 rounded">Ctrl+Shift+E</kbd> to edit
          </p> */}
        </div>
      </div>
    </footer>
  );
}

