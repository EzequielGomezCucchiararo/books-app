import styled from 'styled-components';

export const ErrorMessage = styled.div`
  color: chocolate;
  margin-top: 20px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem auto;
  min-width: 1200px;
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
  margin-left: 5px;
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
  cursor: pointer;
  background-color: rgb(255, 0, 0);
  color: rgb(255, 255, 255);
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  margin-left: 0.5rem;

  &:hover {
    background-color: #b56378;
  }
`;

export const EditContainer = styled.div`
  display: flex;
  align-items: center;

  input[type='text'] {
    flex: 1;
    padding: 0.5rem;
    margin-right: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 300px;
  }
`;

export const EditButton = styled.button`
  background-color: #3f51b5;
  color: #fff;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  margin-left: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #2c3e50;
  }
`;

export const BookActions = styled.div``;
