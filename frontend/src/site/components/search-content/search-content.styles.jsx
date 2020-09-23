import styled from 'styled-components';

export const SearchContentConteiner = styled.div`
  position: absolute;
  top: 110px;
  left: 0;
  width: 100%;
  border-radius: 8px;
  border: 1px solid gray;

  width: 100%;
  height: 300px;
  background-color: white;
  overflow: scroll;
  padding: 1rem;
  margin: 0.2rem;
`;

export const Item = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

export const Left = styled.div`
  height: 60px;
  width: 80px;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  margin-left: 12px;
  width: 100%;
`;

export const Photo = styled.img`
  height: 100%;
  width: 100%;
`;
