import React from 'react';

import { InputContainer, Input, Label, ErrorMessage } from './input.styles';

const InputComponent = ({ fullWidth, label, error, ...props }) => {
  console.log('ddd')
  return (
    <InputContainer>
      {label ? <Label error={error}>{label}</Label> : null}
      <Input 
        fullWidth={fullWidth} 
        error={error}
        {...props}
      />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
    </InputContainer>
  );
}

export default React.memo(InputComponent);