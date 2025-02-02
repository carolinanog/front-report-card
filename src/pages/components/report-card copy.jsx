import { useParams, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Header } from "../../components/header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import ModalEditGrade from './modal-edit-grade'; 

const ReportCard = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { studentName, gender } = location.state || {};
  const { alunoId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleEditGrade = (subject, semester) => {
    const initialGrade = studentsGrades[alunoId].grades.find(grade => grade.subject === subject)[semester];
    setModalData({ subject, semester, initialGrade });
    setIsModalOpen(true);
  };

  const handleSaveGrade = (subject, semester, newGrade) => {
    setStudentsGrades(prevGrades => {
      const updatedGrades = { ...prevGrades };
      const studentGrades = updatedGrades[alunoId].grades;
      const gradeIndex = studentGrades.findIndex(grade => grade.subject === subject);
      studentGrades[gradeIndex][semester] = newGrade;
      return updatedGrades;
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBackToList = () => {
    navigate('/meus-alunos');
  };

  const [studentsGrades, setStudentsGrades] = useState({
    1: {
      name: 'Alice Souza de Melo',
      grades: [
        { subject: 'Artes', firstSemester: 8.5, secondSemester: 7.9 },
        { subject: 'Ciências', firstSemester: 6.7, secondSemester: 5.8 },
        { subject: 'Educação Física', firstSemester: 7.8, secondSemester: 8.2 },
        { subject: 'Geografia', firstSemester: 6.9, secondSemester: 7.1 },
        { subject: 'História', firstSemester: 6.4, secondSemester: 7.5 },
        { subject: 'Língua Portuguesa', firstSemester: 8.2, secondSemester: 8.6 },
        { subject: 'Matemática', firstSemester: 5.3, secondSemester: 5.7 },
      ]
    },
    2: {
      name: 'Bruno Soares',
      grades: [
        { subject: 'Artes', firstSemester: 7.5, secondSemester: 8.0 },
        { subject: 'Ciências', firstSemester: 6.0, secondSemester: 6.5 },
        { subject: 'Educação Física', firstSemester: 7.0, secondSemester: 7.5 },
        { subject: 'Geografia', firstSemester: 8.0, secondSemester: 8.3 },
        { subject: 'História', firstSemester: 7.5, secondSemester: 8.0 },
        { subject: 'Língua Portuguesa', firstSemester: 8.5, secondSemester: 8.9 },
        { subject: 'Matemática', firstSemester: 7.0, secondSemester: 7.5 },
      ]
    },
    3: {
      name: 'Carla Pereira',
      grades: [
        { subject: 'Artes', firstSemester: 9.0, secondSemester: 8.5 },
        { subject: 'Ciências', firstSemester: 7.5, secondSemester: 7.0 },
        { subject: 'Educação Física', firstSemester: 8.5, secondSemester: 8.0 },
        { subject: 'Geografia', firstSemester: 8.5, secondSemester: 8.7 },
        { subject: 'História', firstSemester: 6.5, secondSemester: 7.4 },
        { subject: 'Língua Portuguesa', firstSemester: 9.0, secondSemester: 8.8 },
        { subject: 'Matemática', firstSemester: 7.5, secondSemester: 7.8 },
      ]
    },
    4: {
      name: 'Daniel Oliveira',
      grades: [
        { subject: 'Artes', firstSemester: 6.5, secondSemester: 7.0 },
        { subject: 'Ciências', firstSemester: 5.5, secondSemester: 6.0 },
        { subject: 'Educação Física', firstSemester: 7.0, secondSemester: 7.5 },
        { subject: 'Geografia', firstSemester: 7.5, secondSemester: 8.0 },
        { subject: 'História', firstSemester: 6.0, secondSemester: 6.5 },
        { subject: 'Língua Portuguesa', firstSemester: 7.5, secondSemester: 8.0 },
        { subject: 'Matemática', firstSemester: 6.5, secondSemester: 7.0 },
      ]
    },
    5: {
      name: 'Elisa Fernandes',
      grades: [
        { subject: 'Artes', firstSemester: 8.0, secondSemester: 8.5 },
        { subject: 'Ciências', firstSemester: 7.0, secondSemester: 7.5 },
        { subject: 'Educação Física', firstSemester: 8.0, secondSemester: 8.5 },
        { subject: 'Geografia', firstSemester: 8.5, secondSemester: 8.9 },
        { subject: 'História', firstSemester: 7.5, secondSemester: 8.0 },
        { subject: 'Língua Portuguesa', firstSemester: 8.5, secondSemester: 8.8 },
        { subject: 'Matemática', firstSemester: 7.5, secondSemester: 7.9 },
      ]
    },
    6: {
      name: 'Felipe Costa',
      grades: [
        { subject: 'Artes', firstSemester: 7.0, secondSemester: 7.5 },
        { subject: 'Ciências', firstSemester: 6.0, secondSemester: 6.5 },
        { subject: 'Educação Física', firstSemester: 7.5, secondSemester: 8.0 },
        { subject: 'Geografia', firstSemester: 3.5, secondSemester: 5.6 },
        { subject: 'História', firstSemester: 6.5, secondSemester: 7.0 },
        { subject: 'Língua Portuguesa', firstSemester: 7.5, secondSemester: 8.0 },
        { subject: 'Matemática', firstSemester: 6.5, secondSemester: 7.0 },
      ]
    },
    7: {
      name: 'Gabriela Assis',
      grades: [
        { subject: 'Artes', firstSemester: 8.0, secondSemester: 8.5 },
        { subject: 'Ciências', firstSemester: 7.0, secondSemester: 7.5 },
        { subject: 'Educação Física', firstSemester: 8.0, secondSemester: 8.5 },
        { subject: 'Geografia', firstSemester: 8.5, secondSemester: 8.9 },
        { subject: 'História', firstSemester: 7.5, secondSemester: 8.0 },
        { subject: 'Língua Portuguesa', firstSemester: 8.5, secondSemester: 8.8 },
        { subject: 'Matemática', firstSemester: 7.5, secondSemester: 7.9 },
      ]
    },
    8: {
      name: 'Henrique Lima',
      grades: [
        { subject: 'Artes', firstSemester: 7.5, secondSemester: 8.0 },
        { subject: 'Ciências', firstSemester: 6.5, secondSemester: 7.0 },
        { subject: 'Educação Física', firstSemester: 7.5, secondSemester: 8.0 },
        { subject: 'Geografia', firstSemester: 4.2, secondSemester: 6.5 },
        { subject: 'História', firstSemester: 5.6, secondSemester: 6.5 },
        { subject: 'Língua Portuguesa', firstSemester: 6.0, secondSemester: 5.5 },
        { subject: 'Matemática', firstSemester: 7.0, secondSemester: 7.5 },
      ]
    },
    9: {
      name: 'Isabela Santos',
      grades: [
        { subject: 'Artes', firstSemester: 8.5, secondSemester: 9.0 },
        { subject: 'Ciências', firstSemester: 7.5, secondSemester: 8.0 },
        { subject: 'Educação Física', firstSemester: 8.5, secondSemester: 9.0 },
        { subject: 'Geografia', firstSemester: 8.5, secondSemester: 8.9 },
        { subject: 'História', firstSemester: 7.5, secondSemester: 8.0 },
        { subject: 'Língua Portuguesa', firstSemester: 8.5, secondSemester: 8.8 },
        { subject: 'Matemática', firstSemester: 4.5, secondSemester: 5.2 },
      ]
    },
    10: {
      name: 'João Silva',
      grades: [
        { subject: 'Artes', firstSemester: 7.0, secondSemester: 7.5 },
        { subject: 'Ciências', firstSemester: 6.0, secondSemester: 6.5 },
        { subject: 'Educação Física', firstSemester: 7.5, secondSemester: 8.0 },
        { subject: 'Geografia', firstSemester: 7.5, secondSemester: 8.0 },
        { subject: 'História', firstSemester: 6.5, secondSemester: 7.0 },
        { subject: 'Língua Portuguesa', firstSemester: 7.5, secondSemester: 8.0 },
        { subject: 'Matemática', firstSemester: 6.5, secondSemester: 7.0 },
      ]
    },
  });

  const studentGrades = studentsGrades[alunoId]?.grades || [];

  return (
    <>
      <Header />
      <StyledMainContainer>
        <StyledStudentsListMainDiv>
          <div>
            <h2>Boletim d{gender === 'female' ? 'a' : 'o'} alun{gender === 'female' ? 'a' : 'o'} {studentName}</h2>
            <StyledTableContainer>
              <StyledTableStudentsList>
                <thead>
                  <tr>
                    <th>Disciplina</th>
                    <th>1° Semestre </th>
                    <th>2° Semestre</th>
                    <th>Média Final</th>
                    <th>Resultado Final</th>
                  </tr>
                </thead>
                <tbody>
                  {studentGrades.map((grade, index) => (
                    <tr key={index}>
                      <td>{grade.subject}</td>
                      <td>
                        <StyledGradeContainer>
                          <StyledGradeText grade={grade.firstSemester}>
                            {grade.firstSemester.toFixed(1)}
                          </StyledGradeText>
                          <StyledEditButton onClick={() => handleEditGrade(grade.subject, 'firstSemester')}>
                            <FontAwesomeIcon icon={faEdit} color="#fb8500" />
                          </StyledEditButton>
                        </StyledGradeContainer>
                      </td>
                      <td>
                        <StyledGradeContainer>
                          <StyledGradeText grade={grade.secondSemester}>
                            {grade.secondSemester.toFixed(1)}
                          </StyledGradeText>
                          <StyledEditButton onClick={() => handleEditGrade(grade.subject, 'secondSemester')}>
                            <FontAwesomeIcon icon={faEdit} color="#fb8500" />
                          </StyledEditButton>
                        </StyledGradeContainer>
                      </td>
                      <td>
                        <StyledGradeText grade={((grade.firstSemester + grade.secondSemester) / 2).toFixed(1)}>
                          {((grade.firstSemester + grade.secondSemester) / 2).toFixed(1)}
                        </StyledGradeText>
                      </td>
                      <td>
                        <StyledGradeText grade={((grade.firstSemester + grade.secondSemester) / 2)}>
                          {((grade.firstSemester + grade.secondSemester) / 2) >= 6 ? (gender === 'female' ? 'Aprovada' : 'Aprovado') : (gender === 'female' ? 'Reprovada' : 'Reprovado')}
                        </StyledGradeText>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </StyledTableStudentsList>
            </StyledTableContainer>
          </div>
          <StyledReturnStudentsListButton onClick={handleBackToList}>
          <FontAwesomeIcon icon={faArrowLeft} />
            Voltar para a lista de alunos
          </StyledReturnStudentsListButton>
        </StyledStudentsListMainDiv>
      </StyledMainContainer>
      {isModalOpen && <ModalEditGrade modalData={modalData} onClose={handleCloseModal} onSave={handleSaveGrade} />}
    </>
  );
};

export default ReportCard;

// Styled components

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