import React, { FC } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import MainMenu from './MainMenu';

interface PropsType {
  active?: string;
}

const HeaderNav: FC<PropsType> = observer(({ active }) => {
  return (
    <Header>
      <MainMenu active={active} />
      <RightMenuContainer> </RightMenuContainer>
    </Header>
  );
});

export default HeaderNav;

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 0;
  line-height: 37px;
  padding: 10px 20px;
  z-index: 100;
  background: 0;
  * {
    user-select: none;
  }
`;

const RightMenuContainer = styled.div`
  margin: 0 0 0 auto;
  order: 2;
  display: flex;
  align-items: center;

  div {
    margin-left: 8px;
  }
`;
