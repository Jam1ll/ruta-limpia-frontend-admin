import { useState } from "react";
import { CloudLightning, CloudRain, Sun, AlertTriangle } from "lucide-react";

interface WeatherAlert {
  id: number;
  type: "Lluvia Fuerte" | "Tormenta" | "Despejado";
  date: string;
  affectedSectors: string[];
  severity: "Alta" | "Media" | "Baja";
  message: string;
}

const mockAlerts: WeatherAlert[] = [
  {
    id: 101,
    type: "Tormenta",
    date: "Mañana, 14:00 - 18:00",
    affectedSectors: ["Todos los sectores costeros"],
    severity: "Alta",
    message:
      "Se esperan fuertes vientos e inundaciones urbanas. Posible suspensión de rutas PM.",
  },
  {
    id: 102,
    type: "Lluvia Fuerte",
    date: "Hoy, 18:00 - 20:00",
    affectedSectors: ["Centro Histórico", "Gascue"],
    severity: "Media",
    message:
      "Lluvias continuas. Precaución por pavimento mojado y tráfico lento.",
  },
];

export default function Weather() {
  const [alerts] = useState<WeatherAlert[]>(mockAlerts);

  const WeatherIcon = ({ type }: { type: string }) => {
    if (type === "Tormenta")
      return <CloudLightning className="w-8 h-8 text-indigo-500" />;
    if (type === "Lluvia Fuerte")
      return <CloudRain className="w-8 h-8 text-blue-500" />;
    return <Sun className="w-8 h-8 text-yellow-500" />;
  };

  return (
    <>
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <CloudLightning className="w-6 h-6 text-ruta-primary" />
          Alertas Meteorológicas
        </h2>
        <p className="text-gray-500 mt-1">
          Monitoreo de clima para prevención en rutas de recolección.
        </p>
      </header>

      {/* Widget de Clima Actual */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white shadow-lg mb-8 flex justify-between items-center">
        <div>
          <p className="text-blue-100 font-medium mb-1">
            Estado Actual - Santo Domingo
          </p>
          <div className="flex items-end gap-4">
            <span className="text-5xl font-bold">28°C</span>
            <span className="text-xl text-blue-100 mb-1">
              Parcialmente Nublado
            </span>
          </div>
        </div>
        <Sun className="w-16 h-16 text-yellow-300 opacity-90" />
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-4">
        Avisos Operativos ({alerts.length})
      </h3>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex gap-6"
          >
            <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 border border-gray-100">
              <WeatherIcon type={alert.type} />
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-lg text-gray-900">
                  {alert.type}
                </h4>
                {alert.severity === "Alta" && (
                  <span className="flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold">
                    <AlertTriangle className="w-3 h-3" /> Severidad Alta
                  </span>
                )}
              </div>

              <p className="text-gray-600 text-sm mb-3">{alert.message}</p>

              <div className="flex gap-6 text-sm">
                <div className="flex flex-col">
                  <span className="text-gray-400 text-xs">Cuándo</span>
                  <span className="font-medium text-gray-700">
                    {alert.date}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-xs">
                    Sectores Afectados
                  </span>
                  <span className="font-medium text-gray-700">
                    {alert.affectedSectors.join(", ")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
