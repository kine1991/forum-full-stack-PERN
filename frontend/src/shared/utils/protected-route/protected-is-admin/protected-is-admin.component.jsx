import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';

import { LoaderContainer } from './protected-is-admin.styles';

const ProtectedIsAdmin = ({ currentUser, component: Conponent, ...rest }) => {
  return (
    <Route {...rest} render={
      (props) => {
        if(currentUser === undefined) {
          return <LoaderContainer><Loader active inline='centered'/></LoaderContainer>
        } else if((currentUser && currentUser.role === 'admin') || (currentUser && currentUser.role === 'superadmin')) {
          return <Conponent {...props} />
        } else if(currentUser === null) {
          return <Redirect to='/'/>
        } else {
          return <Redirect to='/admin'/>
        }
      }
    } />
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.user
});

export default connect(mapStateToProps)(ProtectedIsAdmin);