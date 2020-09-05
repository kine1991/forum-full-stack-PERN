import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Button = styled.button`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid black;
  cursor: pointer;

  transition: 0.3s all;

  /* width: 100%; */
  width: ${props => (props.fullWidth ? '100%' : 'inherit')};

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

export const ButtonLink = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid black;
  cursor: pointer;
  color: black;

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