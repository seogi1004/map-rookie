import React, { FC, useState } from 'react';
import ReactMapGL from 'react-map-gl';
import SEO from '@components/organisms/common/SEO';
import HomeTemplate from '../../templates/layout/HomeTemplate';
import { MAPBOX_ACCESS_TOKEN } from '@constants/token';

interface PropsType {}

const MainHomePage: FC<PropsType> = () => {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  return (
    <>
      <SEO title="Home" />
      <HomeTemplate>
        <ReactMapGL
          {...viewport}
          mapStyle={'mapbox://styles/alvinhhhh/ckpv80jir02h818mr5ha0x0pd'}
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          onViewportChange={nextViewport => setViewport(nextViewport)}
        />
      </HomeTemplate>
    </>
  );
};

export default MainHomePage;
