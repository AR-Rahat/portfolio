import { useCallback } from 'react';
import { PortfolioData } from '../types/portfolio';
import { defaultPortfolioData } from '../data/defaultData';
import { useLocalStorage } from './useLocalStorage';

export function usePortfolioData() {
  const [data, setData, removeData] = useLocalStorage<PortfolioData>(
    'portfolioData',
    defaultPortfolioData
  );

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
    updateData,
    updateSection,
    resetToDefaults,
    exportData,
    importData,
    removeData,
  };
}

