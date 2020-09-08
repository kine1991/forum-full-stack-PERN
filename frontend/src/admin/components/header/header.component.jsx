import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { logoutAsync } from 'redux/user/user.action';
import { HeaderContainer, Header, Hamburger, HamburgerButton, HamburgerButtonBar, Sidebar, Backdrop, Close, SidebarContent, SidebarItems, SidebarItem, SidebarText, HeaderItemsRight, HeaderItemsLeft, HeaderItem, HeaderLogout, UserContainer, UserName, UserPhotoContainer, UserPhotoImage } from './header.styles';

const links = [
  {
    to: '/',
    exact: true,
    name: 'Site',
    forIsAuthenticatedUser: true
  },
  {
    to: '/admin',
    exact: true,
    name: 'Admin Panel',
    forIsAuthenticatedUser: true
  },
  {
    to: '/admin/channels',
    exact: true,
    name: 'Channels',
    forIsAuthenticatedUser: true
  },
  {
    to: '/admin/own-channels',
    exact: true,
    name: 'Own Channels',
    forIsAuthenticatedUser: true
  },
]

const HeaderComponent = ({ currentUser, isLoading, logout }) => {
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(null);
  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    if(isLoading === false) setIsAuthenticatedUser(currentUser ? true : false);
  }, [currentUser, isLoading]);

  return (
    <HeaderContainer>
      <Header>
        <Hamburger>
          <HamburgerButton onClick={() => setOpenSidebar(!openSidebar)}>
            <HamburgerButtonBar />
            <HamburgerButtonBar />
            <HamburgerButtonBar />
          </HamburgerButton>
        </Hamburger>
        <HeaderItemsLeft>
          {links.map(link => {
            if(link.forIsAuthenticatedUser === null) return <HeaderItem key={link.to} exact={link.exact} to={link.to}>{link.name}</HeaderItem>
            if(link.forIsAuthenticatedUser !== null && isAuthenticatedUser === link.forIsAuthenticatedUser) return <HeaderItem key={link.to} exact={link.exact} to={link.to}>{link.name}</HeaderItem>
            return <div key={link.to}></div>
          })}
        </HeaderItemsLeft>
        <HeaderItemsRight>
          {!currentUser && isLoading === false && (
            <React.Fragment>
              <HeaderItem to='/login'>Войти</HeaderItem>
              <HeaderItem to='/register'>Регистрация</HeaderItem>
            </React.Fragment>
          )}
          {currentUser && isLoading === false && (
            <React.Fragment>
              <UserContainer>
                <UserName>{currentUser.nickname}</UserName>
                <UserPhotoContainer>
                  <UserPhotoImage src={currentUser.image_url} alt="img"  />
                </UserPhotoContainer>
              </UserContainer>
              <HeaderLogout onClick={() => logout()}>Выйти</HeaderLogout>
            </React.Fragment>
          )}
        </HeaderItemsRight>

      </Header>
        <Sidebar openSidebar={openSidebar}>
          <SidebarContent>
            <Close onClick={() => setOpenSidebar(false)}>&times;</Close>
            <SidebarItems>
              {links.map(link => {
                if(link.forIsAuthenticatedUser === null) return <SidebarItem key={link.to}><SidebarText exact={link.exact} to={link.to}>{link.name}</SidebarText></SidebarItem>
                if(link.forIsAuthenticatedUser !== null && isAuthenticatedUser === link.forIsAuthenticatedUser) return <SidebarItem key={link.to}><SidebarText exact={link.exact} to={link.to}>{link.name}</SidebarText></SidebarItem>
                return <div key={link.to}></div>
              })}
            </SidebarItems> 
          </SidebarContent>
        </Sidebar>
        <Backdrop openSidebar={openSidebar} onClick={() => setOpenSidebar(false)} />
    </HeaderContainer>
  )
}

const mapStateToProps = state => ({
  currentUser: state.user.user,
  isLoading: state.user.isLoading
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);