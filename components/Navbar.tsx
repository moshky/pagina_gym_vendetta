import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="border-b border-rojo-oscuro bg-negro">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/">
          <Image
            src="/ffffdddd.png"
            alt="Vendetta Fitness"
            width={56}
            height={56}
            className="h-14 w-auto"
          />
        </Link>

        <div className="hidden gap-8 md:flex">
          <Link href="/" className="text-sm text-blanco transition hover:text-rojo">
            Inicio
          </Link>
          <Link href="/planes" className="text-sm text-blanco transition hover:text-rojo">
            Planes
          </Link>
          <Link href="/contacto" className="text-sm text-blanco transition hover:text-rojo">
            Contacto
          </Link>
        </div>

        <div className="flex gap-3">
          <Link
            href="/login"
            className="rounded border border-rojo px-4 py-2 text-sm text-blanco transition hover:bg-rojo"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/register"
            className="rounded bg-rojo px-4 py-2 text-sm font-semibold text-blanco transition hover:bg-rojo-oscuro"
          >
            Registrarse
          </Link>
        </div>
      </nav>
    </header>
  );
}