import React, { createContext, ReactNode, useContext, useState } from 'react';
import { COUNTRY_PHONE_CODES } from '../constants/countryPhoneCodes';
import { Country } from '../model/country';

// Definimos el tipo para nuestro contexto
interface CountryContextType {
  selectedCountry: {
    name: string;
    code: string;
    dial_code: string;
  };
  setSelectedCountry: (countryCode: string) => void;
  countries: Country[];
}

// Creamos el contexto
const CountryContext = createContext<CountryContextType | undefined>(undefined);

// Props para el provider
type CountryProviderProps = {
  children: ReactNode;
};

// Provider component
export function CountryProvider({ children }: CountryProviderProps) {
  const [selectedCountry, setSelectedCountry] = useState<{ name: string; code: string; dial_code: string }>({
    name: 'España',
    code: 'ES',
    dial_code: '+34'
  });

  const handleSetSelectedCountry = (countryCode: string) => {
    const country = COUNTRY_PHONE_CODES.find(c => c.code === countryCode);
    if (country) {
      setSelectedCountry({
        name: country.name,
        code: country.code,
        dial_code: country.dial_code
      });
    }
  };

  return (
    <CountryContext.Provider value={{ 
      selectedCountry,
      setSelectedCountry: handleSetSelectedCountry,
      countries: COUNTRY_PHONE_CODES
    }}>
      {children}
    </CountryContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export const useCountry = () => {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
}; 