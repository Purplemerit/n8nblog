'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CountryCode, ISO_TO_COUNTRY_CODE } from '@/config/multiTenantFeeds';

interface CountryContextType {
  countryCode: CountryCode;
  setCountryCode: (code: CountryCode) => void;
  isLoading: boolean;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

const DEFAULT_COUNTRY: CountryCode = 'UNITED_STATES';

export function CountryProvider({ children }: { children: ReactNode }) {
  const [countryCode, setCountryCodeState] = useState<CountryCode>(DEFAULT_COUNTRY);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has a saved preference
    const savedCountry = localStorage.getItem('user-country');
    if (savedCountry && isValidCountryCode(savedCountry)) {
      setCountryCodeState(savedCountry as CountryCode);
      setIsLoading(false);
      return;
    }

    // Auto-detect country using geo-location API
    detectUserCountry();
  }, []);

  const detectUserCountry = async () => {
    try {
      // Try multiple geo-location services
      const country = await getCountryFromIP();
      if (country) {
        setCountryCodeState(country);
      }
    } catch (error) {
      console.log('Could not detect country, using default:', DEFAULT_COUNTRY);
    } finally {
      setIsLoading(false);
    }
  };

  const getCountryFromIP = async (): Promise<CountryCode | null> => {
    try {
      // Using ipapi.co - free service with generous limits
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();

      if (data.country_code) {
        const mappedCountry = ISO_TO_COUNTRY_CODE[data.country_code];
        if (mappedCountry) {
          console.log(`Detected country: ${data.country_name} (${data.country_code}) -> ${mappedCountry}`);
          return mappedCountry;
        }
      }

      return null;
    } catch (error) {
      console.error('Error detecting country from IP:', error);
      return null;
    }
  };

  const setCountryCode = (code: CountryCode) => {
    setCountryCodeState(code);
    localStorage.setItem('user-country', code);
  };

  return (
    <CountryContext.Provider value={{ countryCode, setCountryCode, isLoading }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
}

function isValidCountryCode(code: string): boolean {
  const validCodes = [
    'INDIA', 'UNITED_STATES', 'UNITED_KINGDOM', 'AUSTRALIA',
    'CANADA', 'GERMANY', 'FRANCE', 'SPAIN', 'ITALY', 'NETHERLANDS',
    'IRELAND', 'SWEDEN', 'NORWAY', 'SWITZERLAND', 'JAPAN',
    'CHINA', 'SINGAPORE', 'SOUTH_KOREA', 'MALAYSIA', 'THAILAND',
    'PHILIPPINES', 'INDONESIA', 'VIETNAM', 'PAKISTAN', 'BANGLADESH',
    'SRI_LANKA', 'NEPAL', 'TAIWAN', 'MIDDLE_EAST', 'AFRICA'
  ];
  return validCodes.includes(code);
}
