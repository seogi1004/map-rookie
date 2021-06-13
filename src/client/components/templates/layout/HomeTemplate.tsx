import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

interface PropsType {
  children?: ReactNode;
}

const HomeTemplate: FC<PropsType> = ({ children }) => {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
};

export default HomeTemplate;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;
