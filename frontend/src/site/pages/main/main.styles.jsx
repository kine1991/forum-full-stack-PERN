import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;

  height: 1000px;
  /* max-height: 1001px; */
  /* max-height: 1600px; */
  /* height: auto; */

  @media only screen and (max-width: 1200px){
    height: 1100px;
  }

  @media only screen and (max-width: 1160px){
    height: 1600px;
  }

  @media only screen and (max-width: 900px){
    height: 3200px;
  }

  @media only screen and (max-width: 850px){
    height: 3100px;
  }

  @media only screen and (max-width: 800px){
    height: 2900px;
  }

  @media only screen and (max-width: 750px){
    height: 2800px;
  }

  @media only screen and (max-width: 700px){
    height: 2600px;
  }


  @media only screen and (max-width: 600px){
    flex-direction: column;
  }
`;

export const MainSection = styled.div`
  flex: 1;

  /* height: 500px; */

  max-width: 860px;
  margin: 0rem auto;
  padding: 3rem;

  @media only screen and (max-width: 1100px){

  }
`;


export const CommentsSection = styled.div`
overflow: scroll;
  flex-basis: 300px;
  background-color: white;

  /* height: unset; */
  overflow: scroll;

  /* Hide scrolbar */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }

  @media only screen and (max-width: 1200px){
    flex-basis: 260px;
  }

  @media only screen and (max-width: 700px){
    flex-basis: 230px;
  }

  @media only screen and (max-width: 650px){
    flex-basis: 200px;
  }

  @media only screen and (max-width: 600px){
    flex-basis: unset;
    height: 100%;
  }
`;

export const ButtonContainer = styled.div`
  padding: 1rem;
  text-align: center;
`;

// export const ChannelsContainer = styled.div`
//   max-width: 860px;
//   margin: auto;
// `;

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

export const Card2Image = styled.div`

`;

export const Card2Content = styled.div`
  padding: 1rem;
`;

export const CardImage = styled.img`
  width: 100%;
  /* height: 100%; */
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

export const CommentTitle = styled.div`
  background-color: #333;
  color: whitesmoke;
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  height: 60px;
  margin: auto;
  text-align: center;
  padding-top: 20px;
  /* vertical-align: center; */
`;