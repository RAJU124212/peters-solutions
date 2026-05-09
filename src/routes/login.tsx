import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const searchSchema = z.object({
  modo: z.enum(["login", "cadastro"]).optional().default("login"),
  redirect: z.string().optional().default("/"),
});

export const Route = createFileRoute("/login")({
  validateSearch: searchSchema,
  component: LoginPage,
});

function LoginPage() {
  const { modo, redirect } = Route.useSearch();
  const navigate = useNavigate();
  const { signInWithEmail, signUpWithEmail, user, loading } = useAuth();

  const [isLogin, setIsLogin] = useState(modo !== "cadastro");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [enviando, setEnviando] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate({ to: redirect || "/" });
    }
  }, [user, loading, navigate, redirect]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setSucesso("");
    setEnviando(true);

    if (isLogin) {
      const { error } = await signInWithEmail(email, senha);
      if (error) {
        setErro(traduzirErro(error));
      } else {
        navigate({ to: redirect || "/" });
      }
    } else {
      if (!nome.trim()) {
        setErro("Informe seu nome completo.");
        setEnviando(false);
        return;
      }
      const { error } = await signUpWithEmail(email, senha, nome);
      if (error) {
        setErro(traduzirErro(error));
      } else {
        setSucesso("Conta criada! Verifique seu e-mail para ativar a conta.");
      }
    }
    setEnviando(false);
  }

  function traduzirErro(msg: string): string {
    if (msg.includes("Invalid login credentials")) return "E-mail ou senha incorretos.";
    if (msg.includes("Email not confirmed")) return "Confirme seu e-mail antes de entrar.";
    if (msg.includes("User already registered")) return "E-mail já cadastrado. Faça login.";
    if (msg.includes("Password should be at least 6")) return "A senha deve ter pelo menos 6 caracteres.";
    return msg;
  }

  if (loading) return null;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="mx-auto max-w-md px-5 py-20">
        {/* Toggle */}
        <div className="mb-8 rounded-2xl border border-border bg-card p-1.5 flex gap-1">
          <button
            onClick={() => { setIsLogin(true); setErro(""); setSucesso(""); }}
            className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all ${
              isLogin
                ? "bg-primary text-primary-foreground shadow-warm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Entrar
          </button>
          <button
            onClick={() => { setIsLogin(false); setErro(""); setSucesso(""); }}
            className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all ${
              !isLogin
                ? "bg-primary text-primary-foreground shadow-warm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Criar conta
          </button>
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
          <h1 className="font-display text-3xl text-foreground">
            {isLogin ? "Bem-vindo de volta" : "Crie sua conta"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isLogin
              ? "Entre para ver os contatos dos prestadores."
              : "Grátis. Sem cartão de crédito agora."}
          </p>

          {sucesso ? (
            <div className="mt-6 rounded-xl bg-leaf/10 border border-leaf/30 p-5 text-sm text-foreground">
              <div className="font-semibold text-leaf mb-1">Conta criada com sucesso!</div>
              {sucesso}
              <button
                onClick={() => { setIsLogin(true); setSucesso(""); }}
                className="mt-3 block text-primary font-semibold hover:underline"
              >
                Fazer login →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {!isLogin && (
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Nome completo
                  </span>
                  <input
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Como você quer ser chamado"
                    className="input"
                  />
                </label>
              )}

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  E-mail
                </span>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="input"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Senha
                </span>
                <input
                  required
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder={isLogin ? "Sua senha" : "Mínimo 6 caracteres"}
                  className="input"
                />
              </label>

              {erro && (
                <div className="rounded-xl bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive">
                  {erro}
                </div>
              )}

              <button
                type="submit"
                disabled={enviando}
                className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-warm transition-all hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {enviando
                  ? "Aguarde..."
                  : isLogin
                  ? "Entrar"
                  : "Criar conta grátis"}
              </button>

              {isLogin && (
                <p className="text-center text-xs text-muted-foreground">
                  Não tem conta?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className="text-primary font-semibold hover:underline"
                  >
                    Cadastre-se grátis
                  </button>
                </p>
              )}

              {!isLogin && (
                <p className="text-center text-xs text-muted-foreground">
                  Ao criar conta, você concorda com os{" "}
                  <span className="text-primary">termos de uso</span> e{" "}
                  <span className="text-primary">política de privacidade</span>.
                </p>
              )}
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Procurando trabalho?{" "}
          <Link to="/assinar" className="text-primary font-semibold hover:underline">
            Veja os planos para prestadores →
          </Link>
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
