import React from 'react';

import { Button, ButtonLink } from './button.styles';

const ButtonComponent = ({ content, to, fullWidth, ...props }) => {
  // console.log('fullWidth', fullWidth)
  if(to === undefined) {
    return (
      <Button {...props} fullWidth={fullWidth}>{content}</Button>
    )
  } else {
    return (
      <ButtonLink to={to} {...props}>{content}</ButtonLink>
    )
  }
}

export default ButtonComponent;
