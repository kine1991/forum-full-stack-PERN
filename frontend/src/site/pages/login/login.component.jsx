import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';

import { loginAsync } from 'redux/user/user.action';
import AuthFormError from 'site/components/auth-form-error/auth-form-error.component';

const Login = ({ error, login }) => {
  const [email, setEmail] = useState('test1@mail.ru');
  const [password, setPassword] = useState('123456');

  const handleSubmit = event => {
    event.preventDefault()

    console.log('error2', error)
    console.log('values', email, password)

    login({ email, password });
  }

  return (
    <React.Fragment>
      {error && (
        <AuthFormError errors={error.errors} />
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Email</label>
          <input 
            placeholder='Email' 
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input 
            placeholder='Password' 
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  error: state.user.error
});

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(loginAsync(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);