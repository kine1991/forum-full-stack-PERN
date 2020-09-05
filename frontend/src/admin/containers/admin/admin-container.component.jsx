import React from 'react';
import {Route, Switch } from 'react-router-dom';
import Header from 'admin/components/header/header.component';
import Layout from 'admin/components/layout/layout.component';
import Channels from 'admin/pages/channels/channels.component';
import OwnChannels from 'admin/pages/own-channels/own-channels.component';
import CreateChannel from 'admin/pages/create-channel/create-channel.component';

const Home = () => {
  return (
    <div>
      Home2
    </div>
  )
}

const AdminContainer = () => {
  return (
    <React.Fragment>
      <Header />
      <Layout>
        <Switch>
          <Route exact path='/admin' component={Home} />
          <Route path='/admin/channels' component={Channels} />
          <Route exact path='/admin/own-channels' component={OwnChannels} />
          <Route path='/admin/own-channels/create' component={CreateChannel} />
        </Switch>
      </Layout>
    </React.Fragment>
  )
}

export default AdminContainer;