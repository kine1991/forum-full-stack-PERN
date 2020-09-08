import styled from 'styled-components';

export const OwnChannelsContainer = styled.div`
  max-width: 980px;
  margin: 3rem auto;
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;

  width: 100%;
  /* background: #fff; */
  /* margin: 1em 0; */
  border: 1px solid rgba(34,36,38,.15);
  /* -webkit-box-shadow: none; */
  box-shadow: none;
  border-radius: .28571429rem;
  text-align: left;
  color: rgba(0,0,0,.87);
  border-collapse: separate;
  border-spacing: 0;

  line-height: 1.4285em;
`;

export const Thead = styled.thead`
  /* background: #f9fafb; */
  background-color: #d9d9d9;
  color: rgba(0,0,0,.87);
  line-height: 1.5;
  font-weight: 600;
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
    /* background: #c4c4c4; */
  }
`;

export const Th = styled.th`
  /* background-color: #4CAF50; */
  /* color: white; */

  text-align: left;
  padding: 18px 8px;

  border-left: solid 1px rgba(34,36,38,.15);
`;

export const Td = styled.td`
  text-align: left;
  padding: 8px;

  /* border-right: solid 1px rgba(34,36,38,.15);  */
  border-left: solid 1px rgba(34,36,38,.15);
`;

export const TdImage = styled.td`
  width: 96px;
  height: 96px;
  padding: 8px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export const TitleAndButtonContainer = styled.div`
  margin: 1rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  `;
  
  export const Title = styled.div`
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    font-weight: 200;
  `;