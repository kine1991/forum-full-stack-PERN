import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import FullHeightWithSpinner from 'shared/components/full-height-with-spinner/full-height-with-spinner.component';

const ProtectedIsAuthenticatedRoute = ({ currentUser, component: Component, ...rest }) => {
  return (
    <Route {...rest} render={
      (props) => {
        if(currentUser === undefined) {
          return <FullHeightWithSpinner />
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