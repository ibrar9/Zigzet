import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Globe, DollarSign } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AnnouncementBar = () => {
  const { settings, changeCurrency } = useStore();
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');

  const currRef = useRef(null);
  const langRef = useRef(null);

  const currencies = [
    { code: 'AED', name: 'UAE Dirham', flag: '🇦🇪', symbol: 'AED' },
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸', symbol: '$' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺', symbol: '€' },
    { code: 'GBP', name: 'British Pound', flag: '🇬🇧', symbol: '£' },
    { code: 'SAR', name: 'Saudi Riyal', flag: '🇸🇦', symbol: 'SAR' }
  ];

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'ar', label: 'العربية', flag: '🇦🇪' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' }
  ];

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (currRef.current && !currRef.current.contains(e.target)) {
        setCurrencyOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="announcement-bar">
      <div className="container announcement-content">
        <div className="announcement-text">
          <span>{(settings.announcement || 'Free Express Delivery Across UAE on Orders Over 150 AED').replace(/✨|🔥|🎉/g, '').trim()}</span>
        </div>

        <div className="announcement-controls">
          {/* Currency Selector Dropdown */}
          <div className="announcement-dropdown-wrapper" ref={currRef}>
            <button 
              className="announcement-dropdown" 
              onClick={() => { setCurrencyOpen(!currencyOpen); setLangOpen(false); }}
              title="Select Currency"
              aria-expanded={currencyOpen}
            >
              <DollarSign size={12} />
              <span>{settings.currency || 'AED'}</span>
              <ChevronDown size={12} className={`chevron-icon ${currencyOpen ? 'rotate' : ''}`} />
            </button>

            {currencyOpen && (
              <div className="announcement-popover-menu">
                <div className="popover-heading">Select Currency</div>
                {currencies.map((c) => (
                  <button
                    key={c.code}
                    className={`popover-item ${settings.currency === c.code ? 'active' : ''}`}
                    onClick={() => {
                      changeCurrency(c.code);
                      setCurrencyOpen(false);
                    }}
                  >
                    <span className="popover-flag">{c.flag}</span>
                    <span className="popover-name">{c.name} ({c.code})</span>
                    {settings.currency === c.code && <Check size={13} className="popover-check" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="announcement-divider">|</span>

          {/* Language Selector Dropdown */}
          <div className="announcement-dropdown-wrapper" ref={langRef}>
            <button 
              className="announcement-dropdown" 
              onClick={() => { setLangOpen(!langOpen); setCurrencyOpen(false); }}
              title="Select Language"
              aria-expanded={langOpen}
            >
              <Globe size={12} />
              <span>{selectedLang}</span>
              <ChevronDown size={12} className={`chevron-icon ${langOpen ? 'rotate' : ''}`} />
            </button>

            {langOpen && (
              <div className="announcement-popover-menu">
                <div className="popover-heading">Language</div>
                {languages.map((l) => (
                  <button
                    key={l.code}
                    className={`popover-item ${selectedLang === l.label ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedLang(l.label);
                      setLangOpen(false);
                    }}
                  >
                    <span className="popover-flag">{l.flag}</span>
                    <span className="popover-name">{l.label}</span>
                    {selectedLang === l.label && <Check size={13} className="popover-check" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
