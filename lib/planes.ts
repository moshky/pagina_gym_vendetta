export type Plan = {
  id: string;
  nombre: string;
  duracion: string;
  precio: string;
  descripcion: string;
  incluye: string[];
};

export const planes: Plan[] = [
  {
    id: "mensual",
    nombre: "Mensual",
    duracion: "1 mes",
    precio: "$35",
    descripcion:
      "Ideal para quienes quieren probar la metodología Vendetta antes de comprometerse a un ciclo más largo.",
    incluye: [
      "Plan de entrenamiento personalizado",
      "Plan nutricional básico",
      "1 pesaje de seguimiento",
      "Acceso a todas las instalaciones",
    ],
  },
  {
    id: "trimestral",
    nombre: "Trimestral",
    duracion: "3 meses",
    precio: "$90",
    descripcion:
      "Un ciclo completo de entrenamiento y nutrición, con ajustes de plan a mitad de periodo según tu progreso.",
    incluye: [
      "Plan de entrenamiento personalizado",
      "Plan nutricional completo",
      "Pesajes quincenales",
      "1 ajuste de plan a mitad de ciclo",
      "Acceso a todas las instalaciones",
    ],
  },
  {
    id: "semestral",
    nombre: "Semestral",
    duracion: "6 meses",
    precio: "$160",
    descripcion:
      "Pensado para quienes buscan resultados sostenidos, con dos ciclos completos de ajuste de plan.",
    incluye: [
      "Plan de entrenamiento personalizado",
      "Plan nutricional completo",
      "Pesajes quincenales",
      "3 ajustes de plan durante el ciclo",
      "Acceso a todas las instalaciones",
      "Seguimiento prioritario con tu entrenador",
    ],
  },
  {
    id: "anual",
    nombre: "Anual",
    duracion: "12 meses",
    precio: "$300",
    descripcion:
      "El plan más completo, para atletas comprometidos con un proceso de transformación de largo plazo.",
    incluye: [
      "Plan de entrenamiento personalizado",
      "Plan nutricional completo",
      "Pesajes quincenales",
      "6 ajustes de plan durante el año",
      "Acceso a todas las instalaciones",
      "Seguimiento prioritario con tu entrenador",
      "Evaluación física trimestral",
    ],
  },
];