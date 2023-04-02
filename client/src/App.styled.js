import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AuthActions = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;
export const LogoutButton = styled.button`
  background-color: #f00;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #c00;
  }
`;
