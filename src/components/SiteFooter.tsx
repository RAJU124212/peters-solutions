import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="font-display text-2xl text-foreground">
              Conecta <span className="text-primary">PVH</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
              O serviço do seu bairro, a um WhatsApp de distância. Fase piloto em Porto Velho.
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Plataforma</div>
            <nav className="space-y-2 text-sm">
              <Link to="/buscar" className="block text-foreground/75 hover:text-primary transition-colors">Buscar serviços</Link>
              <Link to="/assinar" className="block text-foreground/75 hover:text-primary transition-colors">Planos</Link>
              <Link to="/login" className="block text-foreground/75 hover:text-primary transition-colors">Entrar</Link>
            </nav>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Contato</div>
            <a href="https://wa.me/5569999990000" className="text-sm text-foreground/75 hover:text-primary transition-colors">
              WhatsApp: (69) 99999-0000
            </a>
            <p className="mt-2 text-xs text-muted-foreground">Fase piloto · 2 bairros · 6 categorias</p>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          © 2025 Conecta PVH. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
