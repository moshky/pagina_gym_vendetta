import { createClient } from "@/lib/supabase-server";

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

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p className="p-6 text-blanco">No autorizado.</p>;
  }

  const { data: perfil } = await supabase
    .from("perfiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: plan } = await supabase
    .from("planes")
    .select("*")
    .eq("cliente_id", user.id)
    .order("fecha_inicio", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data: ultimoPesaje } = await supabase
    .from("pesajes")
    .select("*")
    .eq("cliente_id", user.id)
    .order("fecha", { ascending: false })
    .limit(1)
    .maybeSingle();

  const diasParaVencer = plan ? calcularDiasParaVencer(plan.fecha_fin) : null;
  const vencido = diasParaVencer !== null && diasParaVencer < 0;
  const imc =
    ultimoPesaje && perfil
      ? calcularIMC(ultimoPesaje.peso, perfil.talla)
      : null;

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-2 font-display text-3xl text-blanco">
        Hola, <span className="text-rojo">{perfil?.nombre ?? "Usuario"}</span>
      </h1>
      <p className="mb-10 text-gris">
        {perfil?.rol === "entrenador"
          ? "Este es tu panel de entrenador."
          : "Este es tu panel de seguimiento."}
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded border border-rojo-oscuro bg-negro p-6">
          <h2 className="mb-4 font-display text-xl text-blanco">
            Plan activo
          </h2>
          {plan ? (
            <>
              <p className="text-blanco">
                Tipo:{" "}
                <span className="font-semibold capitalize text-rojo">
                  {plan.tipo}
                </span>
              </p>
              <p className="mt-2 text-blanco">
                Vigencia: {plan.fecha_inicio} → {plan.fecha_fin}
              </p>
              <p
                className={`mt-4 inline-block rounded px-3 py-1 text-sm font-semibold ${
                  vencido
                    ? "bg-rojo text-blanco"
                    : diasParaVencer !== null && diasParaVencer <= 7
                    ? "bg-yellow-600 text-blanco"
                    : "bg-green-700 text-blanco"
                }`}
              >
                {vencido
                  ? `Vencido hace ${Math.abs(diasParaVencer!)} días`
                  : `Vence en ${diasParaVencer} días`}
              </p>
            </>
          ) : (
            <p className="text-gris">
              Todavía no tienes un plan asignado. Tu entrenador te asignará
              uno pronto.
            </p>
          )}
        </div>

        <div className="rounded border border-rojo-oscuro bg-negro p-6">
          <h2 className="mb-4 font-display text-xl text-blanco">
            Último pesaje
          </h2>
          {ultimoPesaje && perfil ? (
            <>
              <p className="text-blanco">Fecha: {ultimoPesaje.fecha}</p>
              <p className="mt-2 text-blanco">Peso: {ultimoPesaje.peso} kg</p>
              <p className="mt-2 text-blanco">Talla: {perfil.talla} m</p>
              <p className="mt-4 font-display text-2xl text-rojo">
                IMC: {imc}
              </p>
            </>
          ) : (
            <p className="text-gris">Todavía no has registrado ningún pesaje.</p>
          )}
        </div>
      </div>
    </section>
  );
}