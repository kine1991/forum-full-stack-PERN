import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import Input from 'shared/components/input/input.component';
import Button from 'shared/components/button/button.component';
import useForm from 'shared/utils/form/useForm';
import validate from 'shared/utils/form/validate';
import { editChannelAsync, fetchChannelByIdAsync, clearAsync } from 'redux/channel/channel.action';
import { EditChannelContainer } from './edit-channel.styles';
import { useState } from 'react';

const EditChannel = ({ channel, fetchChannelById, editChannelById, clear }) => {
  const history = useHistory();
  let { id } = useParams();
  const [initialState, setInitialState] = useState({
    name: '',
    description: '',
    imageUrl: ''
  });

  useEffect(() => {
    fetchChannelById(id);
  }, [fetchChannelById, id]);

  useEffect(() => {
    if(channel) {
      setInitialState({
        name: channel.name,
        description: channel.description,
        imageUrl: channel.image_url_channel
      });
    }
    return () => {
      clear();
    }
  }, [channel, clear]);

  const submit = () => {
    clear();
    editChannelById({ id, name: values.name, description: values.description, image_url_channel: values.imageUrl })
    .then(response => {
      history.push('/admin/own-channels');
    });
  }

  const { values, errors, handleChange, handleSubmit } = useForm(initialState, validate, submit);

  return (
    <EditChannelContainer onSubmit={handleSubmit}>
      <h1>Изменить данные канала</h1>
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
      <Button type='submit' content='Изменить' fullwidth/>
    </EditChannelContainer>
  )
}

const mapStateToProps = state => ({
  channel: state.channel.channel
});

const mapDispatchToProps = dispatch => ({
  fetchChannelById: (data) => dispatch(fetchChannelByIdAsync(data)),
  editChannelById: (data) => dispatch(editChannelAsync(data)),
  clear: () => dispatch(clearAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(EditChannel);