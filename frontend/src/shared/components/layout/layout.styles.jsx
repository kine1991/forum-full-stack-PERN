import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  /* max-width: 960px; */
  margin: 3rem auto;
  box-shadow: #696969;
  min-height: 400px;
  min-height: calc(100vh - 260px - 6rem);

  @media (max-width: 1200px) {
    margin: 3rem;
  }

  @media (max-width: 992px) {
    margin: 3rem 3rem;
  }

  @media (max-width: 768px) {
    margin: 2rem;
    min-height: calc(100vh - 260px - 4rem);
  }

  @media (max-width: 576px) {
    margin: 1rem;
    min-height: calc(100vh - 260px - 2rem);

  }
  /* @media (max-width: 576px) {  
        margin: 0;
        max-width: 100%;
        width: 100%;
    } */
`;
