import React from 'react';

import moment from 'utils/moment';
import { CommentMiniCardContainer, UserContainer ,UserPhotoContainer, UserPhoto, UserNameCommentDateContainer, UserName, CommentDate, CommentConteiner, TopicAndChannelContainer, ChannelName, TopicName } from './comment-mini-card.styles'

const CommentMiniCard = ({ content, created_at, user_id, user_nickname, user_image_url, channel_name, topic_name, channel_slug, topic_slug }) => {
  return (
    <CommentMiniCardContainer>
      <UserContainer>
        <UserPhotoContainer>
          <UserPhoto src={user_image_url} alt="img"/>
        </UserPhotoContainer>
        <UserNameCommentDateContainer>
          <UserName>{user_nickname}</UserName>
          <CommentDate>{moment(created_at).fromNow()}</CommentDate>
        </UserNameCommentDateContainer>
      </UserContainer>
      <CommentConteiner>{content.length > 100 ? content.slice(0, 100) : content}</CommentConteiner>
      <TopicAndChannelContainer>
        <ChannelName to={`/channels/${channel_slug}`}>{channel_name}</ChannelName> / 
        <TopicName to={`/topics/${topic_slug}`}>{topic_name}</TopicName>
      </TopicAndChannelContainer>
    </CommentMiniCardContainer>
  )
}

export default CommentMiniCard;