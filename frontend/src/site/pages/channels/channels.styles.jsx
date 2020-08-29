import styled from 'styled-components';

export const ChannelsContainer = styled.div`
  max-width: 860px;
  margin: auto;
`;

export const ChannelsDoNotExists = styled.div`
  font-size: 48px;
  line-height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;

  @media only screen and (max-width: 768px){
    font-size: 32px;
    line-height: 48px;
  }

  @media only screen and (max-width: 576px){
    font-size: 24px;
    line-height: 32px;
  }
`;