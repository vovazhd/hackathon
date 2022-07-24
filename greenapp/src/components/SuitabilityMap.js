import React, { useRef } from 'react';
import useSuitability from '../hooks/useSuitability';

const SuitabilityMap = () => {
  const mapRef = useRef(null);
  useSuitability(mapRef);

  return <div ref={mapRef} style={{ height: 'calc(100vh - 45px)' }}></div>;
};

export default SuitabilityMap;
