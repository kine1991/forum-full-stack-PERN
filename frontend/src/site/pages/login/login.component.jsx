import React from 'react';
import { connect } from 'react-redux';

import Input from 'shared/components/input/input.component';
import Button from 'shared/components/button/button.component';
import useForm from 'shared/utils/form/useForm';
import { LoginContainer } from './login.styles';
import { loginAsync } from 'redux/user/user.action';
import AuthFormError from 'site/components/auth-form-error/auth-form-error.component';

const initialState = {
  email: 'test@mail.ru',
  password: '123456'
}

const validateLogin = values => {
  const errors = {}
  // Email Errors
  if (!values.email) {
    errors.email = "Е-маил не должен быть пустым";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Не валидный е-маил";
  }
  // Password Errors
  if (!values.password) {
    errors.password = "Пароль не должен быть пустым";
  } else if (values.password.length < 6) {
    errors.password = "Пароль должен содержать как минимум 6 символов";
  }

  return errors;
}

const Login = ({ error, login }) => {
  const submit = () => {
    login(values);
  }

  const { values, errors, handleChange, handleSubmit } = useForm(initialState, validateLogin, submit);

  return (
    <LoginContainer onSubmit={handleSubmit}>
      <h1>Login</h1>
      {error && (
        <AuthFormError errors={error.errors} />
      )}
      <Input 
        fullWidth 
        label='Е-маил' 
        name='email'
        value={values.email}
        error={errors.email}
        onChange={handleChange}
      />
      <Input 
        fullWidth 
        label='Пароль' 
        name='password'
        value={values.password}
        error={errors.password}
        onChange={handleChange}
        type='password'
      />
      <Button type='submit' content='Войти' fullWidth/>
    </LoginContainer>
  )
}

const mapStateToProps = state => ({
  error: state.user.error
});

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(loginAsync(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);