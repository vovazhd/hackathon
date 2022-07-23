import { loadModules } from 'esri-loader';
import { useEffect } from 'react';

const useCreateMap = (mapRef) => {
  useEffect(() => {
    let view;

    const initMap = async (mapRef) => {
      try {
        const modules = [
          'esri/Map',
          'esri/views/MapView',
          'esri/widgets/Directions',
          'esri/layers/RouteLayer',
          'esri/rest/support/Stop',
        ];
        const [Map, MapView, Directions, RouteLayer, Stop] = await loadModules(
          modules
        );
        const stops = [
          new Stop({ geometry: { x: -117.1825, y: 34.054722 } }),
          new Stop({ geometry: { x: -116.545278, y: 33.830278 } }),
        ];
        const routeLayer = new RouteLayer({ stops });

        const map = new Map({ basemap: 'streets', layers: [routeLayer] });
        view = new MapView({
          map: map,
          zoom: 12,
          container: mapRef.current,
          center: [-118.2420936417993, 34.051742101701095],
        });

        const directions = new Directions({
          view: view,
          layer: routeLayer,
          apiKey:
            'AAPK26c16bc6d0194b058c17d88790c210fc4tUyFEU-dB6L2EcTeey9607RX0mDt00sONmZrFVkbdVo5f9dSflXdWQGNbjPpVPn',
        });

        view.ui.add(directions, 'top-right');
        view.ui.move('zoom', 'bottom-right');
      } catch (error) {
        console.log(error);
      }
    };

    initMap(mapRef);

    return () => view?.destroy();
  }, [mapRef]);
};

export default useCreateMap;
