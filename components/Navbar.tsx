import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase-server";
import { cerrarSesion } from "@/app/login/actions";

export default async function Navbar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let nombre: string | null = null;
  if (user) {
    const { data: perfil } = await supabase
      .from("perfiles")
      .select("nombre")
      .eq("id", user.id)
      .single();
    nombre = perfil?.nombre ?? null;
  }

  return (
    <header className="border-b border-rojo-oscuro bg-negro">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/">
          <Image
            src="/ffffdddd.png"
            alt="Vendetta Fitness"
            width={300}
            height={300}
            className="h-24 w-auto md:h-28"
          />
        </Link>

        <div className="hidden gap-8 md:flex">
          <Link href="/" className="text-base text-blanco transition hover:text-rojo">
            Inicio
          </Link>
          <Link href="/planes" className="text-base text-blanco transition hover:text-rojo">
            Planes
          </Link>
          <Link href="/contacto" className="text-base text-blanco transition hover:text-rojo">
            Contacto
          </Link>
          {user && (
            <Link href="/dashboard" className="text-base text-blanco transition hover:text-rojo">
              Mi panel
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden text-sm text-blanco md:inline">
                Hola, <span className="font-semibold text-rojo">{nombre ?? "usuario"}</span>
              </span>
              <form action={cerrarSesion}>
                <button
                  type="submit"
                  className="rounded border border-rojo px-4 py-2 text-sm text-blanco transition hover:bg-rojo"
                >
                  Cerrar sesión
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded border border-rojo px-4 py-2 text-base text-blanco transition hover:bg-rojo"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="rounded bg-rojo px-4 py-2 text-base font-semibold text-blanco transition hover:bg-rojo-oscuro"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}