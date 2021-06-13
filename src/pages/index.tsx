import React, { FC } from 'react';
import MainHomePage from '@components/pages/home/MainHomePage';
import HeaderLayoutTemplate from '@components/templates/layout/HeaderLayoutTemplate';

interface PropsType {}

const Index: FC<PropsType> = props => {
  return <MainHomePage {...props} />;
};

Index['layout'] = HeaderLayoutTemplate;

export default Index;
