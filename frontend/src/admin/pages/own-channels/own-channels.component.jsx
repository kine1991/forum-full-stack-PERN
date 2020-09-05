import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { fetchOwnChannelsAsync } from 'redux/channel/channel.action';
import { Table, Thead, Tbody, Tr, Th, Td, TdImage, Image, ButtonContainer } from './own-channels.styles';
import Button from 'shared/components/button/button.component';
import { Loader } from 'semantic-ui-react';
import PageNotFound from 'shared/components/page-not-found/page-not-found.component';
import { trashChannelByIdAsync } from 'redux/channel/channel.action';


const OwnChannels = ({ channels, isLoading, error, fetchOwnChannels, trashChannelById }) => {

  console.log('*', channels);

  useEffect(() => {
    fetchOwnChannels();
  }, [fetchOwnChannels]);

  const handleDelete = id => {

    console.log('id', id);
    trashChannelById(id);
  }

  if(error && error.status === 404) return <PageNotFound message={error.data.errors[0].message} />

  if((isLoading !== false) && (channels === null)) return (
    <Loader active inline='centered' />
  );

  if(isLoading === false && channels && channels.length === 0) return <div>Ни одного канала не создано!</div>


  return (
    <React.Fragment>
      <ButtonContainer>
        <Button content='Create Channel' to='/admin/own-channels/create'/>
      </ButtonContainer>
      <h1>OwnChannels</h1>
      <Table>
        <Thead>
          <Tr>
            <Th>img</Th>
            <Th>Id</Th>
            <Th>Name</Th>
            <Th>Slug</Th>
            <Th>Date</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {channels.map(channel => (
            <Tr key={channel.id}>
              <TdImage><Image src={channel.image_url_channel} /></TdImage>
              <Td>{channel.id}</Td>
              <Td>{channel.name}</Td>
              <Td>{channel.slug}</Td>
              <Td>{moment(channel.created_at).format('DD.MM.YYY | HH:mm')}</Td>
              <Td onClick={() => handleDelete(channel.id)}>delete</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  channels: state.channel.channels,
  isLoading: state.channel.isLoading,
  error: state.channel.error,
});

const mapDispatchToProps = dispatch => ({
  fetchOwnChannels: (data) => dispatch(fetchOwnChannelsAsync(data)),
  trashChannelById: (id) => dispatch(trashChannelByIdAsync(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(OwnChannels);