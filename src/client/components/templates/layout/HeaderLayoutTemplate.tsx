import React, { FC, ReactNode, CSSProperties } from 'react';
import FullLayout from '@components/organisms/layout/FullLayout';
import HeaderNav from '@components/organisms/layout/HeaderNav';
import styled from 'styled-components';
import FullContent from '@components/organisms/layout/FullContent';

interface PropsType {
  active?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const HeaderLayoutTemplate: FC<PropsType> = props => {
  const { active, style, children } = props;
  return (
    <FullLayout style={style}>
      <HeaderNav active={active} />
      <ContentContainer>
        <FullContent>{children}</FullContent>
      </ContentContainer>
    </FullLayout>
  );
};

export default HeaderLayoutTemplate;

const ContentContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: auto;
`;
