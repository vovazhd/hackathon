import { loadModules } from 'esri-loader';
import { useEffect } from 'react';

const useSuitability = (mapRef) => {
  useEffect(() => {
    let map;
    let view;

    const initMap = async (mapRef) => {
      try {
        const [View, WebMap, Legend, Expand] = await loadModules([
          'esri/views/View',
          'esri/WebMap',
          'esri/widgets/Legend',
          'esri/widgets/Expand',
        ]);

        map = new WebMap({
          portalItem: {
            id: '696122f40a1f4b0abe903f886da9ff70',
          },
        });

        view = new View({
          map: map,
          container: mapRef.current,
          center: [-118.2420936417993, 34.051742101701095],
          zoom: 10,
        });

        const legend = new Legend({
          view: view,
        });

        const legendExpand = new Expand({
          view: view,
          content: legend,
          expandIconClass: 'esri-icon-legend',
        });

        view.ui.add(legendExpand, 'top-left');
      } catch (error) {
        console.log(error);
      }
    };

    initMap(mapRef);

    return () => view?.destroy();
  }, [mapRef]);
};

export default useSuitability;
