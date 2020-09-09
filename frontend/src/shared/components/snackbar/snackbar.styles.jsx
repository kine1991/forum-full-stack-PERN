import styled from 'styled-components';

const black = '#292b2c';
const white = 'wheat';
const primary = '#0275d8';
const success = '#5cb85c';
const info = '#5bc0de';
const warning = '#f0ad4e';
const danger = '#d9534f';

function getBackground(color) {
  if(color === 'black') return black;
  if(color === 'white') return white;
  if(color === 'primary') return primary;
  if(color === 'success') return success;
  if(color === 'info') return info;
  if(color === 'warning') return warning;
  if(color === 'danger') return danger;
  return 'black';
}

function getColor(color) {
  if(color === 'white') {
    return 'black';
  } else {
    return 'white';
  }
}

export const SnackbarContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  /* padding: 1rem; */
  bottom: 20px;
  right: 50px;
  width: 250px;
  height: 40px;
  border-radius: 5px;
  overflow: hidden;
  /* border: 1px solid black; */
  color: ${props => getColor(props.color)};
  background: ${props => getBackground(props.color)};
  box-shadow: 0px 4px 10px 0px #d7d7d7;

  /* visibility: ${props => props.isActive ? 'visible' : 'hidden'}; */

  /* transition: all 3s; */
  /* visibility: ${props => props.isActive ? 'hidden' : 'visible'}; */
  /* visibility: visible; */
  /* visibility: hidden; */
`;

export const SnackbarContent = styled.div`
  flex: 1;
  margin: auto 1rem;
  /* background-color: green; */
`;

export const SnackbarClose = styled.div`
  /* background-color: red; */
  /* border-right: ridge solid black; */
  /* border-left: 1px solid black; */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: inherit;
  filter: brightness(95%);
  width: 30px;
  height: 100%;
  font-size: 24px;
  cursor: poinster;
  
  &:hover {
    filter: brightness(90%);

  }
`;