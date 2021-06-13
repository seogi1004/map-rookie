import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

interface PropsType {
  children?: ReactNode;
}

const ContentTemplate: FC<PropsType> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default ContentTemplate;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 30px;
`;
