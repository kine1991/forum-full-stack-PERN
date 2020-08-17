import styled from 'styled-components';

export const TopicContainer = styled.div`
  max-width: 860px;
  margin: auto;
`;

export const ChannelName = styled.div`
  color: #5774da;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  transition: all 0.3s;

  &:hover {
    text-decoration: underline;
  }
`;

export const UserTitle = styled.span`
  margin-left: 3rem;
  color: #b9bdcd;
  font-weight: 500;
  font-size: 14px;
`;