/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';

const Dashboard = () => {
  return (
    <>
      <iframe
        width='100%'
        style={{ height: 'calc(100vh - 46px)' }}
        frameborder='0'
        scrolling='no'
        marginheight='0'
        marginwidth='0'
        src='https://intern-hackathon.maps.arcgis.com/apps/dashboards/c2a6732efcfb4f078bebd036c6fce81a'></iframe>
    </>
  );
};

export default Dashboard;
