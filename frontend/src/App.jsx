import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { checkAuthAsync } from 'redux/user/user.action';

import { Switch, Route } from "react-router-dom";

import SiteContainer from './site/containers/site/site-container.component';
import AdminContainer from './admin/containers/admin/admin-container.component';
import ProtectedIsAuthenticatedRoute from 'shared/components/protected-is-authenticated-route/protected-is-authenticated-route.components';

const App = ({ checkAuth }) => {
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <div>
      <Switch>
        <ProtectedIsAuthenticatedRoute path='/admin' component={AdminContainer} />
        {/* <Route path='/admin' component={AdminContainer} /> */}
        <Route path='' exact component={SiteContainer} />
      </Switch>
    </div>
  );
}

// const mapStateToProps = state => ({
//   error: state.user.error
// });

const mapDispatchToProps = dispatch => ({
  checkAuth: () => dispatch(checkAuthAsync())
});

export default connect(null, mapDispatchToProps)(App);
