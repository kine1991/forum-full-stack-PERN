import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchChannelsAsync } from 'redux/channel/channel.action';

const Home = ({ channels, fetchChannels }) => { 
  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]); 

  return (
    <div>
      Home
    </div>
  )
}

const mapStateToProps = state => ({
  channels: state.channel.channels
});

const mapDispatchToProps = dispatch => ({
  fetchChannels: () => dispatch(fetchChannelsAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);