import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

interface PropsType {
  children?: ReactNode;
}

const CenterContainer: FC<PropsType> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default CenterContainer;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
