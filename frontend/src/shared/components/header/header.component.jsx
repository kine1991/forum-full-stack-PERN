import React, { useState } from 'react';
import { connect } from 'react-redux';

import { logoutAsync } from 'redux/user/user.action';
import { HeaderContainer, Header, Hamburger, HamburgerButton, HamburgerButtonBar, Sidebar, Backdrop, Close, SidebarContent, SidebarItems, SidebarItem, SidebarText, HeaderItemsRight, HeaderItemsLeft, HeaderItem, HeaderLogout, UserContainer, UserName, UserPhotoContainer, UserPhotoImage } from './header.styles';

const HeaderComponent = ({ currentUser, isLoading, logout }) => {
  const [openSidebar, setOpenSidebar] = useState(true);
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
          <HeaderItem exact to='/'>Home</HeaderItem>
          <HeaderItem to='/channels'>Channels</HeaderItem>
          <HeaderItem to='/create-channel'>Create Channel</HeaderItem>
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
              <SidebarItem>
                <SidebarText exact to={`/`} >Home</SidebarText>
              </SidebarItem>
              <SidebarItem>
                <SidebarText to={`/channels`} >Channels</SidebarText>
              </SidebarItem>
              <SidebarItem>
                <SidebarText to={`/create-channel`}>Create Channel</SidebarText>
              </SidebarItem>
            </SidebarItems> 
          </SidebarContent>
        </Sidebar>
        <Backdrop openSidebar={openSidebar} onClick={() => setOpenSidebar(false)} />
    </HeaderContainer>
  )
}
// #909090
// #989898
// #A0A0A0
// #A8A8A8
// #A9A9A9
// #B0B0B0
// #B8B8B8
// #BEBEBE
// #C0C0C0
// #C8C8C8
// #D0D0D0
// #D3D3D3
// #D8D8D8
// #DCDCDC
// #E0E0E0

const mapStateToProps = state => ({
  currentUser: state.user.user,
  isLoading: state.user.isLoading
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);