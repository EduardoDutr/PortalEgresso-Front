import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SeeEgresso from "./pages/SeeEgresso";
import SearchEgressos from "./pages/SearchEgressos";
import Login from "./pages/Login";
import { useAuth } from "./components/AuthContext";
import CreateEgresso from "./pages/CreateEgresso";
import AssociateEgressoCurso from "./pages/AssociateEgressoCurso";
import ManageCurso from "./pages/ManageCurso";
import { CreateCargo } from "./components/CreateCargo";
import { CreateDepoimento } from "./pages/CreateDepoimento";
import Pendencies from "./pages/Pendencies";
import OportunitiesPanel from "./pages/OportunitiesPanel";
import CreateOportunidade from "./pages/CreateOportunidade";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/associarEgressoCurso" element={<AssociateEgressoCurso />} />
          <Route path="/createCurso" element={<ManageCurso />} />
          <Route path="/associarEgressoCargo" element={<CreateCargo />} />
          <Route path="/adicionarDepoimento" element={<CreateDepoimento />} />
          <Route path="/pendencias" element={<Pendencies />} />
        </Route>
        <Route path="/createEgresso" element={<CreateEgresso />} />
        <Route path="/visualizarEgresso" element={<SeeEgresso />} />
        <Route path="/buscarEgressos" element={<SearchEgressos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/oportunidades" element={<OportunitiesPanel />} />
        <Route path="/criarOportunidade" element={<CreateOportunidade />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;