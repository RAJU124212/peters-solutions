import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CATEGORIAS, BAIRROS, PRESTADORES } from "@/data/mock";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [categoria, setCategoria] = useState("");
  const [bairro, setBairro] = useState("");

  const destaques = PRESTADORES.slice(0, 4);

  function buscar(e: React.FormEvent) {
    e.preventDefault();
    navigate({ to: "/buscar", search: { categoria, bairro, q: "" } });
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-accent/20 to-background">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, oklch(0.62 0.16 40) 0%, transparent 60%), radial-gradient(circle at 80% 20%, oklch(0.74 0.14 70) 0%, transparent 50%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-5 pt-20 pb-28 md:pt-28 md:pb-36">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              ✦ Fase Piloto · 2 bairros · 6 categorias
            </span>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] text-foreground md:text-7xl">
              O serviço do seu <span className="text-primary">bairro</span>,
              a um WhatsApp de distância.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Encontre eletricista, diarista, costureira e quem mais o seu canto de Porto Velho precisar —
              gente do bairro, validada pela comunidade.
            </p>

            {/* Search card */}
            <form onSubmit={buscar} className="mt-10 rounded-2xl border border-border bg-card p-3 shadow-card md:flex md:items-center md:gap-2">
              <div className="flex-1 px-3 py-2">
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Preciso de</label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full bg-transparent py-1 text-sm font-medium text-foreground outline-none"
                >
                  <option value="">Qualquer serviço</option>
                  {CATEGORIAS.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.nome}</option>
                  ))}
                </select>
              </div>
              <div className="border-t border-border md:border-l md:border-t-0" />
              <div className="flex-1 px-3 py-2">
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">No bairro</label>
                <select
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  className="w-full bg-transparent py-1 text-sm font-medium text-foreground outline-none"
                >
                  <option value="">Todos os bairros-piloto</option>
                  {BAIRROS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-warm transition-transform hover:scale-[1.02] md:mt-0 md:w-auto"
              >
                Buscar
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span>✓ Perfis validados pela equipe</span>
              <span>★ Avaliação da vizinhança</span>
              <span>📍 Só gente daqui</span>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-4xl text-foreground md:text-5xl">Os serviços do dia a dia</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">Seis categorias no piloto. A vizinhança ajudou a escolher.</p>
          </div>
          <Link to="/buscar" search={{ categoria: "", bairro: "", q: "" }} className="hidden md:inline text-sm font-semibold text-primary hover:underline">
            Ver todos →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
          {CATEGORIAS.map((c) => (
            <Link
              key={c.slug}
              to="/buscar"
              search={{ categoria: c.slug, bairro: "", q: "" }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-warm"
            >
              <div className="text-4xl">{c.emoji}</div>
              <div className="mt-4 font-display text-xl text-foreground">{c.nome}</div>
              <p className="mt-1 text-sm text-muted-foreground">{c.descricao}</p>
              <div className="mt-4 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Ver prestadores →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* DESTAQUES */}
      <section className="bg-accent/40">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Em alta no bairro</span>
            <h2 className="mt-2 font-display text-4xl text-foreground md:text-5xl">Quem está atendendo agora</h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {destaques.map((p) => {
              const cat = CATEGORIAS.find((c) => c.slug === p.categoria);
              return (
                <Link
                  key={p.id}
                  to="/prestador/$id"
                  params={{ id: p.id }}
                  className="group rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-warm"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="grid h-14 w-14 place-items-center rounded-full font-display text-lg text-white"
                      style={{ background: p.cor }}
                    >
                      {p.inicial}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-semibold text-foreground">{p.nome}</div>
                      <div className="text-xs text-muted-foreground">{cat?.emoji} {cat?.nome}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-sm">
                    <span className="text-ochre">★</span>
                    <span className="font-semibold text-foreground">{p.nota.toFixed(1)}</span>
                    <span className="text-muted-foreground">({p.avaliacoes})</span>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    📍 {p.bairro}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      {!user && (
        <section className="mx-auto max-w-6xl px-5 py-24">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary via-secondary to-leaf p-10 md:p-16 text-center">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-ochre/30 blur-3xl" />
            <div className="absolute -left-10 -bottom-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
            <div className="relative">
              <span className="text-xs font-semibold uppercase tracking-wider text-ochre">Crie sua conta grátis</span>
              <h2 className="mt-3 font-display text-4xl text-secondary-foreground md:text-5xl">
                Acesse todos os prestadores.
              </h2>
              <p className="mt-4 mx-auto max-w-lg text-secondary-foreground/85">
                Crie uma conta e veja o WhatsApp de cada prestador. Plano gratuito disponível.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  to="/login"
                  search={{ modo: "cadastro" }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-warm transition-transform hover:scale-[1.03]"
                >
                  Criar conta grátis
                </Link>
                <Link
                  to="/assinar"
                  className="inline-flex items-center gap-2 rounded-full bg-secondary-foreground/10 border border-secondary-foreground/20 px-7 py-3.5 text-sm font-semibold text-secondary-foreground hover:bg-secondary-foreground/20 transition-colors"
                >
                  Ver planos
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}
