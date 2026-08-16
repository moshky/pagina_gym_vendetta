import Link from "next/link";
import type { Plan } from "@/lib/planes";

type PlanCardProps = {
  plan: Plan;
};

export default function PlanCard({ plan }: PlanCardProps) {
  return (
    <Link
      href={`/planes/${plan.id}`}
      className="flex flex-col justify-between rounded border border-rojo-oscuro bg-negro p-6 transition hover:border-rojo"
    >
      <div>
        <h2 className="font-display text-2xl text-blanco">{plan.nombre}</h2>
        <p className="mb-4 text-sm text-gris">{plan.duracion}</p>
        <p className="mb-4 font-display text-3xl text-rojo">{plan.precio}</p>
        <p className="text-sm text-blanco">{plan.descripcion}</p>
      </div>
      <span className="mt-6 text-sm font-semibold text-rojo">
        Ver detalle →
      </span>
    </Link>
  );
}