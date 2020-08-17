import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';

import { createTopicAsync } from 'redux/topic/topic.action';


const CreateTopic = ({ createTopic }) => {
  let { slug } = useParams();
  const [name, setName] = useState('');

  const handleSubmit = event => {
    event.preventDefault()
    // console.log('name', name);

    createTopic({ name, channel_slug: slug })
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