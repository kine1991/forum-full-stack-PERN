import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CommentMiniCardContainer = styled.div`
  padding: 2rem;
  border-bottom: 1px solid #f4f2f2;

  display: flex;
  flex-direction: column;
`;

export const UserContainer = styled.div`
  display: flex;
`;

export const UserPhotoContainer = styled.div`
  width: 32px;
  height: 32px;
`;

export const UserPhoto = styled.img`
  /* width: 100%; */
  height: 100%;
  border-radius: 50%;
`;

export const UserNameCommentDateContainer = styled.div`
  margin-left: 10px;
  /* display: flex; */
  vertical-align: middle;
  /* display: flex;
  justify-content: center;
  align-items: center; */

`;

export const UserName = styled.div``;
export const CommentDate = styled.div`
  color: gray;
`;



export const CommentConteiner = styled.div`
  margin: 6px 0;
`;

export const TopicAndChannelContainer = styled.span`

`;

export const ChannelName = styled(Link)`

`;

export const TopicName = styled(Link)`

`;