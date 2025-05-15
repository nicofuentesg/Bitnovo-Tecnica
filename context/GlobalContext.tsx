import React, { createContext, ReactNode, useContext, useState } from 'react';
import { FIAT_CURRENCIES } from '../constants/currencies';
import { Currency } from '../model/currency';

interface GlobalContextType {
  selectedCurrency: {
    abbreviation: string;
    symbol: string;
  };
  setSelectedCurrency: (currency: string) => void;
  currencies: Currency[];
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

type GlobalProviderProps = {
  children: ReactNode;
};

export function GlobalProvider({ children }: GlobalProviderProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<{ abbreviation: string; symbol: string }>({
    abbreviation: 'USD',
    symbol: '$'
  });

  const handleSetSelectedCurrency = (currencyAbbreviation: string) => {
    const currency = FIAT_CURRENCIES.find(c => c.abbreviation === currencyAbbreviation);
    if (currency) {
      setSelectedCurrency({
        abbreviation: currency.abbreviation,
        symbol: currency.symbol
      });
    }
  };

  return (
    <GlobalContext.Provider value={{ 
      selectedCurrency, 
      setSelectedCurrency: handleSetSelectedCurrency,
      currencies: FIAT_CURRENCIES
    }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
}; 