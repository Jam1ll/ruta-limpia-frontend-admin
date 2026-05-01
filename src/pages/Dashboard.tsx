import {
  TrendingUp,
  Truck,
  AlertCircle,
  CheckCircle2,
  Clock,
  MapPin,
} from "lucide-react";

export default function Dashboard() {
  // Fecha actual formateada
  const today = new Date().toLocaleDateString("es-DO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Resumen Operativo
          </h2>
          <p className="text-gray-500 mt-1 capitalize">{today}</p>
        </div>
        <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-xl font-medium shadow-sm transition-colors text-sm">
          Descargar Reporte PDF
        </button>
      </header>

      {/* --- TARJETAS DE MÉTRICAS (KPIs) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">
              Camiones en Ruta
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-gray-900">14</p>
              <p className="text-xs text-gray-400">/ 18 total</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">
              Reportes Pendientes
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-gray-900">28</p>
              <p className="text-xs text-red-500 flex items-center font-medium">
                <TrendingUp className="w-3 h-3 mr-1" /> +12%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-500 shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">
              Reportes Resueltos
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-gray-900">142</p>
              <p className="text-xs text-gray-400">esta semana</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">
              Sectores Cubiertos
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-gray-900">85%</p>
              <p className="text-xs text-green-500 font-medium">Óptimo</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- SECCIÓN INFERIOR: RUTAS Y ACTIVIDAD --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna Izquierda: Estado de Rutas Activas (Ocupa 2/3) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">
              Progreso de Rutas Activas
            </h3>
            <button className="text-sm text-ruta-primary font-medium hover:underline">
              Ver mapa en vivo
            </button>
          </div>

          <div className="space-y-6">
            {/* Ruta 1 */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-ruta-primary" /> Ruta #4 - Las
                  Américas
                </span>
                <span className="text-gray-500">75% Completado</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div
                  className="bg-ruta-primary h-2.5 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Última actualización: hace 2 min
              </p>
            </div>

            {/* Ruta 2 */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-ruta-primary" /> Ruta #1 -
                  Centro Histórico
                </span>
                <span className="text-gray-500">40% Completado</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: "40%" }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Última actualización: hace 5 min
              </p>
            </div>

            {/* Ruta 3 */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-orange-500" /> Ruta #6 - Los
                  Jardines
                </span>
                <span className="text-orange-600 font-medium">
                  Retraso (Tráfico) - 15%
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div
                  className="bg-orange-500 h-2.5 rounded-full"
                  style={{ width: "15%" }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Última actualización: hace 12 min
              </p>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Actividad Reciente (Ocupa 1/3) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Actividad Reciente
          </h3>

          <div className="space-y-5">
            <div className="flex gap-4 relative">
              {/* Línea conectora visual */}
              <div className="absolute left-4 top-8 bottom-0 w-px bg-gray-100 -ml-px"></div>

              <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 shrink-0 z-10 border-2 border-white">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Nuevo reporte ciudadano
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Papelera desbordada en Piantini
                </p>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Hace 10 min
                </p>
              </div>
            </div>

            <div className="flex gap-4 relative">
              <div className="absolute left-4 top-8 bottom-0 w-px bg-gray-100 -ml-px"></div>
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500 shrink-0 z-10 border-2 border-white">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Ruta #2 Finalizada
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Sector Naco completado al 100%
                </p>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Hace 45 min
                </p>
              </div>
            </div>

            <div className="flex gap-4 relative">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0 z-10 border-2 border-white">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Inicio de jornada
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  14 camiones iniciaron recorrido
                </p>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> 06:00 AM
                </p>
              </div>
            </div>
          </div>

          <button className="w-full mt-6 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            Ver todo el historial
          </button>
        </div>
      </div>
    </>
  );
}
