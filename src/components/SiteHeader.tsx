import { Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";

export function SiteHeader() {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span
            className="grid h-9 w-9 place-items-center rounded-xl font-bold text-primary-foreground shadow-warm text-sm"
            style={{ background: "linear-gradient(135deg, oklch(0.62 0.16 40), oklch(0.74 0.14 70))" }}
          >
            C
          </span>
          <div className="leading-tight">
            <div className="font-display text-xl text-foreground">
              Conecta <span className="text-primary">PVH</span>
            </div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Porto Velho · RO
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-foreground/80">
          <Link
            to="/buscar"
            className="hover:text-primary transition-colors"
            activeProps={{ className: "text-primary font-semibold" }}
          >
            Buscar serviços
          </Link>
          <Link
            to="/assinar"
            className="hover:text-primary transition-colors"
            activeProps={{ className: "text-primary font-semibold" }}
          >
            Planos
          </Link>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground truncate max-w-[140px]">{user.email}</span>
              <button
                onClick={() => signOut()}
                className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-accent transition-colors"
              >
                Sair
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-secondary px-5 py-2 text-secondary-foreground hover:bg-secondary/90 transition-colors"
            >
              Entrar
            </Link>
          )}
        </nav>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          {user ? (
            <button
              onClick={() => signOut()}
              className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground"
            >
              Sair
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-secondary px-4 py-2 text-xs font-semibold text-secondary-foreground"
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
