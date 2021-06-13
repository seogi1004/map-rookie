import React, { FC, ReactNode, CSSProperties } from 'react';
import styled from 'styled-components';

interface PropsType {
  style?: CSSProperties;
  children?: ReactNode;
}

const BaseLayout: FC<PropsType> = ({ style, children }) => {
  return (
    <Layout
      style={{
        ...style,
      }}
    >
      {children}
    </Layout>
  );
};

export default BaseLayout;

const Layout = styled.div`
  height: 100%;
`;
