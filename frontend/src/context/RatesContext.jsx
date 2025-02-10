import { createContext, useContext, useState } from 'react';
import { useRates } from '../hooks/useRates';

const RatesContext = createContext();

export function RatesProvider({ children }) {
  const { allRates, loading, error } = useRates();
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const value = {
    allRates,
    loading,
    error,
    selectedCurrency,
    setSelectedCurrency
  };

  return (
    <RatesContext.Provider value={value}>{children}</RatesContext.Provider>
  );
}

export const useRatesContext = () => useContext(RatesContext);
