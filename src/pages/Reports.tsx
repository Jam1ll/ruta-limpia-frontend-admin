import { useState } from "react";
import { Search, X, Edit2, Trash2, Users, FileText, Home } from "lucide-react";

type ReportStatus = 1 | 2 | 3;
interface Report {
  id: number;
  date: string;
  citizen: string;
  sector: string;
  issue: string;
  description: string;
  imageUrl: string;
  status: ReportStatus;
}

const mockReports: Report[] = [
  {
    id: 30,
    date: "12/10/2023",
    citizen: "Carlos Méndez",
    sector: "Centro",
    issue: "La papelera de Av. Lincoln...",
    description:
      "La papelera en la intersección de Av. Lincoln y C. Polanco está completamente desbordada...",
    imageUrl:
      "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?w=800",
    status: 2,
  },
  {
    id: 35,
    date: "13/10/2023",
    citizen: "Ana Paula",
    sector: "Piantini",
    issue: "Escombros en la vía",
    description: "Alguien dejó escombros de construcción en medio de la calle.",
    imageUrl:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800",
    status: 3,
  },
];

export default function Reports() {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const handleStatusChange = (id: number, newStatus: ReportStatus) => {
    setReports(
      reports.map((r) => (r.id === id ? { ...r, status: newStatus } : r)),
    );
    if (selectedReport)
      setSelectedReport({ ...selectedReport, status: newStatus });
  };

  const StatusBadge = ({ status }: { status: ReportStatus }) => {
    if (status === 2)
      return (
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-md text-xs font-bold">
          IN_PROGRESS (2)
        </span>
      );
    if (status === 3)
      return (
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-xs font-bold">
          SOLVED (3)
        </span>
      );
    return (
      <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-xs font-bold">
        PENDING (1)
      </span>
    );
  };

  return (
    <>
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Gestión de Reportes Ciudadanos
        </h2>
        <p className="text-gray-500 mt-1">
          Listado completo de incidencias. Clic para ver detalles y gestionar
          estado.
        </p>
        <div className="mt-6 relative w-96">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar reporte..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-ruta-primary/50"
          />
        </div>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
              <th className="p-4 font-medium">ID</th>
              <th className="p-4 font-medium">Fecha</th>
              <th className="p-4 font-medium">Ciudadano</th>
              <th className="p-4 font-medium">Sector</th>
              <th className="p-4 font-medium">Incidencia</th>
              <th className="p-4 font-medium">Estado</th>
              <th className="p-4 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-4 text-gray-600">#{report.id}</td>
                <td className="p-4 text-gray-600">{report.date}</td>
                <td className="p-4 font-medium">{report.citizen}</td>
                <td className="p-4 text-gray-600">{report.sector}</td>
                <td className="p-4 text-gray-600 truncate max-w-xs">
                  {report.issue}
                </td>
                <td className="p-4">
                  <StatusBadge status={report.status} />
                </td>
                <td className="p-4 flex gap-2 text-gray-400">
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

      {/* MODAL */}
      {selectedReport && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold">
                Detalles del Reporte #{selectedReport.id}
              </h3>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex p-6 gap-8">
              <div className="w-1/3 space-y-6">
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Users className="w-4 h-4" /> Ciudadano
                  </p>
                  <p className="font-medium mt-1">{selectedReport.citizen}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Fecha
                  </p>
                  <p className="font-medium mt-1">{selectedReport.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Home className="w-4 h-4" /> Sector
                  </p>
                  <p className="font-medium mt-1">{selectedReport.sector}</p>
                </div>
              </div>
              <div className="w-2/3 space-y-4">
                <div className="w-full h-48 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                  <img
                    src={selectedReport.imageUrl}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <p className="text-sm font-bold text-gray-700 mb-2">
                      Descripción
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedReport.description}
                    </p>
                  </div>
                  <div className="w-64 bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-700 mb-2">
                        Estado
                      </p>
                      <select
                        value={selectedReport.status}
                        onChange={(e) =>
                          handleStatusChange(
                            selectedReport.id,
                            Number(e.target.value) as ReportStatus,
                          )
                        }
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-ruta-primary outline-none"
                      >
                        {selectedReport.status === 1 && (
                          <option value={1} disabled>
                            PENDING (1)
                          </option>
                        )}
                        <option value={2}>IN_PROGRESS (2)</option>
                        <option value={3}>SOLVED (3)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
