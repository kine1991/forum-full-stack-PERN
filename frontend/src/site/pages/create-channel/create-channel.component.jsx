import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';

import AuthFormError from 'site/components/auth-form-error/auth-form-error.component';
import { createChannelAsync } from 'redux/channel/channel.action';

const CreateChannel = ({ error, createChannel }) => {
  const [name, setName] = useState('ЖК «Фортеция»');
  const [imageUrl, setImageUrl] = useState('https://cdn-07.pronovostroy.ru/object/2018-05-24/5b06915c93c0a55f1dd39149/images/902x512/5b0697115bf73.jpg');
  const [description, setDescription] = useState('ЖК «Фортеция» - это уютная новостройка от компании «Setl City». Застройка класса «комфорт» реализуется в городе Кронштадт, рядом с городским пляжем. Проект малоэтажный, содержит 5 строений в 4 этажа. Архитектура современная, фасады отделаны красным кирпичом, уюта придают двускатные крыши. В составе квартиры от студий до трехкомнатных, присутствует как классика в планировочных решениях, так и евроформат. Для авто жильцов есть подземный паркинг с отоплением. На первых ярусах жилых корпусов коммерческие помещения под внутреннюю инфраструктуру, здесь появятся магазины, аптеки, пекарня, банковские отделения. Также откроется СПА-центр и фитнес-клуб. Территория будет закрытой и охраняемой, во дворе ландшафтный дизайн.');

  const handleSubmit = event => {
    event.preventDefault();

    console.log('name', name);
    console.log('description', description);
    console.log('imageUrl', imageUrl);

    createChannel({ name, description, image_url_channel: imageUrl });
  }
  return (
    <React.Fragment>
      {error && (
        <AuthFormError errors={error.errors} />
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Name</label>
          <input 
            placeholder='Name' 
            value={name}
            onChange={e => setName(e.target.value)}
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
          <label>Description</label>
          <input 
            placeholder='Description' 
            value={description}
            onChange={e => setDescription(e.target.value)}
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
  createChannel: data => dispatch(createChannelAsync(data))
  // login: data => dispatch(loginAsync(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateChannel);