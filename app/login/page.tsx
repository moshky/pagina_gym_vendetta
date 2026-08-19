import { iniciarSesion } from "./actions";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <section className="mx-auto max-w-md px-6 py-16">
      <h1 className="mb-8 text-center font-display text-3xl text-blanco">
        INICIAR <span className="text-rojo">SESIÓN</span>
      </h1>

      {searchParams.error && (
        <div className="mb-6 rounded border border-rojo bg-rojo/10 px-4 py-3 text-sm text-rojo">
          Correo o contraseña incorrectos. Intenta de nuevo.
        </div>
      )}

      <form action={iniciarSesion} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm text-blanco">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded border border-rojo-oscuro bg-negro px-4 py-2 text-blanco outline-none focus:border-rojo"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm text-blanco">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full rounded border border-rojo-oscuro bg-negro px-4 py-2 text-blanco outline-none focus:border-rojo"
          />
        </div>

        <button
          type="submit"
          className="mt-4 rounded bg-rojo px-6 py-3 font-semibold text-blanco transition hover:bg-rojo-oscuro"
        >
          Entrar
        </button>
      </form>
    </section>
  );
}