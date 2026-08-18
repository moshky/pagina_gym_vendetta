import Link from "next/link";
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

  // ---------- VISTA ENTRENADOR ----------
  if (perfil?.rol === "entrenador") {
    const { data: misPlanes } = await supabase
      .from("planes")
      .select("*, perfiles!planes_cliente_id_fkey(nombre, apellido)")
      .eq("entrenador_id", user.id);

    const totalClientesConPlan = new Set(
      misPlanes?.map((p) => p.cliente_id)
    ).size;

    return (
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="mb-2 font-display text-3xl text-blanco">
          Hola, <span className="text-rojo">{perfil?.nombre}</span>
        </h1>
        <p className="mb-10 text-gris">Este es tu panel de entrenador.</p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded border border-rojo-oscuro bg-negro p-6">
            <h2 className="mb-4 font-display text-xl text-blanco">
              Resumen
            </h2>
            <p className="text-blanco">
              Planes creados:{" "}
              <span className="font-semibold text-rojo">
                {misPlanes?.length ?? 0}
              </span>
            </p>
            <p className="mt-2 text-blanco">
              Clientes con plan activo:{" "}
              <span className="font-semibold text-rojo">
                {totalClientesConPlan}
              </span>
            </p>
          </div>

          <div className="rounded border border-rojo-oscuro bg-negro p-6">
            <h2 className="mb-4 font-display text-xl text-blanco">
              Acciones rápidas
            </h2>
            <div className="flex flex-col gap-3">
              <Link
                href="/dashboard/planes/nuevo"
                className="rounded bg-rojo px-4 py-2 text-center text-sm font-semibold text-blanco transition hover:bg-rojo-oscuro"
              >
                + Crear nuevo plan
              </Link>
              <Link
                href="/dashboard/planes"
                className="rounded border border-rojo px-4 py-2 text-center text-sm text-blanco transition hover:bg-rojo"
              >
                Ver todos mis planes
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ---------- VISTA CLIENTE ----------
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
      <p className="mb-10 text-gris">Este es tu panel de seguimiento.</p>

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