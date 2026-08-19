"use client";

import { useState } from "react";
import { registrarPesaje } from "./actions";

type Pesaje = {
  id: string;
  fecha: string;
  peso: number;
};

export default function PesajesCliente({
  pesajesIniciales,
}: {
  pesajesIniciales: Pesaje[];
}) {
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");

  const pesajesFiltrados = pesajesIniciales.filter((p) => {
    if (desde && p.fecha < desde) return false;
    if (hasta && p.fecha > hasta) return false;
    return true;
  });

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-8 font-display text-3xl text-blanco">
        MIS <span className="text-rojo">PESAJES</span>
      </h1>

      <h2 className="mb-2 font-display text-sm text-blanco">
        Registrar un nuevo pesaje
      </h2>
      <form
        action={registrarPesaje}
        className="mb-10 flex flex-wrap items-end gap-4 rounded border border-rojo-oscuro p-4"
      >
        <div>
          <label htmlFor="fecha" className="mb-1 block text-sm text-blanco">
            Fecha
          </label>
          <input
            id="fecha"
            name="fecha"
            type="date"
            required
            className="rounded border border-rojo-oscuro bg-negro px-3 py-2 text-blanco outline-none focus:border-rojo"
          />
        </div>
        <div>
          <label htmlFor="peso" className="mb-1 block text-sm text-blanco">
            Peso (kg)
          </label>
          <input
            id="peso"
            name="peso"
            type="number"
            step="0.01"
            required
            className="rounded border border-rojo-oscuro bg-negro px-3 py-2 text-blanco outline-none focus:border-rojo"
          />
        </div>
        <button
          type="submit"
          className="rounded bg-rojo px-4 py-2 font-semibold text-blanco transition hover:bg-rojo-oscuro"
        >
          Registrar
        </button>
      </form>

      <div className="mb-6 rounded border border-rojo-oscuro bg-negro/40 p-4">
        <h2 className="mb-1 font-display text-sm text-blanco">
          Filtrar historial por fecha
        </h2>
        <p className="mb-3 text-xs text-gris">
          Muestra solo los pesajes registrados dentro del rango que elijas. Déjalo vacío para ver todos.
        </p>
        <div className="flex flex-wrap gap-4">
          <div>
            <label htmlFor="desde" className="mb-1 block text-sm text-blanco">
              Desde
            </label>
            <input
              id="desde"
              type="date"
              value={desde}
              onChange={(e) => setDesde(e.target.value)}
              className="rounded border border-rojo-oscuro bg-negro px-3 py-2 text-blanco outline-none focus:border-rojo"
            />
          </div>
          <div>
            <label htmlFor="hasta" className="mb-1 block text-sm text-blanco">
              Hasta
            </label>
            <input
              id="hasta"
              type="date"
              value={hasta}
              onChange={(e) => setHasta(e.target.value)}
              className="rounded border border-rojo-oscuro bg-negro px-3 py-2 text-blanco outline-none focus:border-rojo"
            />
          </div>
        </div>
      </div>

      {pesajesFiltrados.length === 0 ? (
        <p className="text-gris">No hay pesajes en ese rango.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {pesajesFiltrados.map((p) => (
            <li
              key={p.id}
              className="flex justify-between rounded border border-rojo-oscuro bg-negro p-3"
            >
              <span className="text-blanco">{p.fecha}</span>
              <span className="font-semibold text-rojo">{p.peso} kg</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}