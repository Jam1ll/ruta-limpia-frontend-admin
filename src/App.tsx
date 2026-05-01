import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import Notifications from "./pages/Notifications";
import Sectors from "./pages/Sectors";
import Weather from "./pages/Weather";
import Dashboard from "./pages/Dashboard";
import Trucks from "./pages/Trucks";
import RoutesPage from "./pages/RoutesPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="reportes" element={<Reports />} />
          <Route path="usuarios" element={<Users />} />
          <Route path="camiones" element={<Trucks />} />
          <Route path="rutas" element={<RoutesPage />} />
          <Route path="notificaciones" element={<Notifications />} />
          <Route path="sectores" element={<Sectors />} />
          <Route path="alertas" element={<Weather />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
