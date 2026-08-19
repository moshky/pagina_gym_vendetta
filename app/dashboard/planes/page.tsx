import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { eliminarPlan } from "./actions";

export default async function PlanesEntrenadorPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p className="p-6 text-blanco">No autorizado.</p>;
  }

  const { data: planes, error } = await supabase
    .from("planes")
    .select("*, perfiles!planes_cliente_id_fkey(nombre, apellido)")
    .eq("entrenador_id", user.id)
    .order("creado_en", { ascending: false });

  if (error) {
    console.error("Error al cargar planes:", error.message);
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <Link href="/dashboard" className="text-sm text-rojo hover:underline">
        ← Volver a mi panel
      </Link>

      <div className="mb-8 mt-4 flex items-center justify-between">
        <h1 className="font-display text-3xl text-blanco">
          MIS <span className="text-rojo">PLANES</span>
        </h1>
        <Link
          href="/dashboard/planes/nuevo"
          className="rounded bg-rojo px-4 py-2 text-sm font-semibold text-blanco transition hover:bg-rojo-oscuro"
        >
          + Nuevo plan
        </Link>
      </div>

      {!planes || planes.length === 0 ? (
        <p className="text-gris">Todavía no has creado ningún plan.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {planes.map((plan) => (
            <div
              key={plan.id}
              className="flex items-center justify-between rounded border border-rojo-oscuro bg-negro p-4"
            >
              <div>
                <p className="font-semibold text-blanco">
                  {plan.perfiles?.nombre} {plan.perfiles?.apellido}
                </p>
                <p className="text-sm text-gris capitalize">
                  {plan.tipo} · {plan.fecha_inicio} → {plan.fecha_fin}
                </p>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/dashboard/planes/${plan.id}/editar`}
                  className="rounded border border-rojo px-3 py-1 text-sm text-blanco transition hover:bg-rojo"
                >
                  Editar
                </Link>
                <form action={eliminarPlan.bind(null, plan.id)}>
                  <button
                    type="submit"
                    className="rounded bg-rojo px-3 py-1 text-sm text-blanco transition hover:bg-rojo-oscuro"
                  >
                    Eliminar
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}