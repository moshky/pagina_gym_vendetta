import { crearPlan } from "../actions";
import { obtenerEjercicios } from "@/lib/wger";

export default async function NuevoPlanPage() {
  const ejercicios = await obtenerEjercicios();

  return (
    <section className="mx-auto max-w-lg px-6 py-16">
      <h1 className="mb-8 font-display text-3xl text-blanco">
        NUEVO <span className="text-rojo">PLAN</span>
      </h1>

      {/* Lista de ejercicios de referencia, desde la API externa */}
      <div className="mb-8 rounded border border-rojo-oscuro p-4">
        <h2 className="mb-3 font-display text-lg text-blanco">
          Ejercicios de referencia
        </h2>
        {ejercicios.length === 0 ? (
          <p className="text-sm text-gris">
            No se pudo cargar la lista de ejercicios en este momento. Puedes
            escribir el plan manualmente.
          </p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {ejercicios.map((ej) => (
              <li
                key={ej.id}
                className="rounded bg-negro px-3 py-1 text-sm text-blanco"
              >
                {ej.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <form action={crearPlan} className="flex flex-col gap-4">
        <div>
          <label htmlFor="cliente_id" className="mb-1 block text-sm text-blanco">
            ID del cliente
          </label>
          <input
            id="cliente_id"
            name="cliente_id"
            type="text"
            required
            placeholder="UUID del perfil del cliente"
            className="w-full rounded border border-rojo-oscuro bg-negro px-4 py-2 text-blanco outline-none focus:border-rojo"
          />
        </div>

        <div>
          <label htmlFor="tipo" className="mb-1 block text-sm text-blanco">
            Tipo de plan
          </label>
          <select
            id="tipo"
            name="tipo"
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
            required
            className="w-full rounded border border-rojo-oscuro bg-negro px-4 py-2 text-blanco outline-none focus:border-rojo"
          />
        </div>

        <button
          type="submit"
          className="mt-4 rounded bg-rojo px-6 py-3 font-semibold text-blanco transition hover:bg-rojo-oscuro"
        >
          Crear plan
        </button>
      </form>
    </section>
  );
}