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
import Story from './Story';
import Dashboard from './Dashboard';
import Survey from './Survey';

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
          <CalciteTabTitle active>Navigate to Green Space</CalciteTabTitle>
          <CalciteTabTitle>Green Space Optimizer</CalciteTabTitle>
          <CalciteTabTitle>Optimizer Storymap</CalciteTabTitle>
          <CalciteTabTitle>Feedback</CalciteTabTitle>
        </CalciteTabNav>
        <CalciteTab active>{<Map />}</CalciteTab>
        <CalciteTab>
          <Dashboard />
        </CalciteTab>
        <CalciteTab>
          <Story />
        </CalciteTab>
        <CalciteTab>
          <Survey />
        </CalciteTab>
      </CalciteTabs>
    </>
  );
};

export default Nav;
