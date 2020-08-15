import React from 'react'
import { Link, Route } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      Home2
    </div>
  )
}

const About = () => {
  return (
    <div>
      About2
    </div>
  )
}

const AdminContainer = () => {
  return (
    <div>
      <Link to='/admin'>Home2</Link>
      <Link to='/admin/about'>About2</Link>
      <Link to='/'>Root</Link>
      <Route exact path='/admin' component={Home} />
      <Route path='/admin/about' component={About} />
      AdminContainer
    </div>
  )
}

export default AdminContainer;