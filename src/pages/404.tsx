import React, { FC } from 'react';
import ErrorPage from '@components/pages/ErrorPage';

interface PropsType {}

const NotFoundPage: FC<PropsType> = () => {
  return <ErrorPage statusCode={404} />;
};

export default NotFoundPage;
