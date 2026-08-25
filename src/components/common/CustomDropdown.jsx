import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export const CustomDropdown = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select option...',
  icon = null,
  width = 'auto',
  minWidth = '180px',
  align = 'left',
  variant = 'default', // 'default' | 'pill' | 'compact' | 'status'
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || {
    label: value || placeholder,
    value: value
  };

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={`modern-custom-dropdown ${variant} ${isOpen ? 'open' : ''} ${className}`}
      style={{ width, minWidth }}
    >
      {/* Trigger Button */}
      <button
        type="button"
        className={`dropdown-trigger-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="trigger-content-left">
          {icon && <span className="trigger-icon">{icon}</span>}
          {selectedOption.dot && (
            <span
              className="status-dot-indicator"
              style={{ backgroundColor: selectedOption.dot }}
            />
          )}
          <span className="trigger-label">{selectedOption.label || placeholder}</span>
          {selectedOption.badge && (
            <span className="trigger-pill-badge">{selectedOption.badge}</span>
          )}
        </div>

        <ChevronDown
          size={14}
          className={`trigger-chevron ${isOpen ? 'rotate' : ''}`}
        />
      </button>

      {/* Dropdown Menu Modal */}
      {isOpen && (
        <div className={`dropdown-menu-list ${align === 'right' ? 'align-right' : ''}`}>
          <div className="dropdown-options-container">
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  className={`dropdown-option-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelect(opt.value)}
                >
                  <div className="option-item-left">
                    {opt.dot && (
                      <span
                        className="status-dot-indicator"
                        style={{ backgroundColor: opt.dot }}
                      />
                    )}
                    {opt.icon && <span className="option-icon">{opt.icon}</span>}
                    <span className="option-text">{opt.label}</span>
                  </div>

                  <div className="option-item-right">
                    {opt.badge && (
                      <span className="option-badge-tag">{opt.badge}</span>
                    )}
                    {isSelected && (
                      <Check size={14} className="option-check-icon" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
