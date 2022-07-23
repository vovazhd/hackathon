import { loadModules } from 'esri-loader';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

// Calcite UI elements
import '@esri/calcite-components/dist/components/calcite-action-bar';
import '@esri/calcite-components/dist/components/calcite-action';
import {
  CalciteActionBar,
  CalciteAction,
} from '@esri/calcite-components-react';

// Calcite icons
import InformationIcon from 'calcite-ui-icons-react/InformationIcon';
import ExploreIcon from 'calcite-ui-icons-react/ExploreIcon';

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
          'esri/Basemap',
          'esri/layers/VectorTileLayer',
        ];
        const [
          Map,
          MapView,
          Directions,
          RouteLayer,
          Stop,
          Basemap,
          VectorTileLayer,
        ] = await loadModules(modules);
        const stops = [
          new Stop({ geometry: { x: -117.1825, y: 34.054722 } }),
          new Stop({ geometry: { x: -116.545278, y: 33.830278 } }),
        ];
        const routeLayer = new RouteLayer({ stops });

        const basemap = new Basemap({
          baseLayers: [
            new VectorTileLayer({
              portalItem: {
                id: '6b139d5d51124071961da673229b2aaa',
              },
            }),
          ],
          title: 'Community Basemap',
          id: 'communityBasemap',
        });

        const map = new Map({ basemap: basemap, layers: [routeLayer] });
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

        const ActionContent = () => {
          return (
            <CalciteActionBar expandDisabled expanded={true}>
              <CalciteAction text='Information' onClick={(e) => console.log(e)}>
                <InformationIcon />
              </CalciteAction>
              <CalciteAction text='Nearest Park'>
                <ExploreIcon />
              </CalciteAction>
            </CalciteActionBar>
          );
        };

        const actions = document.createElement('div');
        ReactDOM.render(<ActionContent />, actions);

        view.ui.add(actions, 'top-left');

        view.ui.add(directions, 'top-right');
        view.ui.remove('zoom');
      } catch (error) {
        console.log(error);
      }
    };

    initMap(mapRef);

    return () => view?.destroy();
  }, [mapRef]);
};

export default useCreateMap;
