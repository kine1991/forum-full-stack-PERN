import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { useParams, useHistory } from 'react-router-dom';

import { createTopicAsync } from 'redux/topic/topic.action';
import { useToast } from 'context/toast/toast.provider';

const CreateTopic = ({ createTopic }) => {
  const { addToast } = useToast();
  let { slug } = useParams();
  const history = useHistory();
  const [name, setName] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    createTopic({ name, channel_slug: slug }).then(response => {
      addToast('Топик Успешно Создан!', 6000, 'success', 'bottom' );

      const timer = setTimeout(() => {
        history.push(`/channels/${slug}`);
        clearTimeout(timer);
      }, [1000]);
    });
  }

  return (
    <React.Fragment>
      {/* {error && (
        <AuthFormError errors={error.errors} />
      )} */}
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Name</label>
          <input 
            placeholder='Name' 
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    </React.Fragment>
  )
}

const mapDispatchToProps = dispatch => ({
  createTopic: ({ name, channel_slug }) => dispatch(createTopicAsync({ name, channel_slug }))
});

export default connect(null, mapDispatchToProps)(CreateTopic);