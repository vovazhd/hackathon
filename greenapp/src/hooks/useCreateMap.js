import { loadModules } from 'esri-loader';
import React, { useEffect } from 'react';

const useCreateMap = (mapRef) => {
  useEffect(() => {
    let view;

    const initMap = async (mapRef) => {
      try {
        const modules = ['esri/Map', 'esri/views/MapView'];
        const [Map, MapView] = await loadModules(modules);
        const map = new Map({ basemap: 'streets' });
        view = new MapView({
          map: map,
          zoom: 12,
          container: mapRef.current,
          center: [-118.2420936417993, 34.051742101701095],
        });
      } catch (error) {
        console.log(error);
      }
    };

    initMap(mapRef);

    return () => view?.destroy();
  }, [mapRef]);
};

export default useCreateMap;
