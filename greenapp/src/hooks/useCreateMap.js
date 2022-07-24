/* eslint-disable no-loop-func */
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
    let map;
    let graphicsLayer;
    let mercator;

    const initMap = async (mapRef) => {
      try {
        const modules = [
          'esri/Map',
          'esri/views/MapView',
          'esri/Basemap',
          'esri/layers/VectorTileLayer',
          'esri/layers/GraphicsLayer',
          'esri/Graphic',
          'esri/geometry/Point',
          'esri/rest/support/Query',
          'esri/rest/query',
          'esri/geometry/geometryEngine',
          'esri/geometry/support/webMercatorUtils',
        ];
        const [
          Map,
          MapView,
          Basemap,
          VectorTileLayer,
          GraphicsLayer,
          Graphic,
          Point,
          Query,
          queryTask,
          GeometryEngine,
          WebMercatorUtils,
        ] = await loadModules(modules);

        graphicsLayer = new GraphicsLayer({});
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

        map = new Map({ basemap: basemap, layers: [graphicsLayer] });
        view = new MapView({
          map: map,
          zoom: 12,
          container: mapRef.current,
          center: [-118.2420936417993, 34.051742101701095],
        });

        const findNearestPark = async () => {
          try {
            const layer =
              'https://services8.arcgis.com/LLNIdHmmdjO2qQ5q/arcgis/rest/services/Parks/FeatureServer/0';

            let result;
            graphicsLayer.removeAll();

            const locationPoint = new Point({
              longitude: '-118.27634385261786',
              latitude: '34.04663946385921',
            });

            const blueDot = new Graphic({
              geometry: locationPoint,
            });

            graphicsLayer.add(blueDot);
            result = await incrementBuffer(locationPoint, layer);
            mercator = result[1];

            result[0].features.forEach((item) => {
              console.log(item);

              const graphic = new Graphic({
                geometry: item.geometry,
                attributes: item.attributes,
                symbol: {
                  type: 'simple-marker',
                  color: 'green',
                },
              });
              graphicsLayer.add(graphic);
            });

            view.extent = mercator.extent;
            view.center = mercator.center;
            map.remove(map.findLayerById(graphicsLayer.uid));
            map.add(graphicsLayer);
          } catch (error) {
            console.log(error);
          }
        };

        const queryNearest = async (layer, bufferWebMercatorLayer) => {
          try {
            const bufferQuery = new Query();
            bufferQuery.geometry = bufferWebMercatorLayer;
            bufferQuery.returnGeometry = true;
            bufferQuery.outFields = ['*'];
            return queryTask.executeQueryJSON(layer, bufferQuery);
          } catch (error) {
            console.log(error);
          }
        };

        const incrementBuffer = async (location, layer) => {
          try {
            let increment = 250;
            let length = 0;
            let result;
            let bufferLayer;
            let bufferWebMercatorLayer;
            while (length < 1) {
              bufferLayer = GeometryEngine.geodesicBuffer(
                location,
                increment,
                'feet'
              );
              bufferWebMercatorLayer =
                WebMercatorUtils.geographicToWebMercator(bufferLayer);
              result = await queryNearest(layer, bufferWebMercatorLayer).then(
                (res) => {
                  length = res.features.length;
                  return res;
                }
              );
              increment += 50;
            }

            return [result, bufferWebMercatorLayer];
          } catch (error) {
            console.log(error);
          }
        };

        const ActionContent = () => {
          return (
            <CalciteActionBar expandDisabled expanded={true}>
              <CalciteAction text='Information' onClick={(e) => console.log(e)}>
                <InformationIcon />
              </CalciteAction>
              <CalciteAction onClick={findNearestPark} text='Nearest Park'>
                <ExploreIcon />
              </CalciteAction>
            </CalciteActionBar>
          );
        };

        const actions = document.createElement('div');
        ReactDOM.render(<ActionContent />, actions);

        view.ui.add(actions, 'top-left');

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
