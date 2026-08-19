export type Ejercicio = {
  id: number;
  name: string;
};

export async function obtenerEjercicios(): Promise<Ejercicio[]> {
  try {
    const res = await fetch(
      "https://wger.de/api/v2/exerciseinfo/?language=2&limit=15&status=2",
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      throw new Error(`Error de la API: ${res.status}`);
    }

    const data = await res.json();

    const ejercicios: Ejercicio[] = (data.results ?? [])
      .map((item: any) => {
        const traduccion =
          item.translations?.find((t: any) => t.language === 2) ??
          item.translations?.[0];
        return {
          id: item.id,
          name: traduccion?.name ?? "",
        };
      })
      .filter((ej: Ejercicio) => ej.name !== "");

    return ejercicios;
  } catch (error) {
    console.error("No se pudo cargar la lista de ejercicios:", error);
    return [];
  }
}