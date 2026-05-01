import { useState } from "react";
import { Search, Map, MoreVertical, Route as RouteIcon } from "lucide-react";

interface Sector {
  id: string;
  name: string;
  routeAssigned: string;
  status: "Activo" | "Pendiente" | "Completado";
  schedule: string;
  population: number;
}

const mockSectors: Sector[] = [
  {
    id: "SEC-001",
    name: "Las Américas",
    routeAssigned: "Ruta #4",
    status: "Activo",
    schedule: "Lun - Mié - Vie",
    population: 15400,
  },
  {
    id: "SEC-002",
    name: "Centro Histórico",
    routeAssigned: "Ruta #1",
    status: "Pendiente",
    schedule: "Mar - Jue - Sáb",
    population: 8200,
  },
  {
    id: "SEC-003",
    name: "Los Jardines",
    routeAssigned: "Ruta #6",
    status: "Completado",
    schedule: "Lun - Mié - Vie",
    population: 12100,
  },
  {
    id: "SEC-004",
    name: "Villa Mella",
    routeAssigned: "Ruta #3",
    status: "Pendiente",
    schedule: "Mar - Jue - Sáb",
    population: 45000,
  },
];

export default function Sectors() {
  const [sectors] = useState<Sector[]>(mockSectors);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activo":
        return "text-ruta-primary bg-green-50 border-ruta-secondary/20";
      case "Pendiente":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "Completado":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <>
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Gestión de Sectores
          </h2>
          <p className="text-gray-500 mt-1">
            Administra las zonas de la ciudad y sus rutas de recolección
            asignadas.
          </p>

          <div className="mt-6 relative w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar sector o ruta..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-ruta-primary/50"
            />
          </div>
        </div>
        <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-xl font-medium shadow-sm flex items-center gap-2 transition-colors">
          <Map className="w-4 h-4" /> Ver Mapa Global
        </button>
      </header>

      {/* Grid de Sectores (Alternativa a tabla para variar el diseño) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectors.map((sector) => (
          <div
            key={sector.id}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span
                  className={`px-2 py-1 rounded border text-[10px] font-bold uppercase tracking-wider ${getStatusColor(sector.status)}`}
                >
                  {sector.status}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-2">
                  {sector.name}
                </h3>
                <p className="text-xs text-gray-400 font-mono mt-1">
                  {sector.id}
                </p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 mt-6">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-8 h-8 rounded-full bg-ruta-bg flex items-center justify-center text-ruta-primary">
                  <RouteIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Ruta Asignada</p>
                  <p className="font-medium">{sector.routeAssigned}</p>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-50 text-sm">
                <div>
                  <p className="text-xs text-gray-400">Días de Servicio</p>
                  <p className="font-medium text-gray-700">{sector.schedule}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Población Aprox.</p>
                  <p className="font-medium text-gray-700">
                    {sector.population.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
