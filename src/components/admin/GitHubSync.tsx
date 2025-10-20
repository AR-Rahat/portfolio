import { useState } from 'react';
import { FaGithub, FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';
import { PortfolioData } from '../../types/portfolio';
import { useGitHubSync } from '../../hooks/useGitHubSync';

interface GitHubSyncProps {
  data: PortfolioData;
  onUpdate: (data: Partial<PortfolioData>) => void;
}

export function GitHubSync({ data, onUpdate }: GitHubSyncProps) {
  const {
    config,
    isConfigured,
    isSyncing,
    lastSync,
    error,
    saveConfig,
    clearConfig,
    fetchFromGitHub,
    pushToGitHub,
  } = useGitHubSync();

  const [formData, setFormData] = useState({
    token: config?.token || '',
    owner: config?.owner || '',
    repo: config?.repo || '',
  });
  const [showToken, setShowToken] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSaveConfig = () => {
    if (saveConfig(formData)) {
      setSuccessMessage('GitHub configuration saved!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleFetch = async () => {
    const fetchedData = await fetchFromGitHub();
    if (fetchedData) {
      onUpdate(fetchedData);
      setSuccessMessage('Data fetched from GitHub!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handlePush = async () => {
    const success = await pushToGitHub(data);
    if (success) {
      setSuccessMessage('Data pushed to GitHub!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2 flex items-center">
          <FaGithub className="mr-2" />
          GitHub Integration
        </h3>
        <p className="text-gray-600">
          Sync your portfolio data with a GitHub repository
        </p>
      </div>

      {!isConfigured ? (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold mb-2">Setup Instructions</h4>
            <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
              <li>Create a GitHub Personal Access Token with 'repo' permissions</li>
              <li>Enter your token and repository details below</li>
              <li>Click "Save Configuration" to connect</li>
              <li>Use Push/Pull buttons to sync your data</li>
            </ol>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Personal Access Token</label>
            <div className="flex space-x-2">
              <input
                type={showToken ? 'text' : 'password'}
                value={formData.token}
                onChange={(e) => setFormData({ ...formData, token: e.target.value })}
                placeholder="ghp_xxxxxxxxxxxx"
                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
              />
              <button
                onClick={() => setShowToken(!showToken)}
                className="px-3 py-2 border rounded-lg hover:bg-gray-50"
              >
                {showToken ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Repository Owner</label>
            <input
              type="text"
              value={formData.owner}
              onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
              placeholder="your-username"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Repository Name</label>
            <input
              type="text"
              value={formData.repo}
              onChange={(e) => setFormData({ ...formData, repo: e.target.value })}
              placeholder="Portfolio"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-600 outline-none"
            />
          </div>

          <button
            onClick={handleSaveConfig}
            disabled={!formData.token || !formData.owner || !formData.repo}
            className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Configuration
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 rounded-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaCheck className="text-green-600" />
              <span className="font-medium">Connected to GitHub</span>
            </div>
            <button
              onClick={clearConfig}
              className="text-sm text-red-600 hover:underline"
            >
              Disconnect
            </button>
          </div>

          <div className="p-4 border rounded-lg">
            <p className="text-sm text-gray-600 mb-1">
              <strong>Repository:</strong> {config?.owner}/{config?.repo}
            </p>
            {lastSync && (
              <p className="text-sm text-gray-600">
                <strong>Last Sync:</strong> {lastSync.toLocaleString()}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleFetch}
              disabled={isSyncing}
              className="flex items-center justify-center space-x-2 bg-white border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSyncing ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <>
                  <span>Pull from GitHub</span>
                </>
              )}
            </button>

            <button
              onClick={handlePush}
              disabled={isSyncing}
              className="flex items-center justify-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSyncing ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <>
                  <span>Push to GitHub</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 rounded-lg flex items-start space-x-2">
          <FaTimes className="text-red-600 mt-0.5" />
          <div>
            <p className="font-medium text-red-800">Error</p>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="p-4 bg-green-50 rounded-lg flex items-center space-x-2">
          <FaCheck className="text-green-600" />
          <p className="text-green-800">{successMessage}</p>
        </div>
      )}
    </div>
  );
}

