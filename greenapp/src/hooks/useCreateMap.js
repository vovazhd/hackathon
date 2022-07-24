/* eslint-disable no-loop-func */
import { loadModules } from 'esri-loader';
import { useEffect, useState } from 'react';
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
          'esri/PopupTemplate',
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
          PopupTemplate,
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
            document.body.style.cursor = 'wait';
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
              symbol: {
                type: 'picture-marker',
                url: 'https://intern-hackathon.maps.arcgis.com/sharing/rest/content/items/165704eda51e402da7d087106237c110/data',
                width: '32',
                height: '32',
              },
            });

            graphicsLayer.add(blueDot);
            result = await incrementBuffer(locationPoint, layer);
            mercator = result[1];

            result[0].features.forEach((item) => {
              const popup = new PopupTemplate({
                title: item.attributes.PARK_NAME,
                content: () => {
                  const div = document.createElement('div');
                  div.innerHTML = `
                  <p><b>Address:</b> ${item.attributes.ADDRESS}</p><br/>
                  <p><b>Phone:</b> ${item.attributes.PHONES}</p><br/>
                  <p><b>Park condition:</b> ${item.attributes.PRKINF_CND}</p><br/>
                  <p><b>Park type:</b> ${item.attributes.TYPE}</p><br/>
                  `;
                  return div;
                },
              });
              const graphic = new Graphic({
                geometry: item.geometry,
                attributes: item.attributes,
                symbol: {
                  type: 'picture-marker',
                  url: 'https://intern-hackathon.maps.arcgis.com/sharing/rest/content/items/223b1132d6c244c4a49718a6132cedf3/data',
                  width: '32',
                  height: '32',
                  yoffset: '16',
                },
                popupTemplate: popup,
              });
              graphicsLayer.add(graphic);
            });

            view.extent = mercator.extent;
            view.center = mercator.extent.center;
            map.remove(map.findLayerById(graphicsLayer.uid));
            map.add(graphicsLayer);
            document.body.style.cursor = 'initial';
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
            let increment = 500;
            let length = 0;
            let result;
            let bufferLayer;
            let bufferWebMercatorLayer;
            while (length < 3) {
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
              increment += 150;
            }

            return [result, bufferWebMercatorLayer];
          } catch (error) {
            console.log(error);
          }
        };

        const ActionContent = () => {
          return (
            <CalciteActionBar expanded={false}>
              <CalciteAction onClick={findNearestPark} text='Find Nearest Park'>
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
