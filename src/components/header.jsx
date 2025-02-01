import escola_logo from '../assets/escola_logo.jpg';
import React from 'react';
import styled from 'styled-components';
import LogoutButton from './logout-button';


function Header() {
  return (
    <StyledHeaderMainDiv>
     
      <StyledSchoolLogo src={escola_logo} alt="Logo da Escola Conhecimento"></StyledSchoolLogo>
      <StyledHeaderTitle>Escola Conhecimento - Sistema de Notas</StyledHeaderTitle>
      <LogoutButton />
    </StyledHeaderMainDiv>

  );
}

function HeaderWithoutLogout() {
  return (
    <StyledHeaderMainDiv>
      <StyledSchoolLogo src={escola_logo} alt="Logo da Escola Conhecimento"></StyledSchoolLogo>
      <StyledHeaderTitle>Escola Conhecimento</StyledHeaderTitle>
    </StyledHeaderMainDiv>
  );
}

export { Header, HeaderWithoutLogout };

// Styled components
const StyledHeaderMainDiv = styled.div`
  background-color: #8ecae6;
  margin: 16px;
  padding: 16px;
  border: transparent;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledSchoolLogo = styled.img`
  height: 50px;
`;

const StyledHeaderTitle = styled.h1`
  font-size: 24px;
  margin: 0;
  white-space: nowrap;
  text-align: left;
  flex-grow: 1;
  margin-left: 16px;
`;