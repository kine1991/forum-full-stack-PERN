import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';

import { LoaderContainer } from './protected-is-authenticated-route.styles';

const ProtectedIsAuthenticatedRoute = ({ currentUser, component: Component, ...rest }) => {
  return (
    <Route {...rest} render={
      (props) => {
        if(currentUser === undefined) {
          return <LoaderContainer><Loader active inline='centered'/></LoaderContainer>
        } else if(currentUser === null) {
          return <Redirect to='/login' />
        } else {
          return <Component {...props} />
        }
      }
    }/>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.user
});

export default connect(mapStateToProps)(ProtectedIsAuthenticatedRoute);