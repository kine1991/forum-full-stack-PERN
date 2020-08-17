import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';

import { registerAsync } from 'redux/user/user.action';
import AuthFormError from 'site/components/auth-form-error/auth-form-error.component';

const Register = ({ error, register }) => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault()

    register({nickname, email, imageUrl, password});
  }
  
  return (
    <React.Fragment>
      {error && (
        <AuthFormError errors={error.errors} />
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Nick Name</label>
          <input 
            placeholder='Nick Name' 
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input 
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Image Url</label>
          <input 
            placeholder='Image Url'
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
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
  register: data => dispatch(registerAsync(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);