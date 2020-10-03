import styled from 'styled-components';

export const ChannelContainer = styled.div`
  max-width: 860px;
  margin: auto;
  padding: 3rem;

  @media only screen and (max-width: 768px){
    padding: 2rem;
    padding-top: 3rem;
  }

  @media only screen and (max-width: 578px){
    padding: 1rem;
    padding-top: 2rem;
  }
`;

export const Description = styled.div`
  line-height: 24px;
  font-size: 16px;
  font-weight: 400;
  margin: 1rem auto;
`;