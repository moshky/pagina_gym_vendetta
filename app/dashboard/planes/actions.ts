"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function crearPlan(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const cliente_id = formData.get("cliente_id") as string;
  const tipo = formData.get("tipo") as string;
  const fecha_inicio = formData.get("fecha_inicio") as string;
  const fecha_fin = formData.get("fecha_fin") as string;
  const plan_entrenamiento = formData.get("plan_entrenamiento") as string;
  const plan_nutricional = formData.get("plan_nutricional") as string;

  const { error } = await supabase.from("planes").insert({
    cliente_id,
    entrenador_id: user.id,
    tipo,
    fecha_inicio,
    fecha_fin,
    plan_entrenamiento,
    plan_nutricional,
  });

  if (error) {
    console.error("Error al crear plan:", error.message);
    return;
  }

  revalidatePath("/dashboard/planes");
  redirect("/dashboard/planes");
}

export async function actualizarPlan(id: string, formData: FormData) {
  const supabase = await createClient();

  const tipo = formData.get("tipo") as string;
  const fecha_inicio = formData.get("fecha_inicio") as string;
  const fecha_fin = formData.get("fecha_fin") as string;
  const plan_entrenamiento = formData.get("plan_entrenamiento") as string;
  const plan_nutricional = formData.get("plan_nutricional") as string;

  const { error } = await supabase
    .from("planes")
    .update({
      tipo,
      fecha_inicio,
      fecha_fin,
      plan_entrenamiento,
      plan_nutricional,
    })
    .eq("id", id);

  if (error) {
    console.error("Error al actualizar plan:", error.message);
    return;
  }

  revalidatePath("/dashboard/planes");
  redirect("/dashboard/planes");
}

export async function eliminarPlan(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("planes").delete().eq("id", id);

  if (error) {
    console.error("Error al eliminar plan:", error.message);
    return;
  }

  revalidatePath("/dashboard/planes");
}