import React, { useState } from 'react';
import styled from 'styled-components';

const ModalEditGrade = ({ modalData, onClose }) => {
  const { subject, semester } = modalData;
  const [grade, setGrade] = useState('');
  const [error, setError] = useState('');

const handleGradeChange = (e) => {
    const value = e.target.value;
    const regex = /^(?:\d(?:\.\d{0,2})?|10(?:\.0{0,2})?)$/;
    if (!regex.test(value)) {
        setError('Favor inserir uma nota válida (0.0 a 10.0)');
    } else {
        setError('');
        setGrade(value);
    }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (grade === '' || isNaN(grade)) {
      setError('Favor inserir um número válido');
      return;
    }
    // Handle the grade update logic here
    console.log(`Updated grade for ${subject} (${semester}): ${grade}`);
    onClose();
  };

return (
    <StyledModalOverlay>
        <StyledModalContent>
            <h2>Alterar nota</h2>
            <p>Matéria: {subject}</p>
            <p>Semestre: {semester === 'firstSemester' ? '1° Semestre' : '2° Semestre'}</p>
            <form onSubmit={handleSubmit}>
                <StyledLabel>
                    Nota:
                    <StyledInput
                        type="text"
                        value={grade}
                        onChange={handleGradeChange}
                        required
                    />
                </StyledLabel>
                {error && <StyledError>{error}</StyledError>}
                <StyledButtonContainer>
                    <StyledButton type="submit">Salvar</StyledButton>
                    <StyledButton type="button" onClick={onClose}>Fechar</StyledButton>
                </StyledButtonContainer>
            </form>
        </StyledModalContent>
    </StyledModalOverlay>
);
};

export default ModalEditGrade;

// Styled components

const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledModalContent = styled.div`
  background-color: #8ecae6;
  padding: 20px;
  border-radius: 16px;
  width: 300px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
`;

const StyledInput = styled.input`
  margin-left: 10px;
  padding: 5px;
  width: 100px;
  border: 1px solid #fb8500;
  border-radius: 8px;
`;

const StyledError = styled.div`
  color: red;
  margin-bottom: 10px;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  background-color: #ffb703;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  flex: 1;
`;