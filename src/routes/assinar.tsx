import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/assinar")({
  component: AssinarPage,
});

const PLANOS = [
  {
    id: "gratis",
    nome: "Grátis",
    preco: "R$ 0",
    periodo: "para sempre",
    descricao: "Para quem quer explorar a plataforma",
    recursos: [
      "Busca por serviços e bairros",
      "Ver perfil dos prestadores",
      "Avaliações da vizinhança",
      "Até 3 contatos/mês",
    ],
    bloqueados: [
      "WhatsApp ilimitado",
      "Perfil de prestador",
      "Badge verificado",
    ],
    cta: "Começar grátis",
    destaque: false,
    priceId: null,
  },
  {
    id: "morador",
    nome: "Morador",
    preco: "R$ 19",
    periodo: "/mês",
    descricao: "Para quem contrata serviços com frequência",
    recursos: [
      "WhatsApp ilimitado",
      "Busca avançada por bairro",
      "Histórico de contratações",
      "Avaliações verificadas",
      "Suporte prioritário",
    ],
    bloqueados: [],
    cta: "Assinar Morador",
    destaque: true,
    priceId: import.meta.env.VITE_STRIPE_PRICE_ID,
  },
  {
    id: "prestador",
    nome: "Prestador",
    preco: "R$ 39",
    periodo: "/mês",
    descricao: "Para quem quer aparecer e captar clientes",
    recursos: [
      "Perfil público verificado",
      "Badge de confiança",
      "Destaque nos resultados",
      "Receber avaliações",
      "Suporte dedicado",
      "WhatsApp ilimitado",
    ],
    bloqueados: [],
    cta: "Assinar Prestador",
    destaque: false,
    priceId: import.meta.env.VITE_STRIPE_PRICE_ID,
  },
];

export default function AssinarPage() {
  const { user } = useAuth();
  const [carregando, setCarregando] = useState<string | null>(null);

  async function handleAssinar(plano: typeof PLANOS[0]) {
    if (plano.id === "gratis") {
      window.location.href = "/login?modo=cadastro";
      return;
    }

    if (!user) {
      window.location.href = `/login?modo=cadastro&redirect=/assinar`;
      return;
    }

    if (!plano.priceId) {
      alert("Configure VITE_STRIPE_PRICE_ID no seu .env para ativar pagamentos.");
      return;
    }

    setCarregando(plano.id);

    try {
      // Chame sua Supabase Edge Function aqui para criar a sessão Stripe
      // Exemplo:
      // const { data } = await supabase.functions.invoke("create-checkout", {
      //   body: { priceId: plano.priceId, userId: user.id },
      // });
      // window.location.href = data.url;

      // Por ora, mostra instrução de configuração
      alert(
        "Para ativar pagamentos:\n\n" +
        "1. Crie uma Supabase Edge Function 'create-checkout'\n" +
        "2. Instale o Stripe no projeto\n" +
        "3. Configure VITE_STRIPE_PRICE_ID\n\n" +
        "Veja o README.md para instruções completas."
      );
    } finally {
      setCarregando(null);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-br from-secondary to-leaf text-secondary-foreground">
        <div className="mx-auto max-w-6xl px-5 py-16 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-ochre">Planos</span>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">
            Simples, transparente, justo.
          </h1>
          <p className="mt-4 mx-auto max-w-xl text-secondary-foreground/80">
            Comece grátis. Assine quando quiser mais. Cancele quando quiser.
          </p>
        </div>
      </section>

      {/* Planos */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {PLANOS.map((plano) => (
            <div
              key={plano.id}
              className={`relative rounded-3xl border bg-card p-8 flex flex-col shadow-card transition-all hover:-translate-y-1 hover:shadow-warm ${
                plano.destaque
                  ? "border-primary/50 ring-2 ring-primary/20"
                  : "border-border"
              }`}
            >
              {plano.destaque && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground shadow-warm">
                  Mais popular
                </div>
              )}

              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {plano.nome}
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-display text-4xl text-foreground">{plano.preco}</span>
                  <span className="text-sm text-muted-foreground">{plano.periodo}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plano.descricao}</p>
              </div>

              <div className="mt-6 flex-1 space-y-2.5">
                {plano.recursos.map((r) => (
                  <div key={r} className="flex items-start gap-2 text-sm text-foreground/85">
                    <span className="mt-0.5 text-leaf shrink-0">✓</span>
                    {r}
                  </div>
                ))}
                {plano.bloqueados.map((r) => (
                  <div key={r} className="flex items-start gap-2 text-sm text-muted-foreground/60 line-through">
                    <span className="mt-0.5 shrink-0">✗</span>
                    {r}
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleAssinar(plano)}
                disabled={carregando === plano.id}
                className={`mt-8 w-full rounded-full py-3.5 text-sm font-semibold transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed ${
                  plano.destaque
                    ? "bg-primary text-primary-foreground shadow-warm"
                    : "bg-muted text-foreground hover:bg-accent border border-border"
                }`}
              >
                {carregando === plano.id ? "Aguarde..." : plano.cta}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="font-display text-3xl text-foreground text-center">Perguntas frequentes</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              {
                p: "Posso cancelar a qualquer momento?",
                r: "Sim. Basta cancelar no painel do seu perfil. Você continua com acesso até o fim do período pago.",
              },
              {
                p: "O plano Grátis tem limite de contatos?",
                r: "Sim, até 3 contatos de WhatsApp por mês. Para contato ilimitado, assine o plano Morador.",
              },
              {
                p: "O pagamento é seguro?",
                r: "Sim. Usamos Stripe, a plataforma de pagamentos mais confiável do mundo. Nunca armazenamos dados do seu cartão.",
              },
              {
                p: "Posso mudar de plano depois?",
                r: "Sim. Você pode fazer upgrade ou downgrade a qualquer momento. O valor é ajustado proporcionalmente.",
              },
            ].map((faq) => (
              <div key={faq.p} className="rounded-2xl border border-border bg-card p-6">
                <div className="font-semibold text-foreground">{faq.p}</div>
                <p className="mt-2 text-sm text-muted-foreground">{faq.r}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust */}
        <div className="mt-16 rounded-3xl bg-accent/40 border border-border p-10 text-center">
          <div className="font-display text-2xl text-foreground">Garantia de 7 dias</div>
          <p className="mt-2 mx-auto max-w-md text-muted-foreground text-sm">
            Se não ficou satisfeito, devolvemos 100% do valor. Sem burocracia, sem perguntas.
          </p>
          {!user && (
            <Link
              to="/login"
              search={{ modo: "cadastro" }}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-warm hover:scale-[1.02] transition-transform"
            >
              Criar conta grátis
            </Link>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
