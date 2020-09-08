import React from 'react';

import { InputContainer, Input, Label, ErrorMessage } from './input.styles';

const InputComponent = ({ fullWidth, label, error, ...props }) => {
  // console.log('input', label)
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

export default InputComponent;

// export default React.memo(InputComponent, function areEqual(prevProps, nextProps) {
//   return prevProps.value === nextProps.value;
// });