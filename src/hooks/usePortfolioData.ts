import { useCallback, useEffect, useState } from 'react';
import { PortfolioData } from '../types/portfolio';
import { defaultPortfolioData } from '../data/defaultData';
import { useLocalStorage } from './useLocalStorage';

export function usePortfolioData() {
  const [data, setData, removeData] = useLocalStorage<PortfolioData>(
    'portfolioData',
    defaultPortfolioData
  );
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from public/data.json if localStorage is empty
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Check if localStorage has custom data (not just defaults)
        const stored = window.localStorage.getItem('portfolioData');
        
        if (!stored) {
          // Try to fetch from public data.json
          const response = await fetch('/data.json');
          if (response.ok) {
            const publicData = await response.json();
            // Only use public data if it's not the placeholder
            if (publicData && !publicData.info) {
              console.log('Loading data from public/data.json');
              setData(publicData);
            } else {
              console.log('Using default data (public/data.json is placeholder)');
            }
          }
        }
      } catch (error) {
        console.log('Could not fetch public data, using defaults:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []); // Only run once on mount

  const updateData = useCallback((newData: Partial<PortfolioData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  }, [setData]);

  const updateSection = useCallback(<K extends keyof PortfolioData>(
    section: K,
    sectionData: PortfolioData[K]
  ) => {
    setData((prev) => ({ ...prev, [section]: sectionData }));
  }, [setData]);

  const resetToDefaults = useCallback(() => {
    setData(defaultPortfolioData);
  }, [setData]);

  const exportData = useCallback(() => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [data]);

  const importData = useCallback((jsonData: string) => {
    try {
      const parsed = JSON.parse(jsonData);
      setData(parsed);
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }, [setData]);

  return {
    data,
    isLoading,
    updateData,
    updateSection,
    resetToDefaults,
    exportData,
    importData,
    removeData,
  };
}

