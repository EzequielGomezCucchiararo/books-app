import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem auto;
  max-width: 400px;
`;

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
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

export const ToggleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  label {
    margin: 0 10px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;

    input[type='radio'] {
      margin-right: 5px;
      cursor: pointer;
    }
  }
`;
