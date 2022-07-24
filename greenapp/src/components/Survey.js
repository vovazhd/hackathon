/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';

const Survey = () => {
  return (
    <>
      <iframe
        src='https://survey123.arcgis.com/share/d2df9af534974ab5a9f5fe27ff17e203'
        width='100%'
        style={{ height: 'calc(100vh - 46px)' }}
        frameborder='0'
        allowfullscreen
        allow='geolocation'></iframe>
    </>
  );
};

export default Survey;
