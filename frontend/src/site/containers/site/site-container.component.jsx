import React from 'react'
import { /*Link,*/ Route, Switch } from 'react-router-dom';

import Header from '../../components/header/header.component';
import Layout from 'shared/components/layout/layout.component';
import Register from 'site/pages/register/register.component';
import Login from 'site/pages/login/login.component';

const Home = () => {
  return (
    <div>
      Home
    </div>
  )
}

const About = () => {
  return (
    <div>
      About
    </div>
  )
}

const SiteContainer = () => {
  return (
    <React.Fragment>
      <Header />
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Switch>
      </Layout>
    </React.Fragment>
  )
}

export default SiteContainer;



// import React from 'react';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   // useParams,
//   useRouteMatch
// } from "react-router-dom";

// import Header from '../../components/header/header.component';
// import About from '../../pages/about/about.component';
// import Home from '../../pages/home/home.component';

// const SiteContainer = () => {
//   let { path, url } = useRouteMatch();
//   // console.log('path', `${path}About`)
//   return (
//     <div>
//         {/* <Header /> */}
//         <Link to='/'>Home</Link>
//         <Link to='/about'>About</Link>
//         <Switch>
//           <Route exact path='/' componen={Home}/>
//           <Route path='/about' componen={About}/>
//         </Switch>
//     </div>
//   )
// }

// export default SiteContainer;