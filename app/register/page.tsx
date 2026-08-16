import { registrarUsuario } from "./actions";

export default function RegisterPage() {
  return (
    <section className="mx-auto max-w-md px-6 py-16">
      <h1 className="mb-8 text-center font-display text-3xl text-blanco">
        CREAR <span className="text-rojo">CUENTA</span>
      </h1>

      <form action={registrarUsuario} className="flex flex-col gap-4">
        <div>
          <label htmlFor="nombre" className="mb-1 block text-sm text-blanco">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            className="w-full rounded border border-rojo-oscuro bg-negro px-4 py-2 text-blanco outline-none focus:border-rojo"
          />
        </div>

        <div>
          <label htmlFor="apellido" className="mb-1 block text-sm text-blanco">
            Apellido
          </label>
          <input
            id="apellido"
            name="apellido"
            type="text"
            required
            className="w-full rounded border border-rojo-oscuro bg-negro px-4 py-2 text-blanco outline-none focus:border-rojo"
          />
        </div>

        <div>
          <label htmlFor="fecha_nacimiento" className="mb-1 block text-sm text-blanco">
            Fecha de nacimiento
          </label>
          <input
            id="fecha_nacimiento"
            name="fecha_nacimiento"
            type="date"
            required
            className="w-full rounded border border-rojo-oscuro bg-negro px-4 py-2 text-blanco outline-none focus:border-rojo"
          />
        </div>

        <div>
          <label htmlFor="talla" className="mb-1 block text-sm text-blanco">
            Talla (metros, ej: 1.70)
          </label>
          <input
            id="talla"
            name="talla"
            type="number"
            step="0.01"
            required
            className="w-full rounded border border-rojo-oscuro bg-negro px-4 py-2 text-blanco outline-none focus:border-rojo"
          />
        </div>

        <div>
          <label htmlFor="rol" className="mb-1 block text-sm text-blanco">
            Tipo de cuenta
          </label>
          <select
            id="rol"
            name="rol"
            required
            className="w-full rounded border border-rojo-oscuro bg-negro px-4 py-2 text-blanco outline-none focus:border-rojo"
          >
            <option value="cliente">Cliente</option>
            <option value="entrenador">Entrenador</option>
          </select>
        </div>

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
            minLength={6}
            className="w-full rounded border border-rojo-oscuro bg-negro px-4 py-2 text-blanco outline-none focus:border-rojo"
          />
        </div>

        <button
          type="submit"
          className="mt-4 rounded bg-rojo px-6 py-3 font-semibold text-blanco transition hover:bg-rojo-oscuro"
        >
          Registrarme
        </button>
      </form>
    </section>
  );
}