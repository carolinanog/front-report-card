import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../api';
import { Header } from '../../components/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';

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

      const updatedGrade = { ...gradeToUpdate, [semester]: parseFloat(newGrade) };

      const payload = {
        [semester]: parseFloat(newGrade)
      };

      await api.put(`/notas/${alunoId}/${disciplinaId}`, payload);

      setStudentsGrades(prevGrades => {
        return {
          ...prevGrades,
          grades: prevGrades.grades.map(grade =>
            grade.subject === subject ? { ...grade, [semester]: parseFloat(newGrade) } : grade
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

  const validateGrade = (value) => {
    const number = parseFloat(value);
    return !isNaN(number) && number >= 0.0 && number <= 10.0;
  };

  const handleGradeChange = (e) => {
    const value = e.target.value;
    if (validateGrade(value)) {
      setModalData({ ...modalData, initialGrade: value });
    }
  };

  return (
    <>
      <Header />
      <StyledMainContainer>
         <StyledStudentsListMainDiv>
          <h2>Boletim d{gender === 'female' ? 'a' : 'o'} alun{gender === 'female' ? 'a' : 'o'} {studentName}</h2>
          <StyledTableContainer>
            <StyledTableStudentsList>
            <thead>
              <tr>
                <th>Disciplina</th>
                <th>1º Semestre</th>
                <th>2º Semestre</th>
                <th>Média Final</th>
                <th>Resultado Final</th>
              </tr>
            </thead>
            <tbody>
              {studentsGrades.grades && studentsGrades.grades.map((grade, index) => (
                <tr key={index}>
                  <td>{grade.subject}</td>
                  <td>
                    <StyledGradeText grade={parseFloat(grade.firstSemester)}>{parseFloat(grade.firstSemester).toFixed(1)}</StyledGradeText>
                    <StyledEditButton onClick={() => handleEditGrade(grade.subject, 'firstSemester')}>
                      <FontAwesomeIcon icon={faEdit} color="#fb8500" />
                    </StyledEditButton>
                  </td>
                  <td>
                    <StyledGradeText grade={parseFloat(grade.secondSemester)}>{parseFloat(grade.secondSemester).toFixed(1)}</StyledGradeText>
                    <StyledEditButton onClick={() => handleEditGrade(grade.subject, 'secondSemester')}>
                      <FontAwesomeIcon icon={faEdit} color="#fb8500" />
                    </StyledEditButton>
                  </td>
                  <td>
                    <StyledGradeText grade={((parseFloat(grade.firstSemester) + parseFloat(grade.secondSemester)) / 2).toFixed(1)}>
                      {((parseFloat(grade.firstSemester) + parseFloat(grade.secondSemester)) / 2).toFixed(1)}
                    </StyledGradeText>
                  </td>
                  <td>
                    <StyledGradeText grade={((parseFloat(grade.firstSemester) + parseFloat(grade.secondSemester)) / 2)}>
                      {((parseFloat(grade.firstSemester) + parseFloat(grade.secondSemester)) / 2) >= 6 ? (gender === 'female' ? 'Aprovada' : 'Aprovado') : (gender === 'female' ? 'Reprovada' : 'Reprovado')}
                    </StyledGradeText>
                  </td>
                </tr>
              ))}
            </tbody>
          </StyledTableStudentsList>
        </StyledTableContainer>
        {isModalOpen && (
          <StyledEditGrade>
            <h3>Editar Nota</h3>
            <p>Disciplina: {modalData.subject}</p>
            <p>Semestre: {modalData.semester}</p>
            <input
              type="text"
              min="0.0"
              max="10.0"
              value={modalData.initialGrade}
              onChange={handleGradeChange}
            />
            <StyledButtonContainer>
              <button onClick={() => handleSaveGrade(modalData.subject, modalData.semester, modalData.initialGrade)}>Salvar</button>
              <button onClick={handleCloseModal}>Fechar</button>
            </StyledButtonContainer>
          </StyledEditGrade>
      )}
      <StyledReturnStudentsListButton onClick={handleBackToList}>
        <FontAwesomeIcon icon={faArrowLeft} />
          Voltar para a lista de alunos
        </StyledReturnStudentsListButton>
    </StyledStudentsListMainDiv>
    </StyledMainContainer>
    </>
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

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 16px;
`;

const StyledEditGrade = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 1.0;
  background-color: #8ecae6;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 90%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    margin-top: 0;
    color: #023e8a;
  }

  p {
    margin: 8px 0;
    color: #023e8a;
  }

  input {
    width: 80%;
    padding: 10px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    box-sizing: border-box;
  }

  button {
    padding: 10px 20px;
    background-color: #ffb703;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 8px;
    font-size: 16px;
    color: #023e8a;
    transition: background-color 0.3s;

    &:hover {
      background-color: #faa307;
    }
  }
`;