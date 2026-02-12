'use client';

import React, { useState } from 'react';
import { useCountry } from '@/contexts/CountryContext';
import { getAvailableCountries, CountryCode } from '@/config/multiTenantFeeds';
import { Globe } from 'lucide-react';
import styles from './CountrySelector.module.css';

export default function CountrySelector() {
  const { countryCode, setCountryCode, isLoading } = useCountry();
  const [isOpen, setIsOpen] = useState(false);
  const countries = getAvailableCountries();

  const currentCountry = countries.find(c => c.code === countryCode);

  const handleCountrySelect = (code: CountryCode) => {
    setCountryCode(code);
    setIsOpen(false);
    // Reload the page to fetch new feeds
    window.location.reload();
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select country"
      >
        <Globe size={20} />
        <span className={styles.countryName}>{currentCountry?.name || 'Select Country'}</span>
      </button>

      {isOpen && (
        <>
          <div className={styles.overlay} onClick={() => setIsOpen(false)} />
          <div className={styles.dropdown}>
            <div className={styles.header}>
              <h3>Select Your Region</h3>
              <p>Choose your country to see relevant blogs</p>
            </div>
            <div className={styles.list}>
              {countries.map((country) => (
                <button
                  key={country.code}
                  className={`${styles.item} ${country.code === countryCode ? styles.active : ''}`}
                  onClick={() => handleCountrySelect(country.code)}
                >
                  <span className={styles.itemName}>{country.name}</span>
                  {country.code === countryCode && (
                    <span className={styles.checkmark}>✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
