import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ChannelsContainer = styled.div`
  max-width: 860px;
  /* margin: auto; */
  margin: 3rem auto;
  font-family: 'Roboto', sans-serif;
`;

export const ChannelsDoNotExists = styled.div`
  font-size: 48px;
  line-height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;

  @media only screen and (max-width: 768px){
    font-size: 32px;
    line-height: 48px;
  }

  @media only screen and (max-width: 576px){
    font-size: 24px;
    line-height: 32px;
  }
`;

export const Card = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.15) 4px 6px 10px 4px;
  display: flex;
  font-family: 'Roboto', sans-serif;

  @media only screen and (max-width: 576px){
    flex-direction: column;
  }
`;

export const CardImageContainer = styled.div`
  flex: 2 1 0;

  @media only screen and (max-width: 768px){
    flex: 3 1 0;
  }
`;

export const CardContent = styled.div`
  flex: 4 1 0;
  padding: 0 1rem;

  @media only screen and (max-width: 768px){
    flex: 4 1 0;
  }

  @media only screen and (max-width: 576px){
    padding: 0;
    margin-top: 0.5rem;
  }
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

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3rem;
  margin-bottom: 2rem;

  @media only screen and (max-width: 860px){
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;
  }

  @media only screen and (max-width: 576px){
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 2rem;
  }
`;

export const Card2 = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.15) 4px 6px 10px 4px;
  border-radius: 8px;
  overflow: hidden;
`;

export const Card2Image = styled.div`

`;

export const Card2Content = styled.div`
  padding: 1rem;
`;


export const TriggerView = styled.div`
  display: flex;
  /* justify-content: flex-end; */
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
`;

export const Title = styled.div`
  color: gray;
  font-size: 20px;
  font-weight: 200;
  /* font-family: inherit; */
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
`;

export const SearchSpace = styled.div`
  width: 2rem;
`;
