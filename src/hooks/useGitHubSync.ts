import { useState, useCallback, useEffect } from 'react';
import { PortfolioData } from '../types/portfolio';
import { fetchDataFromGitHub, pushDataToGitHub, validateGitHubConfig, GitHubConfig } from '../utils/github';
import { encryptData, decryptData } from '../utils/security';

const GITHUB_CONFIG_KEY = 'githubConfig';
const ENCRYPTION_KEY = 'portfolio-gh-key';

export function useGitHubSync() {
  const [config, setConfig] = useState<GitHubConfig | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load config from localStorage
    const stored = localStorage.getItem(GITHUB_CONFIG_KEY);
    if (stored) {
      try {
        const decrypted = decryptData(stored, ENCRYPTION_KEY);
        const parsed = JSON.parse(decrypted);
        if (validateGitHubConfig(parsed)) {
          setConfig(parsed);
        }
      } catch (err) {
        console.error('Error loading GitHub config:', err);
      }
    }
  }, []);

  const saveConfig = useCallback((newConfig: GitHubConfig) => {
    if (validateGitHubConfig(newConfig)) {
      const encrypted = encryptData(JSON.stringify(newConfig), ENCRYPTION_KEY);
      localStorage.setItem(GITHUB_CONFIG_KEY, encrypted);
      setConfig(newConfig);
      setError(null);
      return true;
    }
    return false;
  }, []);

  const clearConfig = useCallback(() => {
    localStorage.removeItem(GITHUB_CONFIG_KEY);
    setConfig(null);
    setLastSync(null);
    setError(null);
  }, []);

  const fetchFromGitHub = useCallback(async (): Promise<PortfolioData | null> => {
    if (!config) {
      setError('GitHub not configured');
      return null;
    }

    setIsSyncing(true);
    setError(null);

    try {
      const data = await fetchDataFromGitHub(config);
      if (data) {
        setLastSync(new Date());
        return data;
      } else {
        setError('Failed to fetch data from GitHub');
        return null;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setIsSyncing(false);
    }
  }, [config]);

  const pushToGitHub = useCallback(async (data: PortfolioData): Promise<boolean> => {
    if (!config) {
      setError('GitHub not configured');
      return false;
    }

    setIsSyncing(true);
    setError(null);

    try {
      const success = await pushDataToGitHub(config, data);
      if (success) {
        setLastSync(new Date());
        return true;
      } else {
        setError('Failed to push data to GitHub');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return false;
    } finally {
      setIsSyncing(false);
    }
  }, [config]);

  return {
    config,
    isConfigured: !!config,
    isSyncing,
    lastSync,
    error,
    saveConfig,
    clearConfig,
    fetchFromGitHub,
    pushToGitHub,
  };
}

