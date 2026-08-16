export type Ejercicio = {
  id: number;
  name: string;
  category: number;
};

export async function obtenerEjercicios(): Promise<Ejercicio[]> {
  try {
    const res = await fetch(
      "https://wger.de/api/v2/exercise/?language=2&limit=15&status=2",
      {
        next: { revalidate: 3600 }, // cache de 1 hora
      }
    );

    if (!res.ok) {
      throw new Error(`Error de la API: ${res.status}`);
    }

    const data = await res.json();
    return data.results ?? [];
  } catch (error) {
    console.error("No se pudo cargar la lista de ejercicios:", error);
    return [];
  }
}