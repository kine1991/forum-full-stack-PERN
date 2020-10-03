import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { Table, Loader } from 'semantic-ui-react';
import moment from 'utils/moment';
// import PaginationComponent from 'shared/components/pagination/pagination.component';
import { fetchChannelsAsync, deleteChannelByIdAsync } from 'redux/channel/channel.action';
import PageNotFound from 'shared/components/page-not-found/page-not-found.component';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Channels = ({ channels, isLoading, error, fetchChannels, deleteChannelById }) => {
  let query = useQuery();
  let page = query.get('page') ? query.get('page') : 1;
  let limit = query.get('limit') ? query.get('limit') : 20;

  useEffect(() => {
    fetchChannels({ page, limit });
  }, [fetchChannels, page, limit]);

  const handleDelete = (id) => {
    console.log('handleDelete', id)
    deleteChannelById(id)
  }

  if(error && error.status === 404) return <PageNotFound message={error.data.errors[0].message} />
  if((isLoading !== false)/* && (channels === null)*/) return (<Loader active inline='centered' />);
  if(isLoading === false && channels === null) return <div>Ни одного канала не создано!@@</div>
  if(isLoading === false && channels && channels.length === 0) return <div>Ни одного канала не создано!</div>
  if(channels === null) {
    console.log('debug channels', channels);
    return (<div>channels === null</div>)
  }

  return (
    <React.Fragment>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{width: '64px'}}>image</Table.HeaderCell>
            <Table.HeaderCell>id</Table.HeaderCell>
            <Table.HeaderCell>name</Table.HeaderCell>
            <Table.HeaderCell>date</Table.HeaderCell>
            <Table.HeaderCell>delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {channels.map(channel => (
            <Table.Row key={channel.id}>
              <Table.Cell>
                <img src="https://habrastorage.org/getpro/habr/avatars/e18/935/57e/e1893557eeaacf388b0e596d910014c8.jpg" alt=""/>
              </Table.Cell>
              <Table.Cell>{channel.id}</Table.Cell>
              <Table.Cell>
                <Link to={`/channels/${channel.slug}`}>{channel.name}</Link>
              </Table.Cell>
              <Table.Cell>{moment(channel.created_at).format('DD.MM.YYY | HH:mm')}</Table.Cell>
              <Table.Cell>
                <p onClick={() => handleDelete(channel.id)}>delete</p>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
          {/* <PaginationComponent /> */}
        </Table.Footer>
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
  fetchChannels: (data) => dispatch(fetchChannelsAsync(data)),
  deleteChannelById: (id) => dispatch(deleteChannelByIdAsync(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Channels);