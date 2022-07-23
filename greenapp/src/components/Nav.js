import React from 'react';
import '@esri/calcite-components/dist/components/tab-nav';
import '@esri/calcite-components/dist/components/tab-title';
import { CalciteTabNav, CalciteTabTitle } from '@esri/calcite-components-react';

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
      <CalciteTabNav style={CSS.tabNav}>
        <CalciteTabTitle active>Tab 1</CalciteTabTitle>
        <CalciteTabTitle>Tab 2</CalciteTabTitle>
      </CalciteTabNav>
    </>
  );
};

export default Nav;
