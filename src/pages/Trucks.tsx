import { useState } from "react";
import {
  Search,
  Wrench,
  CheckCircle2,
  AlertCircle,
  Plus,
  Edit2,
  Trash2,
} from "lucide-react";

interface TruckData {
  id: string;
  plate: string;
  model: string;
  capacity: string;
  driver: string;
  status: "Activo" | "Mantenimiento" | "Inactivo";
  lastMaintenance: string;
}

const mockTrucks: TruckData[] = [
  {
    id: "TRK-001",
    plate: "L-123456",
    model: "Volvo FMX 2022",
    capacity: "15 Ton",
    driver: "José Pérez",
    status: "Activo",
    lastMaintenance: "10/09/2023",
  },
  {
    id: "TRK-002",
    plate: "L-789012",
    model: "Mack TerraPro",
    capacity: "20 Ton",
    driver: "Miguel Ángel",
    status: "Activo",
    lastMaintenance: "05/10/2023",
  },
  {
    id: "TRK-003",
    plate: "L-345678",
    model: "Freightliner M2",
    capacity: "12 Ton",
    driver: "Sin Asignar",
    status: "Mantenimiento",
    lastMaintenance: "15/10/2023",
  },
  {
    id: "TRK-004",
    plate: "L-901234",
    model: "Volvo FMX 2020",
    capacity: "15 Ton",
    driver: "Luis Gómez",
    status: "Inactivo",
    lastMaintenance: "01/08/2023",
  },
];

export default function Trucks() {
  const [trucks] = useState<TruckData[]>(mockTrucks);

  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "Activo":
        return (
          <span className="flex items-center gap-1 w-fit bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
            <CheckCircle2 className="w-3 h-3" /> Activo
          </span>
        );
      case "Mantenimiento":
        return (
          <span className="flex items-center gap-1 w-fit bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-bold border border-orange-200">
            <Wrench className="w-3 h-3" /> Mantenimiento
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 w-fit bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-bold border border-red-200">
            <AlertCircle className="w-3 h-3" /> Inactivo
          </span>
        );
    }
  };

  return (
    <>
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Flota de Camiones
          </h2>
          <p className="text-gray-500 mt-1">
            Gestión de vehículos, capacidades y estado de mantenimiento.
          </p>

          <div className="mt-6 relative w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por placa o ID..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-ruta-primary/50"
            />
          </div>
        </div>
        <button className="bg-ruta-primary hover:bg-ruta-primary/90 text-white px-6 py-2 rounded-xl font-medium shadow-sm flex items-center gap-2 transition-colors">
          <Plus className="w-5 h-5" /> Registrar Camión
        </button>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
              <th className="p-4 font-medium">ID / Placa</th>
              <th className="p-4 font-medium">Modelo y Capacidad</th>
              <th className="p-4 font-medium">Conductor (Collector)</th>
              <th className="p-4 font-medium">Últ. Mantenimiento</th>
              <th className="p-4 font-medium">Estado</th>
              <th className="p-4 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {trucks.map((truck) => (
              <tr
                key={truck.id}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <td className="p-4">
                  <p className="font-bold text-gray-900">{truck.id}</p>
                  <p className="text-sm text-gray-500">{truck.plate}</p>
                </td>
                <td className="p-4">
                  <p className="font-medium text-gray-700">{truck.model}</p>
                  <p className="text-xs text-gray-400 bg-gray-100 w-fit px-2 py-0.5 rounded mt-1">
                    {truck.capacity}
                  </p>
                </td>
                <td className="p-4 font-medium text-gray-700">
                  {truck.driver}
                </td>
                <td className="p-4 text-gray-600 text-sm">
                  {truck.lastMaintenance}
                </td>
                <td className="p-4">
                  <StatusBadge status={truck.status} />
                </td>
                <td className="p-4 flex gap-3 text-gray-400 mt-2">
                  <button className="hover:text-ruta-primary">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
