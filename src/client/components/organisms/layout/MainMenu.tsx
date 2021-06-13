import React, { FC } from 'react';
import styled from 'styled-components';

interface PropsType {
  active?: string;
}

const MainMenu: FC<PropsType> = ({ active }) => {
  return (
    <Container>
    </Container>
  );
};

export default MainMenu;

const Container = styled.div`
  width: 100%;
`;
