import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Header } from "../../components/header";
import { useNavigate } from "react-router-dom";
import api from '../../api';

const StudentsList = (props) => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get('/alunos');
        setStudents(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados dos alunos:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleShowReportCard = (alunoId, studentName, gender) => {
    navigate(`/boletim/${alunoId}`, { state: { studentName, gender } });
  };

  const sortedStudents = students
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((student, index) => ({ ...student, id: index + 1 }));

  return (
    <>
      <Header />
      <StyledStudentsListMainDiv>
        <StyledTableContainer>
          <StyledTableStudentsList>
            <thead>
              <tr>
                <th>R.A.</th>
                <th>Nome do(a) Aluno(a)</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>
                    <StyledGoToReportCardButton onClick={() => handleShowReportCard(student.id, student.name, student.gender)}>
                      Ver Boletim
                    </StyledGoToReportCardButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTableStudentsList>
        </StyledTableContainer>
      </StyledStudentsListMainDiv>
    </>
  );
};

export default StudentsList;

// Styled components

const StyledStudentsListMainDiv = styled.div`
  background-color: #caf0f8;
  opacity: 0.9;
  margin: 16px;
  padding: 16px;
  border: transparent;
  border-radius: 16px;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
`;

const StyledGoToReportCardButton = styled.button`
  background-color: #ffb703;
  border: transparent;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  color: #0056b3;
`;

const StyledTableContainer = styled.div`
  margin: 16px 0;
  overflow-x: auto;
`;

const StyledTableStudentsList = styled.table`
  width: 100%;
  opacity: 1.0;
  th {
    font-size: 20px;
    padding: 12px;
    border: 1px solid #fb8500;
  }
  td {
    padding: 8px;
    text-align: center;
    border: 1px solid #fb8500;
  }
  font-family: 'Roboto', sans-serif;
  `;