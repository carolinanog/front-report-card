import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import StudentsList from "../pages/components/students-list";
import ReportCard from "../pages/components/report-card";
import Login from "../components/login";

export function SystemRouter() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/boletim/:alunoId" element={<ReportCard />} />
          <Route path="/meus-alunos" element={<StudentsList />} />
          <Route path="/notas/:alunoId/:disciplinaId" element={<ReportCard />} />
        </Routes>
      </BrowserRouter>
    );
  }