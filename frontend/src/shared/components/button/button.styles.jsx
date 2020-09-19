import styled from 'styled-components';
import { Link } from 'react-router-dom';

const getColor = (color) => {
  if(color === 'warning') {
    return 'orange'; //#ff7221
  } else if (color === 'primary') {
    return '#ff7221';
  } else {
    return '#000';
  }
}

export const Button = styled.button`
  display: inline-block;
  padding: ${props => props.padding ? props.padding : '0.75rem 1.5rem'};
  margin: ${props => props.margin ? props.margin : '0'};
  border: ${props => props.color ? `1px solid ${getColor(props.color)}` : '1px solid black'};
  /* border: 1px solid transparent; */
  /* background-color: ; */
  color: ${props => props.color ? `${getColor(props.color)}` : 'black'};
  cursor: pointer;
  border-radius: ${props => (props.rounded ? '5px' : 0)};

  transition: 0.3s all;
  width: ${props => (props.fullWidth ? '100%' : 'inherit')};

  /* &:hover {
    background-color: black;
    color: whitesmoke;
  } */
  
  &:focus {
    outline:0;
  }

  &:active {
    transform: translate(0px, 1px);
  }
`;

export const ButtonLink = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  margin: 0;
  border: 1px solid black;
  cursor: pointer;
  color: black;
  border-radius: ${props => (props.rounded ? '5px' : 0)};

  transition: 0.3s all;

  &:hover {
    background-color: black;
    color: whitesmoke;
  }
  
  &:focus {
    outline:0;
  }

  &:active {
    transform: translate(0px, 1px);
  }
`;