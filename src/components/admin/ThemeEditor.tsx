import { ThemeConfig } from '../../types/portfolio';

interface ThemeEditorProps {
  theme: ThemeConfig;
  onUpdate: (theme: ThemeConfig) => void;
}

export function ThemeEditor({ theme, onUpdate }: ThemeEditorProps) {
  const presets = [
    {
      name: 'Professional Blue',
      theme: {
        primaryColor: '#2563eb',
        secondaryColor: '#1e40af',
        accentColor: '#60a5fa',
        backgroundColor: '#ffffff',
        textColor: '#1f2937',
        fontFamily: 'Inter, system-ui, sans-serif',
      },
    },
    {
      name: 'Modern Purple',
      theme: {
        primaryColor: '#7c3aed',
        secondaryColor: '#5b21b6',
        accentColor: '#a78bfa',
        backgroundColor: '#ffffff',
        textColor: '#1f2937',
        fontFamily: 'Inter, system-ui, sans-serif',
      },
    },
    {
      name: 'Dark Mode',
      theme: {
        primaryColor: '#3b82f6',
        secondaryColor: '#2563eb',
        accentColor: '#60a5fa',
        backgroundColor: '#111827',
        textColor: '#f9fafb',
        fontFamily: 'Inter, system-ui, sans-serif',
      },
    },
  ];

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-4">Theme Customization</h3>
        <p className="text-gray-600 mb-6">
          Customize the look and feel of your portfolio
        </p>
      </div>

      {/* Presets */}
      <div>
        <label className="block text-sm font-medium mb-3">Quick Presets</label>
        <div className="grid grid-cols-3 gap-3">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => onUpdate(preset.theme)}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-600 transition-colors"
            >
              <div className="flex space-x-1 mb-2">
                <div
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: preset.theme.primaryColor }}
                />
                <div
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: preset.theme.secondaryColor }}
                />
                <div
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: preset.theme.accentColor }}
                />
              </div>
              <span className="text-sm font-medium">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Color Customization */}
      <div className="space-y-4">
        <h4 className="font-semibold">Colors</h4>
        
        <div>
          <label className="block text-sm font-medium mb-2">Primary Color</label>
          <div className="flex space-x-2">
            <input
              type="color"
              value={theme.primaryColor}
              onChange={(e) => onUpdate({ ...theme, primaryColor: e.target.value })}
              className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={theme.primaryColor}
              onChange={(e) => onUpdate({ ...theme, primaryColor: e.target.value })}
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Secondary Color</label>
          <div className="flex space-x-2">
            <input
              type="color"
              value={theme.secondaryColor}
              onChange={(e) => onUpdate({ ...theme, secondaryColor: e.target.value })}
              className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={theme.secondaryColor}
              onChange={(e) => onUpdate({ ...theme, secondaryColor: e.target.value })}
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Accent Color</label>
          <div className="flex space-x-2">
            <input
              type="color"
              value={theme.accentColor}
              onChange={(e) => onUpdate({ ...theme, accentColor: e.target.value })}
              className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={theme.accentColor}
              onChange={(e) => onUpdate({ ...theme, accentColor: e.target.value })}
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Background Color</label>
          <div className="flex space-x-2">
            <input
              type="color"
              value={theme.backgroundColor}
              onChange={(e) => onUpdate({ ...theme, backgroundColor: e.target.value })}
              className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={theme.backgroundColor}
              onChange={(e) => onUpdate({ ...theme, backgroundColor: e.target.value })}
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Text Color</label>
          <div className="flex space-x-2">
            <input
              type="color"
              value={theme.textColor}
              onChange={(e) => onUpdate({ ...theme, textColor: e.target.value })}
              className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={theme.textColor}
              onChange={(e) => onUpdate({ ...theme, textColor: e.target.value })}
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Typography */}
      <div>
        <h4 className="font-semibold mb-3">Typography</h4>
        <div>
          <label className="block text-sm font-medium mb-2">Font Family</label>
          <select
            value={theme.fontFamily}
            onChange={(e) => onUpdate({ ...theme, fontFamily: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
          >
            <option value="Inter, system-ui, sans-serif">Inter</option>
            <option value="Roboto, sans-serif">Roboto</option>
            <option value="'Playfair Display', serif">Playfair Display</option>
            <option value="'Montserrat', sans-serif">Montserrat</option>
            <option value="'Poppins', sans-serif">Poppins</option>
          </select>
        </div>
      </div>

      {/* Preview */}
      <div className="p-6 rounded-lg border-2 border-gray-200">
        <h4 className="font-semibold mb-3">Preview</h4>
        <div
          className="p-6 rounded"
          style={{
            backgroundColor: theme.backgroundColor,
            color: theme.textColor,
            fontFamily: theme.fontFamily,
          }}
        >
          <h3
            className="text-2xl font-bold mb-2"
            style={{ color: theme.primaryColor }}
          >
            Heading Example
          </h3>
          <p className="mb-2">
            This is how your text will look with the current theme settings.
          </p>
          <button
            className="px-4 py-2 rounded text-white"
            style={{ backgroundColor: theme.primaryColor }}
          >
            Button Example
          </button>
        </div>
      </div>
    </div>
  );
}

