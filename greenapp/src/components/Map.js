import React, { useRef } from 'react';
import useCreateMap from '../hooks/useCreateMap';

const Map = () => {
  const mapRef = useRef(null);
  useCreateMap(mapRef);

  return (
    <div
      className='map-view'
      style={{ height: 'calc(100vh - 45px)' }}
      ref={mapRef}
    />
  );
};

export default Map;
