import React from 'react';
import { ChevronDown, Star } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AnnouncementBar = () => {
  const { settings } = useStore();

  return (
    <div className="announcement-bar">
      <div className="container announcement-content">
        <div className="announcement-text">
          <span>⭐</span>
          <span>{settings.announcement}</span>
        </div>

        <div className="announcement-controls">
          <div className="announcement-dropdown" title="Select Currency">
            <span>{settings.currency}</span>
            <ChevronDown size={13} />
          </div>
          <span>|</span>
          <div className="announcement-dropdown" title="Select Language">
            <span>English</span>
            <ChevronDown size={13} />
          </div>
        </div>
      </div>
    </div>
  );
};
