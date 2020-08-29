import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const HeaderContainer = styled.div`
  height: 64px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 6px 10px -4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  position: relative;

  padding: 0 20px;
  z-index: 100;
`;

export const Header = styled.div`
  width: 992px;
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;


export const Hamburger = styled.div`
  display: none;

  @media only screen and (max-width: 768px){
    display: block;
  }
`;

export const HamburgerButton = styled.div`
  width: 28px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding-top: 0;
  padding-bottom: 0;

  &:focus {
    outline: none;
  }
`;

export const HamburgerButtonBar = styled.div`
  width: 100%;
  height: 0.2rem;
  background: black;
  display: block;
  margin: 0.6rem 0;
`;

export const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: whitesmoke;
  background: #faf9f9;;
  color: black;
  height: 100vh;
  width: 250px;
  z-index: 10;
  transform: translateX(${props => props.openSidebar ? '0%' : '-100%'});
  transition: transform 500ms ease-out;
  overflow: hidden;
`;

export const Backdrop = styled.div`
    position: fixed;
    display: ${props => props.openSidebar ? 'block' : 'none' };
    top: 0;
    left: 0;
    z-index: 1;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
`;

export const SidebarContent = styled.div`
  /* position: relative;
  background: red; */
`;

export const Close = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 1rem;
  font-size: 3rem;
  background: #d6e0f0;
  background: white;
  background: #292b2c;
  color: #f7f7f7;
  height: 64px;
`;

export const SidebarItems = styled.div`
  /* margin-top: 3rem; */

`;

export const SidebarItem = styled.div`
  font-size: 16px;
  height: 60px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #f0f0f0;
  }
`;

export const SidebarText = styled(NavLink)`
  padding-left: 1.5rem;
  transition: all 0.3s;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  color: black;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  &:hover {
    transform: translateX(4px);
    color: black;
  }

  &.active {
    color: #999;
    background: #E8E8E8;
  }
`;

export const HeaderItemsRight = styled.div`
  display: flex;
  height: 100%;
  color: rgb(102, 97, 91);
`;

export const HeaderItemsLeft = styled.div`
  height: 100%;
  color: rgb(102, 97, 91);
  display: flex;

  @media only screen and (max-width: 768px){
    display: none;
  }
`;

export const HeaderItem = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(102, 97, 91);
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  padding: 0 1rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #f0f0f0;
    color: black
  }

  &.active {
    color: orangered;
    background: rgb(226, 226, 226);
    background: #E8E8E8;
  }
`;

export const HeaderLogout = styled.div`
  color: orangered;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(102, 97, 91);
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  padding: 0 1rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: orangered;
  }
`;

export const UserContainer = styled.div`
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  padding: 0 1rem;
  height: 100%;
  &:hover {
    background: #f0f0f0;
  }
`;

export const UserName = styled.div`

`;

export const UserPhotoContainer = styled.div`
  height: 32px;
  margin-left: 1rem;

`;

export const UserPhotoImage = styled.img`
  /* width: 100%; */
  height: 100%;
  border-radius: 50%;
`;