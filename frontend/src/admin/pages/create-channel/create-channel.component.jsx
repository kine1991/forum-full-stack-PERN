import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Input from 'shared/components/input/input.component';
import Button from 'shared/components/button/button.component';
import useForm from 'shared/utils/form/useForm';
import validate from 'shared/utils/form/validate';
import { createChannelAsync } from 'redux/channel/channel.action';
import { CreateChannelContainer } from './create-channel.styles';
import { useToast } from 'context/toast/toast.provider';

const initialState = {
  name: '1111',
  description: '1111',
  imageUrl: 'https://sun9-31.userapi.com/impg/c857732/v857732252/1b118f/pkjYNWa1vKw.jpg?size=100x0&quality=88&crop=7,7,1557,1557&sign=f8955dedd61d4be24c587e3b2695cbd9&ava=1'
}

const CreateChannel = ({ createChannel }) => {
  const { addToast } = useToast();
  const history = useHistory();

  const submit = () => {
    console.log('submit', values);
    createChannel(values).then(response => {
      addToast('Каннал Успешно Создан!', 6000, 'success', 'bottom' );
      console.log('response', response);
      history.push('/admin/own-channels');
    });
  }

  const { values, errors, handleChange, handleSubmit } = useForm(initialState, validate, submit);
  
  return (
    <CreateChannelContainer onSubmit={handleSubmit}>
      <h1>Создать канал</h1>
      <Input 
        fullWidth 
        label='Имя канала' 
        name='name'
        value={values.name}
        error={errors.name}
        onChange={handleChange}
      />
      <Input 
        fullWidth 
        label='Описание канала'
        name='description'
        value={values.description}
        error={errors.description}
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
      <Button type='submit' content='Создать' fullwidth/>
    </CreateChannelContainer>
  )
}

const mapDispatchToProps = dispatch => ({
  createChannel: (data) => dispatch(createChannelAsync(data))
});

export default connect(null, mapDispatchToProps)(CreateChannel);