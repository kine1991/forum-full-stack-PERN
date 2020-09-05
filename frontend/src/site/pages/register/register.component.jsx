import React from 'react';
import { connect } from 'react-redux';

import { registerAsync } from 'redux/user/user.action';
import AuthFormError from 'site/components/auth-form-error/auth-form-error.component';
import { RegisterContainer } from './register.styles';
import Input from 'shared/components/input/input.component';
import Button from 'shared/components/button/button.component';
import useForm from 'shared/utils/form/useForm';

const initialState = {
  nickname: 'test2',
  email: 'test2@mail.ru',
  password: '123456',
  imageUrl: 'https://habrastorage.org/getpro/habr/avatars/e18/935/57e/e1893557eeaacf388b0e596d910014c8.jpg'
}

const validateRegister = values => {
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
  // Nickname Errors
  if (!values.nickname) {
    errors.nickname = "Ник не должен быть пустым";
  } else if (values.nickname.length < 3) {
    errors.nickname = "Ник должен содержать как минимум 3 символов";
  }
  // Image Url Errors
  if (!values.imageUrl) {
    errors.imageUrl = "Url изображения не должен быть пустым";
  } else if (values.imageUrl.length < 6) {
    errors.imageUrl = "Url изображения должен содержать как минимум 6 символов";
  }

  return errors;
}

const Register = ({ error, register }) => {
  const submit = () => {
    register(values);
  }

  const { values, errors, handleChange, handleSubmit } = useForm(initialState, validateRegister, submit);

  // const [nickname, setNickname] = useState('test1');
  // const [email, setEmail] = useState('test1@mail.ru');
  // const [imageUrl, setImageUrl] = useState('https://habrastorage.org/getpro/habr/avatars/e18/935/57e/e1893557eeaacf388b0e596d910014c8.jpg');
  // const [password, setPassword] = useState('123456');

  // const handleSubmit = event => {
  //   event.preventDefault()

  //   register({nickname, email, imageUrl, password});
  // }
  
  return (
    <RegisterContainer onSubmit={handleSubmit}>
      <h1>Register</h1>
      {error && (
        <AuthFormError errors={error.errors} />
      )}

      <Input 
        fullWidth 
        label='Ник' 
        name='nickname'
        value={values.nickname}
        error={errors.nickname}
        onChange={handleChange}
      />
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
        label='Url изображения' 
        name='imageUrl'
        value={values.imageUrl}
        error={errors.imageUrl}
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
    </RegisterContainer>
  )
}

const mapStateToProps = state => ({
  error: state.user.error
});

const mapDispatchToProps = dispatch => ({
  register: data => dispatch(registerAsync(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);