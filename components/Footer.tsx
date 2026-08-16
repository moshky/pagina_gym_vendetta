export default function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="border-t border-rojo-oscuro bg-negro px-6 py-6 text-center">
      <p className="text-sm text-gris">
        © {anioActual} Vendetta Fitness. Todos los derechos reservados.
      </p>
    </footer>
  );
}