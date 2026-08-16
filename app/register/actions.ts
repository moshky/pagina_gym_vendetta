"use server";

import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export async function registrarUsuario(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const nombre = formData.get("nombre") as string;
  const apellido = formData.get("apellido") as string;
  const fecha_nacimiento = formData.get("fecha_nacimiento") as string;
  const talla = formData.get("talla") as string;
  const rol = formData.get("rol") as string;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error || !data.user) {
    console.error("Error al registrar:", error?.message);
    redirect("/register?error=true");
  }

  const { error: errorPerfil } = await supabase.from("perfiles").insert({
    id: data.user.id,
    nombre,
    apellido,
    fecha_nacimiento,
    talla: parseFloat(talla),
    rol,
  });

  if (errorPerfil) {
    console.error("Error al crear perfil:", errorPerfil.message);
    redirect("/register?error=true");
  }

  redirect("/login");
}