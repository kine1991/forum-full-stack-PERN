import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
`;

export const MainSection = styled.div`
  flex: 1;
  height: 100vh;
  overflow: scroll;
  /* Hide scrolbar */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }

  max-width: 960px;
  margin: 0rem auto;
  padding: 3rem;
`;

export const CommentsSection = styled.div`
  flex-basis: 300px;
  background-color: white;
  height: 100vh;
  overflow: scroll;

  /* Hide scrolbar */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;