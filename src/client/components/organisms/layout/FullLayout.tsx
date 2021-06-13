import React, { FC, ReactNode, CSSProperties } from 'react';
import BaseLayout from './BaseLayout';
import { createGlobalStyle } from 'styled-components';

interface PropsType {
  style?: CSSProperties;
  children?: ReactNode;
}

const FullLayout: FC<PropsType> = ({ style, children }) => {
  return (
    <BaseLayout style={style}>
      <GlobalStyles />
      {children}
    </BaseLayout>
  );
};

export default FullLayout;

const GlobalStyles = createGlobalStyle`
`;
