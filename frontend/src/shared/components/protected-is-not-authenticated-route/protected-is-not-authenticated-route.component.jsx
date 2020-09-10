import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';

import { LoaderContainer } from './protected-is-not-authenticated-route.styles';

const ProtectedIsAuthenticatedRoute = ({ currentUser, component: Component, ...rest }) => {
  return (
    <Route {...rest} render={
      (props) => {
        if(currentUser === undefined) {
          return <LoaderContainer><Loader active inline='centered'/></LoaderContainer>
        } else if(currentUser === null) {
          return <Component {...props} />
        } else {
          return <Redirect to='/' />
        }
      }
    }/>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.user
});

export default connect(mapStateToProps)(ProtectedIsAuthenticatedRoute);