import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CATEGORIAS, PRESTADORES, AVALIACOES_MOCK } from "@/data/mock";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/prestador/$id")({
  loader: ({ params }) => {
    const p = PRESTADORES.find((x) => x.id === params.id);
    if (!p) throw notFound();
    return { prestador: p };
  },
  component: PrestadorPage,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-background p-8 text-center">
      <div>
        <h1 className="font-display text-4xl">Prestador não encontrado</h1>
        <Link to="/buscar" className="mt-4 inline-block text-primary hover:underline">
          Voltar à busca
        </Link>
      </div>
    </div>
  ),
});

function PrestadorPage() {
  const { prestador: p } = Route.useLoaderData();
  const { user } = useAuth();
  const cat = CATEGORIAS.find((c) => c.slug === p.categoria);

  const msg = encodeURIComponent(
    `Olá ${p.nome.split(" ")[0]}, encontrei seu perfil no Conecta PVH e gostaria de combinar um serviço de ${cat?.nome.toLowerCase()}.`
  );
  const whatsappUrl = `https://wa.me/${p.whatsapp}?text=${msg}`;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="mx-auto max-w-5xl px-5 pt-6">
        <Link to="/buscar" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          ← Voltar à busca
        </Link>
      </div>

      <section className="mx-auto max-w-5xl px-5 py-8">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
          {/* Banner */}
          <div className="h-32 bg-gradient-to-r from-primary via-ochre to-leaf" />

          <div className="px-6 pb-8 md:px-10">
            <div className="-mt-14 flex flex-col items-start gap-5 md:flex-row md:items-end md:justify-between">
              <div className="flex items-end gap-5">
                <div
                  className="grid h-28 w-28 shrink-0 place-items-center rounded-3xl border-4 border-card font-display text-4xl text-white shadow-warm"
                  style={{ background: p.cor }}
                >
                  {p.inicial}
                </div>
                <div className="pb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="font-display text-3xl text-foreground md:text-4xl">{p.nome}</h1>
                    {p.verificado && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-leaf/15 px-2.5 py-0.5 text-xs font-semibold text-leaf">
                        ✓ Verificado
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span>{cat?.emoji} {cat?.nome}</span>
                    <span>📍 {p.bairro}</span>
                  </div>
                </div>
              </div>

              {user ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-warm transition-transform hover:scale-[1.02] md:w-auto"
                >
                  💬 Chamar no WhatsApp
                </a>
              ) : (
                <Link
                  to="/login"
                  search={{ modo: "login", redirect: `/prestador/${p.id}` }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-muted border border-border px-7 py-3.5 text-sm font-semibold text-foreground hover:bg-accent transition-colors md:w-auto"
                >
                  🔒 Entre para ver o contato
                </Link>
              )}
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-muted/40">
              <div className="px-5 py-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">★ Avaliação</div>
                <div className="mt-1 font-display text-2xl text-foreground">{p.nota.toFixed(1)}</div>
                <div className="text-[11px] text-muted-foreground">{p.avaliacoes} avaliações</div>
              </div>
              <div className="px-5 py-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Serviços feitos</div>
                <div className="mt-1 font-display text-2xl text-foreground">{p.servicosFeitos}</div>
                <div className="text-[11px] text-muted-foreground">desde o cadastro</div>
              </div>
              <div className="px-5 py-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Resposta</div>
                <div className="mt-1 font-display text-2xl text-foreground">&lt; 2h</div>
                <div className="text-[11px] text-muted-foreground">média no WhatsApp</div>
              </div>
            </div>

            <div className="mt-10 grid gap-10 md:grid-cols-3">
              <div className="md:col-span-2">
                <h2 className="font-display text-2xl text-foreground">Sobre o trabalho</h2>
                <p className="mt-3 text-muted-foreground">{p.bio}</p>

                <h2 className="mt-10 font-display text-2xl text-foreground">Avaliações da vizinhança</h2>
                <div className="mt-4 space-y-4">
                  {AVALIACOES_MOCK.map((a, i) => (
                    <div key={i} className="rounded-2xl border border-border bg-background p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-foreground">{a.autor}</div>
                          <div className="text-xs text-muted-foreground">{a.bairro} · {a.data}</div>
                        </div>
                        <div className="text-ochre text-sm">
                          {"★".repeat(a.nota)}{"☆".repeat(5 - a.nota)}
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-foreground/85">"{a.texto}"</p>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="space-y-4">
                {!user && (
                  <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
                    <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                      Para ver o contato
                    </div>
                    <p className="text-sm text-foreground/85 mb-3">
                      Crie uma conta grátis para acessar o WhatsApp de {p.nome.split(" ")[0]}.
                    </p>
                    <Link
                      to="/login"
                      search={{ modo: "cadastro", redirect: `/prestador/${p.id}` }}
                      className="block w-full rounded-full bg-primary py-2.5 text-center text-xs font-semibold text-primary-foreground shadow-warm"
                    >
                      Criar conta grátis
                    </Link>
                  </div>
                )}
                <div className="rounded-2xl border border-border bg-accent/30 p-5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-primary">Boas práticas</div>
                  <ul className="mt-3 space-y-2 text-sm text-foreground/85">
                    <li>• Combine preço e prazo antes do serviço</li>
                    <li>• Peça uma referência se for o primeiro contato</li>
                    <li>• Avalie depois — ajuda toda a vizinhança</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-border bg-card p-5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Atende em</div>
                  <div className="mt-2 font-display text-lg text-foreground">{p.bairro}</div>
                  <div className="text-xs text-muted-foreground">e bairros vizinhos sob combinação</div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
