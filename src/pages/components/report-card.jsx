import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../api';

const ReportCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { alunoId } = useParams();
  const { studentName, gender } = location.state || {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [studentsGrades, setStudentsGrades] = useState({});
  const [disciplinesMap, setDisciplinesMap] = useState({});

  useEffect(() => {
    const fetchStudentGrades = async () => {
      try {
        const response = await api.get(`/boletim/${alunoId}`);
        setStudentsGrades(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do boletim:', error);
      }
    };

    const fetchDisciplines = async () => {
      try {
        const response = await api.get('/disciplinas');
        const disciplines = response.data;
        const map = {};
        disciplines.forEach(discipline => {
          map[discipline.name] = discipline.id;
        });
        setDisciplinesMap(map);
      } catch (error) {
        console.error('Erro ao buscar disciplinas:', error);
      }
    };

    fetchStudentGrades();
    fetchDisciplines();
  }, [alunoId]);

  const handleEditGrade = (subject, semester) => {
    const initialGrade = studentsGrades.grades.find(grade => grade.subject === subject)[semester];
    setModalData({ subject, semester, initialGrade });
    setIsModalOpen(true);
  };

  const handleSaveGrade = async (subject, semester, newGrade) => {
    try {
      const gradeToUpdate = studentsGrades.grades.find(grade => grade.subject === subject);
      if (!gradeToUpdate) {
        console.error('Disciplina não encontrada');
        return;
      }

      const disciplinaId = disciplinesMap[subject];
      if (!disciplinaId) {
        console.error('ID da disciplina não encontrado');
        return;
      }

      const updatedGrade = { ...gradeToUpdate, [semester]: newGrade };

      const payload = {
        [semester]: newGrade
      };

      await api.put(`/notas/${alunoId}/${disciplinaId}`, payload);

      setStudentsGrades(prevGrades => {
        return {
          ...prevGrades,
          grades: prevGrades.grades.map(grade =>
            grade.subject === subject ? { ...grade, [semester]: newGrade } : grade
          ),
        };
      });

      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao atualizar a nota:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBackToList = () => {
    navigate('/meus-alunos');
  };

  const isApproved = (firstSemester, secondSemester) => {
    const average = (firstSemester + secondSemester) / 2;
    return average >= 6.0 ? 'Aprovado' : 'Reprovado';
  };

  return (
    <StyledMainContainer>
      <h2>Boletim de {studentsGrades.name}</h2>
      <StyledTableContainer>
        <StyledTableStudentsList>
          <thead>
            <tr>
              <th>Disciplina</th>
              <th>1º Semestre</th>
              <th>2º Semestre</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {studentsGrades.grades && studentsGrades.grades.map((grade, index) => (
              <tr key={index}>
                <td>{grade.subject}</td>
                <td>
                  <StyledGradeText grade={grade.firstSemester}>{grade.firstSemester}</StyledGradeText>
                  <StyledEditButton onClick={() => handleEditGrade(grade.subject, 'firstSemester')}>Editar</StyledEditButton>
                </td>
                <td>
                  <StyledGradeText grade={grade.secondSemester}>{grade.secondSemester}</StyledGradeText>
                  <StyledEditButton onClick={() => handleEditGrade(grade.subject, 'secondSemester')}>Editar</StyledEditButton>
                </td>
                <td>{isApproved(grade.firstSemester, grade.secondSemester)}</td>
              </tr>
            ))}
          </tbody>
        </StyledTableStudentsList>
      </StyledTableContainer>
      {isModalOpen && (
        <div>
          <h3>Editar Nota</h3>
          <p>Disciplina: {modalData.subject}</p>
          <p>Semestre: {modalData.semester}</p>
          <input
            type="number"
            value={modalData.initialGrade}
            onChange={(e) => setModalData({ ...modalData, initialGrade: e.target.value })}
          />
          <button onClick={() => handleSaveGrade(modalData.subject, modalData.semester, modalData.initialGrade)}>Salvar</button>
          <button onClick={handleCloseModal}>Fechar</button>
        </div>
      )}
      <StyledReturnStudentsListButton onClick={handleBackToList}>Voltar para a lista de alunos</StyledReturnStudentsListButton>
    </StyledMainContainer>
  );
};

export default ReportCard;

// Styled components
const StyledMainContainer = styled.div`
  padding: 16px;
`;

const StyledStudentsListMainDiv = styled.div`
  background-color: #caf0f8;
  opacity: 0.9;
  margin: 16px;
  padding: 16px;
  border: transparent;
  border-radius: 16px;
`;

const StyledTableContainer = styled.div`
  overflow-x: auto;
`;

const StyledTableStudentsList = styled.table`
  width: 100%;
  th, td {
    padding: 12px;
    border: 1px solid #fb8500;
    text-align: center;
  }
`;

const StyledGradeContainer = styled.div`
  display: in-line;
  text-align: center;
  align-items: center;
`;

const StyledEditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 8px;
  color: #fb8500;
`;

const StyledReturnStudentsListButton = styled.button`
  background-color: #ffb703;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  color: #023e8a;

  svg {
    margin-right: 8px;
    color: #023e8a;
  }
`;

const StyledGradeText = styled.span`
  color: ${props => props.grade < 6 ? '#ae2012' : '#023e8a'};
`;