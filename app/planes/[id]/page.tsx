import Link from "next/link";
import { notFound } from "next/navigation";
import { planes } from "@/lib/planes";

export default function PlanDetallePage({
  params,
}: {
  params: { id: string };
}) {
  const plan = planes.find((p) => p.id === params.id);

  if (!plan) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <Link href="/planes" className="text-sm text-rojo hover:underline">
        ← Volver a planes
      </Link>

      <h1 className="mt-4 font-display text-4xl text-blanco">
        {plan.nombre}
      </h1>
      <p className="text-gris">{plan.duracion}</p>
      <p className="mt-2 font-display text-4xl text-rojo">{plan.precio}</p>

      <p className="mt-6 text-blanco">{plan.descripcion}</p>

      <h3 className="mt-8 font-display text-xl text-blanco">Incluye:</h3>
      <ul className="mt-4 space-y-2">
        {plan.incluye.map((item) => (
          <li key={item} className="flex items-center gap-2 text-blanco">
            <span className="text-rojo">✓</span> {item}
          </li>
        ))}
      </ul>

      <Link
        href="/register"
        className="mt-10 inline-block rounded bg-rojo px-6 py-3 font-semibold text-blanco transition hover:bg-rojo-oscuro"
      >
        Únete con este plan
      </Link>
    </section>
  );
}