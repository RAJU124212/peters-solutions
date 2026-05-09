# Conecta PVH — MVP

Marketplace hiperlocal de serviços em Porto Velho. MVP com login, busca de serviços e assinatura.

## Stack

- **Frontend**: React 18 + Vite + TanStack Router
- **Estilo**: Tailwind CSS v4 (paleta Amazônia/pôr-do-sol)
- **Auth + DB**: Supabase
- **Pagamentos**: Stripe (via Supabase Edge Functions)
- **Deploy**: Vercel

---

## Setup em 10 minutos

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar Supabase

1. Acesse [supabase.com](https://supabase.com) e crie um projeto
2. Vá em **Settings > API** e copie a URL e a `anon key`
3. No **SQL Editor**, cole e execute o conteúdo de `supabase-schema.sql`
4. Em **Authentication > Providers**, ative Email/Password

### 3. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Preencha o `.env`:

```env
VITE_SUPABASE_URL=https://SEU_PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

### 4. Rodar localmente

```bash
npm run dev
```

Acesse: http://localhost:5173

---

## Configurar pagamentos com Stripe (opcional)

### 1. Criar conta Stripe

Acesse [stripe.com](https://stripe.com) e crie um produto + preço recorrente.

### 2. Criar Supabase Edge Function

```bash
supabase functions new create-checkout
```

Conteúdo da função (`supabase/functions/create-checkout/index.ts`):

```typescript
import Stripe from "npm:stripe";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!);

Deno.serve(async (req) => {
  const { priceId, userId } = await req.json();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${req.headers.get("origin")}/assinar?sucesso=1`,
    cancel_url: `${req.headers.get("origin")}/assinar`,
    metadata: { userId },
  });

  return new Response(JSON.stringify({ url: session.url }), {
    headers: { "Content-Type": "application/json" },
  });
});
```

Deploy:

```bash
supabase functions deploy create-checkout
supabase secrets set STRIPE_SECRET_KEY=sk_test_...
```

### 3. Adicionar variáveis no .env

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_STRIPE_PRICE_ID=price_...
```

### 4. Ativar o checkout em `/src/routes/assinar.tsx`

Descomente o bloco comentado dentro da função `handleAssinar`.

---

## Deploy na Vercel

```bash
npm install -g vercel
vercel
```

Adicione as variáveis de ambiente no painel da Vercel:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_STRIPE_PUBLISHABLE_KEY`
- `VITE_STRIPE_PRICE_ID`

---

## Estrutura do projeto

```
src/
├── components/
│   ├── SiteHeader.tsx     # Header com auth
│   └── SiteFooter.tsx
├── data/
│   └── mock.ts            # Dados locais (substituir por Supabase)
├── hooks/
│   └── useAuth.tsx        # Context de autenticação Supabase
├── lib/
│   ├── supabase.ts        # Client Supabase
│   └── utils.ts
└── routes/
    ├── __root.tsx         # Root + 404
    ├── index.tsx          # Home
    ├── buscar.tsx         # Busca de serviços
    ├── prestador.$id.tsx  # Perfil do prestador
    ├── login.tsx          # Login / Cadastro
    └── assinar.tsx        # Planos e assinatura
```

---

## Próximos passos (pós-MVP)

- [ ] Substituir mock.ts por queries reais no Supabase
- [ ] Webhook Stripe para atualizar `assinaturas` table
- [ ] Página de perfil do usuário (`/perfil`)
- [ ] Formulário de cadastro de prestador
- [ ] Upload de foto de perfil (Supabase Storage)
- [ ] Sistema de avaliações funcional
- [ ] Notificações por e-mail (Supabase triggers)
