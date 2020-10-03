import React, { useState, useEffect } from 'react';

import Button from 'shared/components/button/button.component';
import CommentMiniCard from 'site/components/comment-mini-card/comment-mini-card.component';
import { fetchLastComments } from 'redux/comment/comment.action';
import { CommentTitle, ButtonContainer, LoaderContainer } from './last-comments.styles';
import { Loader } from 'semantic-ui-react';

const LastComment = () => {
  const [isHiddenShowMoreBtn, setIsHiddenShowMoreBtn] = useState(false);
  const [comments, setComments] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const limit = 20
    fetchLastComments({ page, limit }).then(response => {
      const ammountComments = response.data.ammount_comments;
      const maxPage = Math.ceil(ammountComments/limit);
      setIsHiddenShowMoreBtn(maxPage <= page);
      setComments(oldComments => oldComments === null ? [...response.data.comments] : [...oldComments, ...response.data.comments]);
      setIsLoading(false);
    }).catch(error => {
      console.log('error@@main#fetchLastComments', error);
      setIsLoading(false);
    })
  }, [setComments, page]);

  const showMoreComments = () => {
    setPage(page + 1)
  }

  if(isLoading !== false) return <LoaderContainer><Loader active inline='centered' /></LoaderContainer>
  if(isLoading === false && comments === null) return <div><CommentTitle>Последнии коментарии</CommentTitle><div>Коментариев Нет!</div></div>
  if(isLoading === false && comments.length === 0) return <div><CommentTitle>Последнии коментарии</CommentTitle><div>Коментариев Нет!</div></div>

  return (
    <div>
      <CommentTitle>Последнии коментарии</CommentTitle>
      <React.Fragment>
        {comments.map((comment, i) => {
          return (
            <CommentMiniCard key={comment.id} {...comment} isEven={(i % 2) === 0} />
          )
        })}
        {isHiddenShowMoreBtn ? null : (
        <ButtonContainer>
          <Button onClick={showMoreComments} content='показать больше'/>
        </ButtonContainer>
        )}
      </React.Fragment>
    </div>
  )
}

export default LastComment;