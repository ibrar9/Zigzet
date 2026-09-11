import React from 'react';
import { useStore } from '../../context/StoreContext';
import { InfluencerAuth } from './InfluencerAuth';
import { InfluencerDashboard } from './InfluencerDashboard';

export const InfluencerPortal = () => {
  const { currentInfluencer } = useStore();

  return (
    <div className="inf-portal-wrapper">
      {currentInfluencer ? (
        <InfluencerDashboard influencer={currentInfluencer} />
      ) : (
        <InfluencerAuth />
      )}
    </div>
  );
};
