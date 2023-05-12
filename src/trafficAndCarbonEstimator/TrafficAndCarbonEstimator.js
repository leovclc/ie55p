// TrafficAndCarbonEstimator.js
import React, { useState } from 'react';
import TrafficMap from './TrafficMap';
import CarbonEstimator from './CarbonEstimator';
// import './TrafficAndCarbonEstimator.css'

const TrafficAndCarbonEstimator = () => {
  const [distance, setDistance] = useState('');

  const handleDistanceChange = (newDistance) => {
    setDistance(newDistance);
  };

  return (
    <div className="traffic-and-carbon-estimator">
      <TrafficMap onDistanceChange={handleDistanceChange} />
      <CarbonEstimator distance={distance} />
    </div>
  );
};

export default TrafficAndCarbonEstimator;
