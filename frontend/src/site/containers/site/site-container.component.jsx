import React from 'react'
import { /*Link,*/ Route, Switch } from 'react-router-dom';

import Header from 'site/components/header/header.component';
import Footer from 'site/components/footer/footer.component';
import Layout from 'shared/components/layout/layout.component';
import Register from 'site/pages/register/register.component';
import Login from 'site/pages/login/login.component';
import CreateChannel from 'site/pages/create-channel/create-channel.component';
import Home from 'site/pages/home/home.component';
import Channels from 'site/pages/channels/channels.component';
import Channel from 'site/pages/channel/channel.component';
import CreateTopic from 'site/pages/create-topic/create-topic.componen';
import Topic from 'site/pages/topic/topic.component';

const SiteContainer = () => {
  return (
    <React.Fragment>
      <Header />
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/channels' component={Channels} />
          <Route exact path='/channels/:slug' component={Channel} />
          <Route path='/channels/:slug/create' component={CreateTopic} />
          <Route path='/topics/:slug' component={Topic} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/create-channel' component={CreateChannel} />
        </Switch>
      </Layout>
      <Footer />
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