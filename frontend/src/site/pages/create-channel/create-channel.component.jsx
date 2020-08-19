import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';

import AuthFormError from 'site/components/auth-form-error/auth-form-error.component';
import { createChannelAsync } from 'redux/channel/channel.action';

const CreateChannel = ({ error, createChannel }) => {
  const [name, setName] = useState('ЖК Лахта');
  const [imageUrl, setImageUrl] = useState('https://cdn-07.pronovostroy.ru/object/2016-12-23/585ce5e893c0a572579e129f/images/340x190/5f329bde7caca.jpg');
  const [description, setDescription] = useState('Комплекс апартаментов «Лахта Парк» – инновационный проект, расположенный в Приморском районе Санкт-Петербурга, в микрорайоне Ольгино. Купить недвижимость можно в рассрочку с первоначальным взносом от 30%, есть беспроцентный вариант на полгода, либо рассрочка до 4 лет под 12% годовых на остаток. Ипотеку предоставляют ведущие банки – Альфа-банк, Абсолют банк, ВТБ, банк Санкт-Петербург, ВИБ, Росбанк, Газпромбанк, ДОМ РФ, Райффайзен банк и прочие. Проект введен в эксплуатацию. В составе Комплекса апартаментов «Лахта Парк» 18 многоквартирных секций в 4 этажа высотой. Технология застройки монолитно-кирпичная. Плюс 10 отдельных коттеджей и 50 сити-вилл, всего 78 зданий. Фасады отделаны керамогранитом, кровли плоские. Архитектура минималистичная, в натуральных тонах. Изюминка каждого здания – индивидуальное панно. На придомовой территории уютные дворы, детские площадки, гравийные дорожки для прогулок. Для авто выделены парковки, проложены асфальтированные дороги. Есть вертолетная площадка и свой СПА-центр. В наличие коммерческие помещения под внутреннюю инфраструктуру. Благодаря удачной локации Лахта Парк становится уникальным местом: резиденты могут быстро и без пробок, добраться от дома до работы, при этом наслаждаясь всеми преимуществами жизни на природе, в новом, продуманном до мелочей квартале. В Лахта Парке вы можете выбрать различные виды недвижимости: апартаменты от 50 – 142 кв.м, высота потолков составляет 3,1 м. Сити-виллы (дом на 3-4 семьи) площадью от 70-120 кв.м, здесь свободная планировка, высота потолков 3 – 3,5 м.. Отдельный коттедж площадью 332кв.м. А также видовые пентхаусы с террасой.');

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