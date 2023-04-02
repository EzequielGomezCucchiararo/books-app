import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem auto;
  max-width: 600px;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  margin-right: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: #0077cc;
  color: #fff;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #005da8;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
  width: 100%;
`;

export const RemoveButton = styled.button`
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  cursor: pointer;
  color: #f00;
`;
