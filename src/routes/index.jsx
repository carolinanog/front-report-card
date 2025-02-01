import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentsList from "../pages/components/students-list";
import ReportCard from "../pages/components/report-card";
import Login from "../components/login";
import ModalEditGrade from "../pages/components/modal-edit-grade";


export function SystemRouter() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/boletim/:alunoId" element={<ReportCard />} />
          <Route path="/meus-alunos" element={<StudentsList />} />
          <Route path="/editar-nota" element={<ModalEditGrade />} />
        </Routes>
      </BrowserRouter>
    );
  }