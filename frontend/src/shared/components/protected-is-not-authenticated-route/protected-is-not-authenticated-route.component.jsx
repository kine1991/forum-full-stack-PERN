import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedIsAuthenticatedRoute = ({ currentUser, component: Component, ...rest }) => {
  return (
    <Route {...rest} render={
      (props) => {
        console.log('currentUser', currentUser);
        if(currentUser === null) {
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