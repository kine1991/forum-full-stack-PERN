import React from 'react';

import { PageNotFoundContainer, Title, Description } from './page-not-found.styles';

const PageNotFound = ({ message }) => {
  console.log('M', message);
  return (
    <PageNotFoundContainer>
      <Title>404</Title>
      <Description>{message}</Description>
    </PageNotFoundContainer>
  )
}

export default PageNotFound;
