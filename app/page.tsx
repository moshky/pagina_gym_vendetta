import Link from "next/link";
import Banner from "@/components/Banner";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Banner />

      <section className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-6 py-10 text-center">
        <Image
          src="/ffffdddd.png"
          alt="Vendetta Fitness"
          width={80}
          height={80}
          className="h-24 w-auto md:h-28"
        />
        <h1 className="font-display text-5xl leading-tight text-blanco md:text-6xl">
          VENDETTA <span className="text-rojo">FITNESS</span>
        </h1>
        <p className="text-lg italic text-gris">
          Te va a doler, pero te va a gustar.
        </p>
        <p className="max-w-2xl text-blanco">
          Planes de entrenamiento y nutrición personalizados, con seguimiento
          real de tu progreso. Apoyamos a atletas de alto rendimiento y
          formamos parte activa del fisicoculturismo.
        </p>

        <div className="flex gap-4">
          <Link
            href="/planes"
            className="rounded bg-rojo px-6 py-3 font-semibold text-blanco transition hover:bg-rojo-oscuro"
          >
            Ver planes
          </Link>
          <Link
            href="/register"
            className="rounded border border-rojo px-6 py-3 font-semibold text-blanco transition hover:bg-rojo"
          >
            Únete ahora
          </Link>
        </div>
      </section>
    </>
  );
}