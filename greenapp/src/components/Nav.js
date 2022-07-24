import React from 'react';
import '@esri/calcite-components/dist/components/tab-nav';
import '@esri/calcite-components/dist/components/tab-title';
import '@esri/calcite-components/dist/components/calcite-tabs';
import '@esri/calcite-components/dist/components/calcite-tab';
import {
  CalciteTabNav,
  CalciteTabTitle,
  CalciteTabs,
  CalciteTab,
} from '@esri/calcite-components-react';
import Map from './Map';
import SuitabilityMap from './SuitabilityMap';

const CSS = {
  tabNav: {
    height: '43px',
    padding: '0.5rem',
    marginLeft: '10px',
    display: 'flex',
    justifyContent: 'space-around',
  },
};

const Nav = () => {
  return (
    <>
      <CalciteTabs>
        <CalciteTabNav slot='tab-nav' style={CSS.tabNav}>
          <CalciteTabTitle active>Navigate to Green Area</CalciteTabTitle>
          <CalciteTabTitle>Green Areas Dashboard</CalciteTabTitle>
          <CalciteTabTitle>Place a Green Area</CalciteTabTitle>
        </CalciteTabNav>
        <CalciteTab active>{<Map />}</CalciteTab>
        <CalciteTab>
          <SuitabilityMap />
        </CalciteTab>
        <CalciteTab>Third Tab</CalciteTab>
      </CalciteTabs>
    </>
  );
};

export default Nav;
