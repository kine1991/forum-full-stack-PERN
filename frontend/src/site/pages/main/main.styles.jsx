import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const MainContainer = styled.div`
  margin: 0;
  padding: 0;
  position: relative;

  min-height: calc(100vh - 264px);
`;

export const MainSection = styled.div`
  position: relative;
  left: -150px;
  flex: 1;
  max-width: 860px;
  margin: 0rem auto;
  padding: 3rem;

  @media only screen and (max-width: 1200px){
    left: -130px;
  }

  @media only screen and (max-width: 1120px){
    max-width: 760px;
  }

  @media only screen and (max-width: 1020px){
    max-width: 700px;
  }

  @media only screen and (max-width: 960px){
    max-width: 660px;
  }

  @media only screen and (max-width: 900px){
    max-width: 600px;
  }

  @media only screen and (max-width: 840px){
    max-width: 500px;
  }

  @media only screen and (max-width: 760px){
    max-width: 460px;
  }

  @media only screen and (max-width: 700px){
    left: 0;
    max-width: 700px;
    padding: 2rem;
  }

  @media only screen and (max-width: 600px){
    padding: 1rem;
  }
`;

export const CommentsSection = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 300px;
  background-color: white;

  overflow: scroll;
  /* Hide scrolbar */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }

  @media only screen and (max-width: 1200px){
    width: 260px;
  }

  @media only screen and (max-width: 700px){
    display: none;
  }
`;

export const ButtonContainer = styled.div`
  padding: 1rem;
  text-align: center;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3rem;
  margin-bottom: 2rem;

  @media only screen and (max-width: 1160px){
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;
  }

  @media only screen and (max-width: 900px){
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 2rem;
  }
`;

export const Card2 = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.15) 4px 6px 10px 4px;
`;

export const Card2Image = styled.div``;

export const Card2Content = styled.div`
  padding: 1rem;
`;

export const CardImage = styled.img`
  width: 100%;
`;

export const CardName = styled(Link)`
  color: black;
  font-size: 16px;
  margin-bottom: 0.5rem;

  transition: all 0.3s;
  cursor: pointer;
  
  &:hover {
    color: orange;
  }
`;

export const CardDescription = styled.div`
  color: black;
  font-size: 14px;
  font-weight: 300;

  @media only screen and (max-width: 768px){
    font-size: 13px;
  }

  @media only screen and (max-width: 576px){
    font-size: 12px;
  }
`;

export const SearchContainer = styled.div`
  margin-bottom: 2rem;
  position: relative;
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
`;

export const SearchSpace = styled.div`
  width: 2rem;
`;