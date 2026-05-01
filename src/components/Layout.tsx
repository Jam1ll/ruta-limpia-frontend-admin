import { NavLink, Outlet } from "react-router-dom";
import {
  Home,
  FileText,
  Users,
  Bell,
  Map,
  CloudLightning,
  Trash2,
  Truck,
  Route as RouteIcon,
} from "lucide-react";

export default function Layout() {
  // Función para darle estilo al enlace activo del Sidebar
  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      isActive
        ? "bg-ruta-primary text-white shadow-md"
        : "text-gray-600 hover:bg-gray-50"
    }`;

  return (
    <div className="flex h-screen bg-ruta-bg font-sans text-gray-800 overflow-hidden">
      {/* SIDEBAR IZQUIERDO */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between">
        <div>
          <div className="p-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-ruta-primary rounded-lg flex items-center justify-center">
              <Trash2 className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">RutaLimpia</h1>
              <p className="text-xs text-gray-500">Gestión de Residuos</p>
            </div>
          </div>

          <nav className="px-4 mt-4 space-y-1">
            <NavLink to="/" className={navItemClass}>
              <Home className="w-5 h-5" /> Inicio
            </NavLink>
            <NavLink to="/reportes" className={navItemClass}>
              <FileText className="w-5 h-5" /> Reportes
            </NavLink>
            <NavLink to="/usuarios" className={navItemClass}>
              <Users className="w-5 h-5" /> Recolectores
            </NavLink>
            {/* NUEVOS ENLACES AQUÍ */}
            <NavLink to="/camiones" className={navItemClass}>
              <Truck className="w-5 h-5" /> Flota Camiones
            </NavLink>
            <NavLink to="/rutas" className={navItemClass}>
              <RouteIcon className="w-5 h-5" /> Rutas Diarias
            </NavLink>

            <NavLink to="/notificaciones" className={navItemClass}>
              <Bell className="w-5 h-5" /> Notificaciones
            </NavLink>
            <NavLink to="/sectores" className={navItemClass}>
              <Map className="w-5 h-5" /> Sectores
            </NavLink>
            <NavLink to="/alertas" className={navItemClass}>
              <CloudLightning className="w-5 h-5" /> Alertas Clima
            </NavLink>
          </nav>
        </div>

        <div className="p-4">
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-xl transition-colors mb-4">
            + Crear Notificación
          </button>
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
            <div className="w-10 h-10 bg-ruta-primary rounded-full flex items-center justify-center text-white font-bold">
              C
            </div>
            <div>
              <p className="text-sm font-bold">Carlos Admin</p>
              <p className="text-xs text-gray-500">Nivel 4 - Panel Web</p>
            </div>
          </div>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL DINÁMICO */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
