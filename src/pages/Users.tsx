import { useState } from "react";
import {
  Search,
  UserPlus,
  Edit2,
  Trash2,
  Phone,
  Truck,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";

// --- TIPOS DE DATOS ---
interface Collector {
  id: string;
  name: string;
  phone: string;
  license: string;
  assignedTruck: string;
  status: "Activo" | "Inactivo" | "Permiso";
  shift: "Matutino" | "Vespertino" | "Nocturno";
}

// --- DATOS DE PRUEBA (MOCK) ---
const mockCollectors: Collector[] = [
  {
    id: "COL-001",
    name: "José Pérez",
    phone: "+1 (809) 555-0123",
    license: "Categoría 4",
    assignedTruck: "TRK-001 (L-123456)",
    status: "Activo",
    shift: "Matutino",
  },
  {
    id: "COL-002",
    name: "Miguel Ángel",
    phone: "+1 (829) 555-0456",
    license: "Categoría 4",
    assignedTruck: "TRK-002 (L-789012)",
    status: "Activo",
    shift: "Matutino",
  },
  {
    id: "COL-003",
    name: "Luis Gómez",
    phone: "+1 (849) 555-0789",
    license: "Categoría 3",
    assignedTruck: "Sin Asignar",
    status: "Inactivo",
    shift: "Nocturno",
  },
  {
    id: "COL-004",
    name: "Antonio Cruz",
    phone: "+1 (809) 555-0987",
    license: "Categoría 4",
    assignedTruck: "Sin Asignar",
    status: "Permiso",
    shift: "Vespertino",
  },
];

export default function Users() {
  const [collectors] = useState<Collector[]>(mockCollectors);

  // Helper para renderizar el estado visualmente
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "Activo":
        return (
          <span className="flex items-center gap-1 w-fit bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
            <CheckCircle2 className="w-3 h-3" /> Activo
          </span>
        );
      case "Permiso":
        return (
          <span className="flex items-center gap-1 w-fit bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-bold border border-orange-200">
            <Clock className="w-3 h-3" /> Permiso
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
          <h2 className="text-2xl font-bold text-gray-900">Recolectores</h2>
          <p className="text-gray-500 mt-1">
            Gestión de conductores y personal de recolección.
          </p>

          <div className="mt-6 relative w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o ID..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-ruta-primary/50"
            />
          </div>
        </div>

        <button className="bg-ruta-primary hover:bg-ruta-primary/90 text-white px-6 py-2 rounded-xl font-medium shadow-sm flex items-center gap-2 transition-colors">
          <UserPlus className="w-5 h-5" /> Registrar Recolector
        </button>
      </header>

      {/* --- TABLA DE RECOLECTORES --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
              <th className="p-4 font-medium">Recolector</th>
              <th className="p-4 font-medium">Contacto</th>
              <th className="p-4 font-medium">Licencia y Turno</th>
              <th className="p-4 font-medium">Camión Asignado</th>
              <th className="p-4 font-medium">Estado</th>
              <th className="p-4 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {collectors.map((collector) => (
              <tr
                key={collector.id}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                {/* Nombre e ID */}
                <td className="p-4">
                  <p className="font-bold text-gray-900">{collector.name}</p>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">
                    {collector.id}
                  </p>
                </td>

                {/* Contacto */}
                <td className="p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{collector.phone}</span>
                  </div>
                </td>

                {/* Licencia y Turno */}
                <td className="p-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <ShieldCheck className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">{collector.license}</span>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 w-fit px-2 py-0.5 rounded">
                      Turno {collector.shift}
                    </span>
                  </div>
                </td>

                {/* Camión Asignado */}
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${collector.assignedTruck === "Sin Asignar" ? "bg-red-50 text-red-400" : "bg-ruta-bg text-ruta-primary"}`}
                    >
                      <Truck className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-sm font-medium ${collector.assignedTruck === "Sin Asignar" ? "text-red-500" : "text-gray-700"}`}
                    >
                      {collector.assignedTruck}
                    </span>
                  </div>
                </td>

                {/* Estado */}
                <td className="p-4">
                  <StatusBadge status={collector.status} />
                </td>

                {/* Acciones */}
                <td className="p-4">
                  <div className="flex gap-3 text-gray-400">
                    <button
                      className="hover:text-ruta-primary transition-colors"
                      title="Editar"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      className="hover:text-red-500 transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
