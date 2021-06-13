import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

interface PropsType {
  children?: ReactNode;
}

const FullContent: FC<PropsType> = ({ children }) => {
  return <Content>{children}</Content>;
};

export default FullContent;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;
