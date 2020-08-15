import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import './App.css';
// import axios from 'axios';
import { checkAuthAsync } from 'redux/user/user.action';

import {
  // BrowserRouter,
  Switch,
  Route,
  // Link,
  // useParams,
  // useRouteMatch
} from "react-router-dom";

import SiteContainer from './site/containers/site/site-container.component';
import AdminContainer from './admin/containers/admin/admin-container.component';

const App = ({ checkAuth }) => {
  useEffect(() => {
    checkAuth();
    // axios.get('/api/users/check-auth', {
    //   withCredentials: true
    // }).then(response => {
    //   console.log('response22', response);
    // })
  }, []);
  return (
    <div>
      <Switch>
        <Route path='/admin' component={AdminContainer} />
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
