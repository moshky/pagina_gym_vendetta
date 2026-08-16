import { planes } from "@/lib/planes";
import PlanCard from "@/components/PlanCard";

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
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </section>
  );
}