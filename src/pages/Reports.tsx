import { useState, useEffect } from "react";
import { Search, X, Trash2, Users, FileText, Home } from "lucide-react";

// --- INTERFACES ---
type ReportStatus = 1 | 2 | 3;

interface Report {
  id: string;
  title: string;
  description: string;
  photoUrl: string | null;
  directionReference: string;
  latitude: number;
  longitude: number;
  reportType: number;
  reportState: ReportStatus;
  userId: string;
  sectorId: string;
  createdAt: string;
}

interface Sector {
  id: string;
  name: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export default function Reports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const [sectorsMap, setSectorsMap] = useState<Record<string, string>>({});
  const [usersMap, setUsersMap] = useState<Record<string, string>>({});

  const API_BASE_URL = "http://localhost:5152/api/v1";

  // --- CARGA DE DATOS ---
  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const headers = { Accept: "application/json" };

      const reportsRes = await fetch(`${API_BASE_URL}/Report/All`, { headers });
      const sectorsRes = await fetch(`${API_BASE_URL}/Sector/All`, { headers });

      let usersData: User[] = [];
      try {
        const usersRes = await fetch(`${API_BASE_URL}/Account/All`, {
          headers,
        });
        if (usersRes.ok) {
          const uJson = await usersRes.json();
          usersData = uJson.data || [];
        }
      } catch (e) {
        console.log("Endpoint de usuarios no disponible aún", e);
      }

      if (reportsRes.ok && sectorsRes.ok) {
        const rJson = await reportsRes.json();
        const sJson = await sectorsRes.json();

        setReports(rJson.data || []);

        const sMap: Record<string, string> = {};
        (sJson.data || []).forEach((s: Sector) => {
          sMap[s.id] = s.name;
        });
        setSectorsMap(sMap);

        const uMap: Record<string, string> = {};
        usersData.forEach((u: User) => {
          uMap[u.id] = `${u.firstName} ${u.lastName}`;
        });
        setUsersMap(uMap);
      } else {
        console.error("Error cargando los datos base.");
      }
    } catch (error) {
      console.error("Error de red:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      await fetchAllData();
    };
    loadInitialData();
  }, []);

  const handleRefresh = () => {
    fetchAllData();
  };

  // --- ACTUALIZACIÓN DE ESTADO ---
  const handleStatusChange = async (id: string, newStatus: ReportStatus) => {
    if (!selectedReport) return;
    setIsUpdating(true);
    try {
      // Usamos el payload minimalista para el nuevo endpoint ChangeState
      const payload = {
        id: id,
        reportState: newStatus,
      };

      const response = await fetch(`${API_BASE_URL}/Report/ChangeState`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setReports(
          reports.map((r) =>
            r.id === id ? { ...r, reportState: newStatus } : r,
          ),
        );
        setSelectedReport({ ...selectedReport, reportState: newStatus });
      } else {
        alert("Error al actualizar el estado del reporte.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  // --- UI COMPONENTS ---
  const StatusBadge = ({ status }: { status: ReportStatus }) => {
    if (status === 2)
      return (
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-md text-xs font-bold">
          EN PROCESO
        </span>
      );
    if (status === 3)
      return (
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-xs font-bold">
          CERRADO
        </span>
      );
    return (
      <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-xs font-bold">
        PENDIENTE
      </span>
    );
  };

  const getSectorName = (id: string) => sectorsMap[id] || "Sector Desconocido";
  const getUserName = (id: string) => usersMap[id] || "Usuario Anónimo";

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
        <div className="mt-6 flex justify-between items-center">
          <div className="relative w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar reporte..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-ruta-primary/50"
            />
          </div>
          <button
            onClick={handleRefresh}
            className="text-sm text-ruta-primary hover:underline font-medium"
          >
            Actualizar Lista
          </button>
        </div>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 font-medium">
              Cargando reportes y datos del servidor...
            </p>
          </div>
        ) : reports.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 font-medium">
              No hay reportes registrados aún.
            </p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="p-4 font-medium">Fecha</th>
                <th className="p-4 font-medium">Sector</th>
                <th className="p-4 font-medium">Título</th>
                <th className="p-4 font-medium">Estado</th>
                <th className="p-4 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr
                  key={report.id}
                  onClick={() => setSelectedReport(report)}
                  className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="p-4 text-gray-600">
                    {report.createdAt
                      ? new Date(report.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-4 font-medium text-gray-800">
                    {getSectorName(report.sectorId)}
                  </td>
                  <td className="p-4 text-gray-600 truncate max-w-[200px]">
                    {report.title}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={report.reportState} />
                  </td>
                  <td className="p-4 flex gap-2 text-gray-400">
                    <button
                      className="hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Lógica de eliminar
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL DE DETALLES */}
      {selectedReport && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-xl font-bold text-gray-900">
                Detalles del Reporte{" "}
                <span className="text-sm font-mono text-gray-500 font-normal ml-2">
                  #{selectedReport.id.substring(0, 8)}
                </span>
              </h3>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex p-6 gap-8">
              <div className="w-1/3 space-y-6">
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Users className="w-4 h-4" /> Reportado por
                  </p>
                  <p className="font-medium text-gray-900 mt-1">
                    {getUserName(selectedReport.userId)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Home className="w-4 h-4" /> Sector Afectado
                  </p>
                  <p className="font-medium text-gray-900 mt-1">
                    {getSectorName(selectedReport.sectorId)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Coordenadas GPS
                  </p>
                  <p className="text-sm mt-1 text-gray-700 font-mono">
                    {selectedReport.latitude.toFixed(6)}, <br />
                    {selectedReport.longitude.toFixed(6)}
                  </p>
                </div>
              </div>

              <div className="w-2/3 space-y-4">
                <div className="w-full h-48 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
                  {selectedReport.photoUrl ? (
                    <img
                      src={
                        selectedReport.photoUrl.startsWith("http")
                          ? selectedReport.photoUrl
                          : `${API_BASE_URL.replace("/api/v1", "")}${selectedReport.photoUrl}`
                      }
                      className="w-full h-full object-cover"
                      alt="Evidencia del reporte"
                    />
                  ) : (
                    <span className="text-gray-400 font-medium">
                      Sin imagen de evidencia
                    </span>
                  )}
                </div>

                <div className="flex gap-4">
                  <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <p className="text-sm font-bold text-gray-700 mb-2">
                      {selectedReport.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedReport.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-4 pt-3 border-t border-gray-200">
                      <strong>Ref:</strong> {selectedReport.directionReference}
                    </p>
                  </div>

                  <div className="w-64 bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-700 mb-2">
                        Estado Actual
                      </p>
                      <select
                        value={selectedReport.reportState}
                        disabled={isUpdating}
                        onChange={(e) =>
                          handleStatusChange(
                            selectedReport.id,
                            Number(e.target.value) as ReportStatus,
                          )
                        }
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-ruta-primary outline-none disabled:opacity-50"
                      >
                        {selectedReport.reportState === 1 && (
                          <option value={1} disabled>
                            PENDIENTE
                          </option>
                        )}
                        <option value={2}>EN PROCESO</option>
                        <option value={3}>CERRADO</option>
                      </select>
                      {isUpdating && (
                        <p className="text-xs text-ruta-primary mt-2">
                          Guardando...
                        </p>
                      )}
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
