import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import ReportCard from './pages/components/report-card';
import StudentsList from './pages/components/students-list';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/boletim/:alunoId" element={<ReportCard />} />
        <Route path="/meus-alunos" element={<StudentsList />} />
      </Routes>
    </Router>
  );
}

export default App;
