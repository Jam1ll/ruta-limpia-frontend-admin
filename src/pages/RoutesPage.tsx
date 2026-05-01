import { useState } from "react";
import {
  Search,
  Route as RouteIcon,
  Map,
  Plus,
  Clock,
  Truck,
} from "lucide-react";

interface RouteData {
  id: string;
  name: string;
  sector: string;
  assignedTruck: string;
  shift: "Matutino" | "Vespertino" | "Nocturno";
  status: "Programada" | "En Curso" | "Finalizada";
}

const mockRoutes: RouteData[] = [
  {
    id: "RT-001",
    name: "Ruta 1 - Casco Antiguo",
    sector: "Centro Histórico",
    assignedTruck: "TRK-001",
    shift: "Matutino",
    status: "En Curso",
  },
  {
    id: "RT-002",
    name: "Ruta 2 - Zona Norte",
    sector: "Villa Mella",
    assignedTruck: "TRK-002",
    shift: "Matutino",
    status: "Programada",
  },
  {
    id: "RT-003",
    name: "Ruta 3 - Financiera",
    sector: "Piantini",
    assignedTruck: "Sin Asignar",
    shift: "Vespertino",
    status: "Programada",
  },
  {
    id: "RT-004",
    name: "Ruta 4 - Residencial Sur",
    sector: "Las Américas",
    assignedTruck: "TRK-004",
    shift: "Nocturno",
    status: "Finalizada",
  },
];

export default function Routes() {
  const [routes] = useState<RouteData[]>(mockRoutes);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En Curso":
        return "text-blue-700 bg-blue-50 border-blue-200";
      case "Finalizada":
        return "text-green-700 bg-green-50 border-green-200";
      default:
        return "text-gray-700 bg-gray-100 border-gray-200"; // Programada
    }
  };

  return (
    <>
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Planificación de Rutas
          </h2>
          <p className="text-gray-500 mt-1">
            Conecta los sectores con los camiones operativos y define turnos.
          </p>

          <div className="mt-6 relative w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar ruta o sector..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-ruta-primary/50"
            />
          </div>
        </div>
        <button className="bg-ruta-primary hover:bg-ruta-primary/90 text-white px-6 py-2 rounded-xl font-medium shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-5 h-5" /> Nueva Ruta
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {routes.map((route) => (
          <div
            key={route.id}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-ruta-bg rounded-xl flex items-center justify-center text-ruta-primary">
                  <RouteIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{route.name}</h3>
                  <p className="text-xs text-gray-400 font-mono">{route.id}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(route.status)}`}
              >
                {route.status}
              </span>
            </div>

            <div className="space-y-4 mt-6">
              <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <Map className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-400">Sector Asignado</p>
                  <p className="font-medium text-gray-800">{route.sector}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">Camión</p>
                    <p
                      className={`font-medium ${route.assignedTruck === "Sin Asignar" ? "text-red-500" : "text-gray-800"}`}
                    >
                      {route.assignedTruck}
                    </p>
                  </div>
                </div>
                <div className="flex-1 flex items-center gap-3 text-sm text-gray-600 border-l border-gray-100 pl-4">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">Turno</p>
                    <p className="font-medium text-gray-800">{route.shift}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50 flex gap-2">
              <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium transition-colors">
                Editar
              </button>
              <button className="flex-1 bg-ruta-bg hover:bg-ruta-primary/10 text-ruta-primary py-2 rounded-lg text-sm font-medium transition-colors">
                Ver Mapa
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
