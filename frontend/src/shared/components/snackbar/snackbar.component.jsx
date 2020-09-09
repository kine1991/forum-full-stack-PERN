import React from 'react';

import { useSnackbar } from 'context/snackbar.context';
import { SnackbarContainer, SnackbarContent, SnackbarClose } from './snackbar.styles';

export const Snackbar = () => {
  const {isActive, color, message} = useSnackbar();
  return isActive ? (
    <SnackbarContainer color={color} isActive={isActive}>
      {/* <SnackbarContent>{message}</SnackbarContent>
      <SnackbarClose onClick={() =``> this.setState({ isActive: false })}>&times;</SnackbarClose> */}
    </SnackbarContainer>
  ) : null
}
