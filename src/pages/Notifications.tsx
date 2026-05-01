import { useState } from "react";
import {
  Search,
  Bell,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  target: "Todos" | "Ciudadanos" | "Collectors";
  status: "Enviada" | "Borrador";
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "Retraso en Ruta 4",
    message: "El camión de la Ruta 4 presenta retrasos por tráfico pesado.",
    date: "15/10/2023 14:30",
    target: "Ciudadanos",
    status: "Enviada",
  },
  {
    id: 2,
    title: "Mantenimiento de App",
    message:
      "La aplicación estará en mantenimiento este domingo de 2 AM a 4 AM.",
    date: "16/10/2023 09:00",
    target: "Todos",
    status: "Borrador",
  },
  {
    id: 3,
    title: "Bono de Desempeño",
    message:
      "¡Felicidades equipo! Hemos superado la meta de recolección semanal.",
    date: "12/10/2023 18:00",
    target: "Collectors",
    status: "Enviada",
  },
];

export default function Notifications() {
  const [notifications] = useState<Notification[]>(mockNotifications);

  const StatusIcon = ({ status }: { status: string }) => {
    return status === "Enviada" ? (
      <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-md text-xs font-medium">
        <CheckCircle2 className="w-3 h-3" /> {status}
      </span>
    ) : (
      <span className="flex items-center gap-1 text-orange-600 bg-orange-50 px-2 py-1 rounded-md text-xs font-medium">
        <AlertCircle className="w-3 h-3" /> {status}
      </span>
    );
  };

  return (
    <>
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Notificaciones y Avisos
          </h2>
          <p className="text-gray-500 mt-1">
            Gestiona los comunicados masivos para ciudadanos y equipo de
            recolección.
          </p>

          <div className="mt-6 relative w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar notificación..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-ruta-primary/50"
            />
          </div>
        </div>
        <button className="bg-ruta-primary hover:bg-ruta-primary/90 text-white px-6 py-2 rounded-xl font-medium shadow-sm flex items-center gap-2 transition-colors">
          <Bell className="w-4 h-4" /> Nueva Notificación
        </button>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
              <th className="p-4 font-medium">ID</th>
              <th className="p-4 font-medium">Título y Mensaje</th>
              <th className="p-4 font-medium">Destinatarios</th>
              <th className="p-4 font-medium">Fecha</th>
              <th className="p-4 font-medium">Estado</th>
              <th className="p-4 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notif) => (
              <tr
                key={notif.id}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <td className="p-4 text-gray-600">#{notif.id}</td>
                <td className="p-4">
                  <p className="font-medium text-gray-900">{notif.title}</p>
                  <p className="text-sm text-gray-500 truncate max-w-md">
                    {notif.message}
                  </p>
                </td>
                <td className="p-4">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                    {notif.target}
                  </span>
                </td>
                <td className="p-4 text-gray-600 text-sm">{notif.date}</td>
                <td className="p-4">
                  <StatusIcon status={notif.status} />
                </td>
                <td className="p-4 flex gap-2 text-gray-400 mt-2">
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
