import React from 'react';

import { Button, ButtonLink } from './button.styles';

const ButtonComponent = ({ content, to }) => {
  console.log('to', to)
  if(to === undefined) {
    return (
      <Button>{content}</Button>
    )
  } else {
    return (
      <ButtonLink to={to}>{content}</ButtonLink>
    )
  }
}

export default ButtonComponent;
