"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export async function registrarPesaje(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const fecha = formData.get("fecha") as string;
  const peso = formData.get("peso") as string;

  const { error } = await supabase.from("pesajes").insert({
    cliente_id: user.id,
    fecha,
    peso: parseFloat(peso),
  });

  if (error) {
    console.error("Error al registrar pesaje:", error.message);
    return;
  }

  revalidatePath("/dashboard/pesajes");
}