import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing authentication tokens)
    navigate('/login');
  };

  return (
    <StyledLogoutButton onClick={handleLogout}>
      <span>Sair</span>
    </StyledLogoutButton>
  );
}

export default LogoutButton;

// Styled components
const StyledLogoutButton = styled.button`
  background-color: #ffb703;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  width: 120px;
  cursor: pointer;
  color: #0056b3;
  font-family: 'Roboto', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffa726;
  }

  &:active {
    background-color: #fb8500;
  }

  span {
    font-weight: bold;
  }
`;