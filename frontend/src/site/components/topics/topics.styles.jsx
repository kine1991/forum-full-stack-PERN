import styled from 'styled-components';

export const CreateBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 3rem;
`;

export const Topics = styled.div`

`;

export const Topic = styled.div`
  height: 60px;
  display: flex;
`;

export const NameAndPagination = styled.div`
  /* background: red; */
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const Name = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: .01em;
  line-height: 1.4285em;
  color: rgba(0,0,0,.87);
  transition: all .2s ease;
  border-bottom: 1px solid transparent;

  &:hover {
    color: #5774da;
    text-decoration: none;
    border-bottom: 1px solid #5774da;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
`;

export const NumberOfPage = styled.div`
  color: #b9bdcd;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  padding: 0.3rem;

  &:hover {
    color: #5774da;
    text-decoration: none;
    border-bottom: 1px solid #5774da;
  }
`;

export const AmmountComments = styled.div`
  /* background: blue; */
  flex: 1;
  display: flex;
  /* flex-direction: column; */
  justify-content: flex-start;
  align-items: center;
  margin-right: 2rem;
`;

export const LastCommentatorAndDate = styled.div`
  /* background: green; */
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const LastCommentator = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: .01em;
  line-height: 1.4285em;
  color: rgba(0,0,0,.87);
  transition: all .2s ease;
  border-bottom: 1px solid transparent;

  &:hover {
    color: #5774da;
    text-decoration: none;
    border-bottom: 1px solid #5774da;
  }
`;

export const Date = styled.div`
  color: #b9bdcd;
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  padding-top: 0.3rem;
`;