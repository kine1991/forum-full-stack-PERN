import React, { useState } from 'react'
import { connect } from 'react-redux';
// import { Form, Button } from 'semantic-ui-react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import { createTopicAsync } from 'redux/topic/topic.action';
import { useToast } from 'context/toast/toast.provider';
import { CreateTopicContainer, Title } from './create-topic.styles'
import Input from 'shared/components/input/input.component';
import ButtonComponent from 'shared/components/button/button.component';

const CreateTopic = ({ createTopic }) => {
  const { addToast } = useToast();
  let { slug } = useParams();
  const history = useHistory();
  const [name, setName] = useState('');

  const handleClick = event => {
    event.preventDefault();

    if(name.length < 2) {
      addToast('поле должно быть как минимум 2 символа', 6000, 'danger', 'bottom' );
    } else {
      createTopic({ name, channel_slug: slug }).then(response => {
        addToast('Топик Успешно Создан!', 6000, 'success', 'bottom' );
  
        const timer = setTimeout(() => {
          history.push(`/channels/${slug}`);
          clearTimeout(timer);
        }, [1000]);
      });
    }
  }

  return (
    <CreateTopicContainer>
      {/* {error && (<AuthFormError errors={error.errors} />)} */}
      <Button size='tiny' /*onClick={() => handleBack()}*/><Icon name='left arrow'/>Назад</Button>

      <Title>Создать тему</Title>
      <Input 
        fullWidth 
        label='Имя канала' 
        name='name'
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <ButtonComponent type='button' fullWidth content='Создать' onClick={handleClick} fullwidth/>
      {/* <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Name</label>
          <input 
            placeholder='Name' 
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form> */}
    </CreateTopicContainer>
  )
}

const mapDispatchToProps = dispatch => ({
  createTopic: ({ name, channel_slug }) => dispatch(createTopicAsync({ name, channel_slug }))
});

export default connect(null, mapDispatchToProps)(CreateTopic);