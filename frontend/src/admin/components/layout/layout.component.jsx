import React from 'react';

import { Container } from './layout.styles';

const Layout = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

export default Layout;