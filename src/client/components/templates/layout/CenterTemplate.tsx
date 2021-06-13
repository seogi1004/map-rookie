import React, { FC, ReactNode } from 'react';
import CenterContainer from '@components/organisms/layout/CenterContainer';

interface PropsType {
  children?: ReactNode;
}

const CenterTemplate: FC<PropsType> = ({ children }) => {
  return <CenterContainer>{children}</CenterContainer>;
};

export default CenterTemplate;
