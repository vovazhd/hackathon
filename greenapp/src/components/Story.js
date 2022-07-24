/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';

const Story = () => {
  return (
    <>
      <iframe
        src='https://storymaps.arcgis.com/stories/fa8676c305d144a990cd700ac29cde14'
        width='100%'
        style={{ height: 'calc(100vh - 46px)' }}
        frameborder='0'
        allowfullscreen
        allow='geolocation'></iframe>
    </>
  );
};

export default Story;
