import { createClient } from "@/lib/supabase-server";
import PesajesCliente from "./PesajesCliente";

export default async function PesajesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p className="p-6 text-blanco">No autorizado.</p>;
  }

  const { data: pesajes } = await supabase
    .from("pesajes")
    .select("*")
    .eq("cliente_id", user.id)
    .order("fecha", { ascending: false });

  return <PesajesCliente pesajesIniciales={pesajes ?? []} />;
}