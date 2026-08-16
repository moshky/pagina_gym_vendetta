import { createClient } from "@/lib/supabase-server";
import { actualizarPlan } from "../../actions";
import { notFound } from "next/navigation";

export default async function EditarPlanPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const { data: plan } = await supabase
    .from("planes")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!plan) {
    notFound();
  }

  const actualizarConId = actualizarPlan.bind(null, params.id);

  return (
    <section className="mx-auto max-w-lg px-6 py-16">
      <h1 className="mb-8 font-display text-3xl text-blanco">
        EDITAR <span className="text-rojo">PLAN</span>
      </h1>

      <form action={actualizarConId} className="flex flex-col gap-4">
        <div>
          <label htmlFor="tipo" className="mb-1 block text-sm text-blanco">
            Tipo de plan
          </label>
          <select
            id="tipo"
            name="tipo"
            defaultValue={plan.tipo}
            required
            className="w-full rounded border border-rojo-oscuro bg-negro px-4 py-2 text-blanco outline-none focus:border-rojo"
          >
            <option value="mensual">Mensual</option>
            <option value="trimestral">Trimestral</option>
            <option value="semestral">Semestral</option>
            <option value="anual">Anual</option>
          </select>
        </div>

        <div>
          <label htmlFor="fecha_inicio" className="mb-1 block text-sm text-blanco">
            Fecha de inicio
          </label>
          <input
            id="fecha_inicio"
            name="fecha_inicio"
            type="date"
            defaultValue={plan.fecha_inicio}
            required
            className="w-full rounded border border-rojo-oscuro bg-negro px-4 py-2 text-blanco outline-none focus:border-rojo"
          />
        </div>

        <div>
          <label htmlFor="fecha_fin" className="mb-1 block text-sm text-blanco">
            Fecha de fin
          </label>
          <input
            id="fecha_fin"
            name="fecha_fin"
            type="date"
            defaultValue={plan.fecha_fin}
            required
            className="w-full rounded border border-rojo-oscuro bg-negro px-4 py-2 text-blanco outline-none focus:border-rojo"
          />
        </div>

        <div>
          <label htmlFor="plan_entrenamiento" className="mb-1 block text-sm text-blanco">
            Plan de entrenamiento
          </label>
          <textarea
            id="plan_entrenamiento"
            name="plan_entrenamiento"
            rows={4}
            defaultValue={plan.plan_entrenamiento}
            required
            className="w-full rounded border border-rojo-oscuro bg-negro px-4 py-2 text-blanco outline-none focus:border-rojo"
          />
        </div>

        <div>
          <label htmlFor="plan_nutricional" className="mb-1 block text-sm text-blanco">
            Plan nutricional
          </label>
          <textarea
            id="plan_nutricional"
            name="plan_nutricional"
            rows={4}
            defaultValue={plan.plan_nutricional}
            required
            className="w-full rounded border border-rojo-oscuro bg-negro px-4 py-2 text-blanco outline-none focus:border-rojo"
          />
        </div>

        <button
          type="submit"
          className="mt-4 rounded bg-rojo px-6 py-3 font-semibold text-blanco transition hover:bg-rojo-oscuro"
        >
          Guardar cambios
        </button>
      </form>
    </section>
  );
}