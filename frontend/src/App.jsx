import React, { useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from "react-router-dom";

import ProtectedIsAuthenticatedRoute from 'shared/components/protected-is-authenticated-route/protected-is-authenticated-route.components';
import { FullHeight } from './App.styles';
import FullHeightContainer from 'shared/components/full-height/full-height.component';
import { checkAuthAsync } from 'redux/user/user.action';

const SiteContainer = lazy(() => import('site/containers/site/site-container.component'));
const AdminContainer = lazy(() => import('admin/containers/admin/admin-container.component'));

const App = ({ checkAuth }) => {
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <div>
      <Suspense fallback={<FullHeightContainer/>}>
        <Switch>
          <ProtectedIsAuthenticatedRoute exact path='/admin' component={AdminContainer} />
          <Route path='' exact component={SiteContainer} />
        </Switch>
      </Suspense>
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
