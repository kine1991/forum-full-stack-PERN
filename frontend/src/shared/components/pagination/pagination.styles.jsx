import styled from "styled-components";

export const PaginationLessContainer = styled.div`
  display: none;

  @media only screen and (max-width: 576px){
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const PaginationMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 576px){
    display: none;
  }
  
`;