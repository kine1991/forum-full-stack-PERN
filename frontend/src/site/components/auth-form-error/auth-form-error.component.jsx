import React from 'react';
import { Message } from 'semantic-ui-react';

const AuthFormError = ({ errors }) => {
  return (
    <React.Fragment>
      <Message color='red'>{errors[0].message}</Message> 
    </React.Fragment>
  )
}

export default AuthFormError;