import React, { FC } from 'react';
import SEO from '@components/organisms/common/SEO';
import HomeTemplate from '../../templates/layout/HomeTemplate';

interface PropsType {}

const MainHomePage: FC<PropsType> = props => {
  return (
    <>
      <SEO title="Home" />
      <HomeTemplate>
        Hello world!
      </HomeTemplate>
    </>
  );
};

export default MainHomePage;
