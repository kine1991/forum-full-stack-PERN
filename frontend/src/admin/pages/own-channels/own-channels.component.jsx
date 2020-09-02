import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchOwnChannelsAsync } from 'redux/channel/channel.action';


const OwnChannels = ({ channels, fetchOwnChannels }) => {

  console.log('*', channels);

  useEffect(() => {
    fetchOwnChannels();
  }, []);

  return (
    <div>
      OwnChannels
    </div>
  )
}

const mapStateToProps = state => ({
  channels: state.channel.channels
});

const mapDispatchToProps = dispatch => ({
  fetchOwnChannels: (data) => dispatch(fetchOwnChannelsAsync(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(OwnChannels);