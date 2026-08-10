import Link from "next/link";
import { planes } from "@/lib/planes";

export default function PlanesPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-2 text-center font-display text-4xl text-blanco">
        NUESTROS <span className="text-rojo">PLANES</span>
      </h1>
      <p className="mb-12 text-center text-gris">
        Elige el ciclo que mejor se adapte a tus objetivos.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {planes.map((plan) => (
          <Link
            key={plan.id}
            href={`/planes/${plan.id}`}
            className="flex flex-col justify-between rounded border border-rojo-oscuro bg-negro p-6 transition hover:border-rojo"
          >
            <div>
              <h2 className="font-display text-2xl text-blanco">
                {plan.nombre}
              </h2>
              <p className="mb-4 text-sm text-gris">{plan.duracion}</p>
              <p className="mb-4 font-display text-3xl text-rojo">
                {plan.precio}
              </p>
              <p className="text-sm text-blanco">{plan.descripcion}</p>
            </div>
            <span className="mt-6 text-sm font-semibold text-rojo">
              Ver detalle →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}