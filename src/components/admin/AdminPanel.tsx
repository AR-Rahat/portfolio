import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaSave, FaUndo, FaDownload, FaUpload, FaCog } from 'react-icons/fa';
import { PortfolioData } from '../../types/portfolio';
import { SectionEditor } from './SectionEditor';
import { ThemeEditor } from './ThemeEditor';
import { GitHubSync } from './GitHubSync';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onUpdate: (data: Partial<PortfolioData>) => void;
  onReset: () => void;
  onExport: () => void;
  onImport: (data: string) => boolean;
}

type TabType = 'sections' | 'theme' | 'github' | 'settings';

export function AdminPanel({
  isOpen,
  onClose,
  data,
  onUpdate,
  onReset,
  onExport,
  onImport,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('sections');
  const [isDragging, setIsDragging] = useState(false);

  const handleImportFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          if (onImport(content)) {
            alert('Data imported successfully!');
          } else {
            alert('Failed to import data. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col"
        drag={isDragging}
        dragMomentum={false}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-4 border-b border-gray-200 cursor-move"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
        >
          <h2 className="text-2xl font-bold text-gray-900">Portfolio Editor</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={onExport}
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
              title="Export Data"
            >
              <FaDownload />
            </button>
            <button
              onClick={handleImportFile}
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
              title="Import Data"
            >
              <FaUpload />
            </button>
            <button
              onClick={onReset}
              className="p-2 text-gray-600 hover:text-red-600 transition-colors"
              title="Reset to Defaults"
            >
              <FaUndo />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <FaTimes size={24} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('sections')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'sections'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sections
          </button>
          <button
            onClick={() => setActiveTab('theme')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'theme'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Theme
          </button>
          <button
            onClick={() => setActiveTab('github')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'github'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            GitHub Sync
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'settings'
                ? 'text-primary-600 border-b-2 border-primary-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FaCog className="inline mr-2" />
            Settings
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'sections' && (
            <SectionEditor data={data} onUpdate={onUpdate} />
          )}
          {activeTab === 'theme' && (
            <ThemeEditor theme={data.theme} onUpdate={(theme) => onUpdate({ theme })} />
          )}
          {activeTab === 'github' && (
            <GitHubSync data={data} onUpdate={onUpdate} />
          )}
          {activeTab === 'settings' && (
            <div className="max-w-2xl">
              <h3 className="text-xl font-bold mb-4">Settings</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Change PIN</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    To change your PIN, you need to manually update the adminConfig in localStorage.
                  </p>
                  <code className="text-xs bg-white p-2 rounded block">
                    Use SHA-256 hash of your desired PIN
                  </code>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold mb-2">⚠️ Important Notes</h4>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Changes are auto-saved to localStorage</li>
                    <li>Use GitHub Sync to backup your data</li>
                    <li>Export your data regularly as backup</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Changes are automatically saved
            </p>
            <button
              onClick={onClose}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Close Editor
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

