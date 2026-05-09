import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "⚠️  Variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY não configuradas.\n" +
    "Crie um .env baseado em .env.example com suas credenciais do Supabase."
  );
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder"
);

export type Database = {
  public: {
    Tables: {
      prestadores: {
        Row: {
          id: string;
          nome: string;
          categoria: string;
          bairro: string;
          nota: number;
          avaliacoes: number;
          bio: string;
          inicial: string;
          cor: string;
          verificado: boolean;
          servicos_feitos: number;
          whatsapp: string;
          created_at: string;
        };
      };
      assinaturas: {
        Row: {
          id: string;
          user_id: string;
          plano: string;
          status: "ativa" | "cancelada" | "pendente";
          stripe_subscription_id: string | null;
          stripe_customer_id: string | null;
          created_at: string;
          expires_at: string | null;
        };
      };
    };
  };
};
