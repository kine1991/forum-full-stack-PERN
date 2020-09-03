import styled from 'styled-components';

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

export const Thead = styled.thead`

`;

export const Tbody = styled.tbody`
`;

export const Tr = styled.tr`
  
  &:nth-child(2){
    background-color: #d9d9d9;
  }
  &:nth-child(4){
    background-color: #d9d9d9;
  }
  &:nth-child(6){
    background-color: #d9d9d9;
  }
  &:nth-child(8){
    background-color: #d9d9d9;
  }
  &:nth-child(10){
    background-color: #d9d9d9;
  }
  &:nth-child(12){
    background-color: #d9d9d9;
  }
  &:nth-child(14){
    background-color: #d9d9d9;
  }
  &:nth-child(16){
    background-color: #d9d9d9;
  }
  &:nth-child(18){
    background-color: #d9d9d9;
  }
  &:nth-child(20){
    background-color: #d9d9d9;
  }

  transition: all 0.3s;
  &:hover {
    background: #c4c4c4;
  }
`;

export const Th = styled.th`
  background-color: #4CAF50;
  color: white;

  text-align: left;
  padding: 8px;
`;

export const Td = styled.td`
  text-align: left;
  padding: 8px;
`;

export const TdImage = styled.td`
  width: 96px;
  height: 96px;
  /* padding: 2px; */
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export const ButtonContainer = styled.div`
  margin: 2rem 2rem;
  display: flex;
  justify-content: flex-end;
`;