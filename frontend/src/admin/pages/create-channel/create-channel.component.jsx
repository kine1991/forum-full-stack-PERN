import React from 'react';
import { CreateChannelContainer } from './create-channel.styles';
import Input from 'shared/components/input/input.component';
import Button from 'shared/components/button/button.component';
import useForm from 'shared/utils/form/useForm';
import validate from 'shared/utils/form/validate';

const initialState = {
  name: '',
  description: '',
  imageUrl: ''
}

const CreateChannel = () => {
  const submit = () => {
    console.log('submit', values);
  }

  const { values, errors, handleChange, handleSubmit } = useForm(initialState, validate, submit);

  return (
    <CreateChannelContainer onSubmit={handleSubmit}>
      <h1>CreateChannel</h1>
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
      <Button type='submit' content='Create Channel' fullwidth/>
    </CreateChannelContainer>
  )
}

export default CreateChannel;