import React from 'react';
import { connect } from 'react-redux';
import { Menu, Image, List, Dropdown, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { MaxWidth } from './header.styles';
import { logoutAsync } from 'redux/user/user.action';
import { useState } from 'react';
import { Space } from './header.styles';

const Header = ({ currentUser, isLoading, logout }) => {
  const [activeItem, setActiveItem] = useState('');

  const handleItemClick = (e, { name }) => setActiveItem(name);
  // console.log('currentUser', currentUser);
  return (
    <React.Fragment>
    <Menu stackable>
      <MaxWidth>
        <Menu.Item name='browse' active={activeItem === 'browse'} onClick={handleItemClick} as={Link} to='/'>Home</Menu.Item>
        <Menu.Item name='channels' active={activeItem === 'channels'} onClick={handleItemClick} as={Link} to='/channels'>Channels</Menu.Item>
        <Menu.Item name='submit' active={activeItem === 'submit'} onClick={handleItemClick} as={Link} to='/about'>About</Menu.Item>
        {currentUser && isLoading === false && (
          <Menu.Item name='create-channel' active={activeItem === 'create-channel'} onClick={handleItemClick} as={Link} to='/create-channel'>Create Channel</Menu.Item>
        )}
        <Space />
        {!currentUser && isLoading === false && (
          <React.Fragment>
            <Menu.Item name='login' active={activeItem === 'login'} onClick={handleItemClick} as={Link} to='/login'>Login</Menu.Item>
            <Menu.Item name='register' active={activeItem === 'register'} onClick={handleItemClick} as={Link} to='/register'>Register</Menu.Item>
          </React.Fragment>
        )}
        {currentUser && isLoading === false && (
          <React.Fragment>
            <Menu.Item name='admin' active={activeItem === 'admin'} onClick={handleItemClick} as={Link} to='/admin'>Admin</Menu.Item>
            <Menu.Item>
              <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
            </Menu.Item>
            <Dropdown item  text={currentUser.nickname}>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </React.Fragment>
        )}
      </MaxWidth>
    </Menu>

  </React.Fragment>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.user,
  isLoading: state.user.isLoading
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);