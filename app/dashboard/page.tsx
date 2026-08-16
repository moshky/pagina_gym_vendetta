// Datos de prueba temporales — se reemplazan por la consulta real a Supabase
// cuando el servicio se restablezca (perfiles + planes + pesajes)
const clientePrueba = {
  nombre: "Juan",
  apellido: "Pérez",
  talla: 1.75,
};

const planActivo = {
  tipo: "trimestral",
  fecha_inicio: "2026-07-15",
  fecha_fin: "2026-10-15",
};

const ultimoPesaje = {
  fecha: "2026-08-10",
  peso: 78.5,
};

function calcularDiasParaVencer(fechaFin: string) {
  const hoy = new Date();
  const fin = new Date(fechaFin);
  const diff = Math.ceil(
    (fin.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)
  );
  return diff;
}

function calcularIMC(peso: number, talla: number) {
  return (peso / (talla * talla)).toFixed(1);
}

export default function DashboardPage() {
  const diasParaVencer = calcularDiasParaVencer(planActivo.fecha_fin);
  const vencido = diasParaVencer < 0;
  const imc = calcularIMC(ultimoPesaje.peso, clientePrueba.talla);

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-2 font-display text-3xl text-blanco">
        Hola, <span className="text-rojo">{clientePrueba.nombre}</span>
      </h1>
      <p className="mb-10 text-gris">Este es tu panel de seguimiento.</p>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Tarjeta de plan activo */}
        <div className="rounded border border-rojo-oscuro bg-negro p-6">
          <h2 className="mb-4 font-display text-xl text-blanco">
            Plan activo
          </h2>
          <p className="text-blanco">
            Tipo:{" "}
            <span className="font-semibold capitalize text-rojo">
              {planActivo.tipo}
            </span>
          </p>
          <p className="mt-2 text-blanco">
            Vigencia: {planActivo.fecha_inicio} → {planActivo.fecha_fin}
          </p>
          <p
            className={`mt-4 inline-block rounded px-3 py-1 text-sm font-semibold ${
              vencido
                ? "bg-rojo text-blanco"
                : diasParaVencer <= 7
                ? "bg-yellow-600 text-blanco"
                : "bg-green-700 text-blanco"
            }`}
          >
            {vencido
              ? `Vencido hace ${Math.abs(diasParaVencer)} días`
              : `Vence en ${diasParaVencer} días`}
          </p>
        </div>

        {/* Tarjeta de último pesaje / IMC */}
        <div className="rounded border border-rojo-oscuro bg-negro p-6">
          <h2 className="mb-4 font-display text-xl text-blanco">
            Último pesaje
          </h2>
          <p className="text-blanco">Fecha: {ultimoPesaje.fecha}</p>
          <p className="mt-2 text-blanco">Peso: {ultimoPesaje.peso} kg</p>
          <p className="mt-2 text-blanco">Talla: {clientePrueba.talla} m</p>
          <p className="mt-4 font-display text-2xl text-rojo">IMC: {imc}</p>
        </div>
      </div>
    </section>
  );
}