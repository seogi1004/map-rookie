import React, { FC } from 'react';
import styled from 'styled-components';
import SEO from '@components/organisms/common/SEO';
import FullLayout from '../templates/layout/FullLayoutTemplate';

interface PropsType {
  statusCode?: number;
}

const ErrorPage: FC<PropsType> = ({ statusCode }) => {
  const status = statusCode?.toString();
  let info: ErrorInfo;

  switch (statusCode) {
    case 403:
      info = {
        status,
        title: status,
        subTitle: 'Sorry, you are not authorized to access this page.',
      };
      break;
    case 404:
      info = {
        status,
        title: status,
        subTitle: 'Sorry, the page you visited does not exist.',
      };
      break;
    default:
      info = {
        status,
        title: status,
        subTitle: 'Sorry, something went wrong.',
      };
  }

  return (
    <FullLayout>
      <SEO title={info.title} />
      <Container>
        {info.status}
        {info.title}
        {info.subTitle}
      </Container>
    </FullLayout>
  );
};

export default ErrorPage;

interface ErrorInfo {
  status: string;
  title: string;
  subTitle: string;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
