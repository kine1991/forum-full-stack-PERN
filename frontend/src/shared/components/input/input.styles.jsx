import styled from 'styled-components';

export const InputContainer = styled.div`
  margin-bottom: 2rem;
`;

export const Label = styled.div`
	font-family: 'Roboto', sans-serif;
	color: ${props => (props.error ? '#e74c3c' : '#777')};
  display: block;
  margin-bottom: 5px;
  margin-left: 5px;
`;

export const ErrorMessage = styled.div`
	font-family: 'Roboto', sans-serif;
	color: #e74c3c;
  display: block;
  margin-top: 5px;
  margin-left: 5px;
`;

export const Input = styled.input`
  width: ${props => (props.fullWidth ? '100%' : 'inherit')};

  display: inline-block;
  height: 50px;
	padding: 10px 20px;
  background-color: #fff;
	color: ${props => (props.error ? '#e74c3c' : 'black')};
	border: ${props => (props.error ? '1px solid #e74c3c' : '2px solid #f0f0f0')};
	border-radius: 8px;
	outline: none;
  margin-right: -4px;
	font-family: 'Roboto', sans-serif;
	font-size: 14px;
  vertical-align: middle;

	/* border-top-left-radius: 2px;
	-o-border-top-left-radius: 2px;
	-moz-border-top-left-radius: 2px;
	-webkit-border-top-left-radius: 2px;

	border-bottom-left-radius: 2px;
	-o-border-bottom-left-radius: 2px;
	-moz-border-bottom-left-radius: 2px;
	-webkit-border-bottom-left-radius: 2px; */

	/* border: 2px solid #f0f0f0;
  border-radius: 4px;
  display: block; */
`;