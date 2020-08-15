import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class MenuExampleMenus extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Menu.Item
          name='browse'
          active={activeItem === 'browse'}
          onClick={this.handleItemClick}
          as={Link} to='/'
        >Home</Menu.Item>

        <Menu.Item
          name='submit'
          active={activeItem === 'submit'}
          onClick={this.handleItemClick}
          as={Link} to='/about'
        >About</Menu.Item>

        <Menu.Item
          name='admin'
          active={activeItem === 'admin'}
          onClick={this.handleItemClick}
          as={Link} to='/admin'
        >Admin</Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item
            name='signup'
            active={activeItem === 'signup'}
            onClick={this.handleItemClick}
          >
            Sign Up
          </Menu.Item>

          <Menu.Item
            name='help'
            active={activeItem === 'help'}
            onClick={this.handleItemClick}
          >
            Help
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

// import React from 'react';
// import { Link, useRouteMatch } from 'react-router-dom';
// import { Header, Segment, Button, Dropdown, Menu } from 'semantic-ui-react';
// // import { Button, Dropdown, Menu } from 'semantic-ui-react'


// const HeaderComponent = () => {
//   let { path, url } = useRouteMatch();

//   const handleClick = () => {
//     console.log('url', url)
//     console.log('path', path)
//   }
//   return (
//     <Segment clearing>
//       <Header as='h2' floated='right'>
//         <Button as={Link} to='/' >Home</Button>
//         <Button as={Link} to='/about' >About</Button>
//         <Button onClick={handleClick} >Test</Button>
//       </Header>
//       <Header as='h2' floated='left'>
//         Float Left
//       </Header>
//     </Segment>
//   )
// }

// export default HeaderComponent;

