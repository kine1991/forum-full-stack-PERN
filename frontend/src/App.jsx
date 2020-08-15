import React from 'react';
// import './App.css';
// import axios from 'axios';

import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  // Link,
  // useParams,
  // useRouteMatch
} from "react-router-dom";

import SiteContainer from './site/containers/site/site-container.component';
import AdminContainer from './admin/containers/admin/admin-container.component';

const App = () => {
  // React.useEffect(() => {
  //   axios.get('/api/books').then(response => {
  //     console.log('response', response);
  //   })
  // }, []);
  return (
    <div>
      <Switch>
        <Route path='/admin' component={AdminContainer} />
        <Route path='' exact component={SiteContainer} />
      </Switch>
    </div>
  );
}

export default App;
