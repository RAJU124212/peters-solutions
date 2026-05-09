import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CATEGORIAS, BAIRROS, PRESTADORES } from "@/data/mock";
import { useAuth } from "@/hooks/useAuth";

const searchSchema = z.object({
  categoria: z.string().optional().default(""),
  bairro: z.string().optional().default(""),
  q: z.string().optional().default(""),
});

export const Route = createFileRoute("/buscar")({
  validateSearch: searchSchema,
  component: Buscar,
});

function Buscar() {
  const { categoria, bairro, q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { user } = useAuth();

  const filtrados = PRESTADORES.filter((p) => {
    if (categoria && p.categoria !== categoria) return false;
    if (bairro && p.bairro !== bairro) return false;
    if (q && !p.nome.toLowerCase().includes(q.toLowerCase()) &&
        !p.bio.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }).sort((a, b) => b.nota - a.nota);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Filter bar */}
      <section className="border-b border-border bg-accent/30">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <h1 className="font-display text-4xl text-foreground md:text-5xl">
            Encontre quem atende seu bairro
          </h1>
          <p className="mt-2 text-muted-foreground">
            Filtre por serviço e localização — todos os perfis foram revisados pela equipe Conecta PVH.
          </p>

          <div className="mt-6 grid gap-3 rounded-2xl border border-border bg-card p-3 md:grid-cols-[1fr_1fr_1fr_auto]">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">🔍</span>
              <input
                value={q}
                onChange={(e) => navigate({ search: (s: Record<string, string>) => ({ ...s, q: e.target.value }) })}
                placeholder="Buscar por nome ou serviço…"
                className="w-full rounded-lg border border-border bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <select
              value={categoria}
              onChange={(e) => navigate({ search: (s: Record<string, string>) => ({ ...s, categoria: e.target.value }) })}
              className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
            >
              <option value="">Todos os serviços</option>
              {CATEGORIAS.map((c) => (
                <option key={c.slug} value={c.slug}>{c.emoji} {c.nome}</option>
              ))}
            </select>
            <select
              value={bairro}
              onChange={(e) => navigate({ search: (s: Record<string, string>) => ({ ...s, bairro: e.target.value }) })}
              className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
            >
              <option value="">Todos os bairros</option>
              {BAIRROS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <button
              onClick={() => navigate({ search: { categoria: "", bairro: "", q: "" } })}
              className="rounded-lg bg-muted px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors"
            >
              Limpar
            </button>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="mb-6 flex items-baseline justify-between">
          <span className="text-sm text-muted-foreground">
            {filtrados.length} {filtrados.length === 1 ? "prestador encontrado" : "prestadores encontrados"}
          </span>
          <span className="text-xs text-muted-foreground">Ordenado por avaliação</span>
        </div>

        {!user && (
          <div className="mb-8 rounded-2xl border border-primary/30 bg-primary/5 p-5 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="font-semibold text-foreground text-sm">Crie uma conta para ver os contatos</div>
              <p className="mt-0.5 text-xs text-muted-foreground">O WhatsApp dos prestadores fica visível após login. É grátis.</p>
            </div>
            <Link
              to="/login"
              search={{ modo: "cadastro", redirect: "/buscar" }}
              className="shrink-0 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-warm hover:scale-[1.02] transition-transform"
            >
              Criar conta grátis
            </Link>
          </div>
        )}

        {filtrados.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-14 text-center">
            <div className="text-4xl">🌱</div>
            <div className="mt-4 font-display text-2xl text-foreground">
              Ainda não temos esse serviço por aqui
            </div>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Estamos em fase piloto e novos prestadores entram toda semana. Volte em breve ou nos avise pelo WhatsApp.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtrados.map((p) => {
              const cat = CATEGORIAS.find((c) => c.slug === p.categoria);
              return (
                <Link
                  key={p.id}
                  to="/prestador/$id"
                  params={{ id: p.id }}
                  className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-warm"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="grid h-16 w-16 place-items-center rounded-2xl font-display text-xl text-white shrink-0"
                      style={{ background: p.cor }}
                    >
                      {p.inicial}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h3 className="truncate font-semibold text-foreground">{p.nome}</h3>
                        {p.verificado && (
                          <span className="shrink-0 text-xs text-leaf" title="Verificado">✓</span>
                        )}
                      </div>
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        {cat?.emoji} {cat?.nome}
                      </div>
                      <div className="mt-2 flex items-center gap-1 text-sm">
                        <span className="text-ochre">★</span>
                        <span className="font-semibold text-foreground">{p.nota.toFixed(1)}</span>
                        <span className="text-xs text-muted-foreground">· {p.avaliacoes} avaliações</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">{p.bio}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs">
                    <span className="text-muted-foreground">📍 {p.bairro}</span>
                    <span className="font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Ver perfil →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
