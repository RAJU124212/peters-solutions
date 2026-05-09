-- ============================================================
-- Conecta PVH — Schema Supabase
-- Execute no SQL Editor do Supabase: Database > SQL Editor
-- ============================================================

-- Tabela de prestadores
create table if not exists public.prestadores (
  id          text primary key default gen_random_uuid()::text,
  nome        text not null,
  categoria   text not null,
  bairro      text not null,
  nota        numeric(3,1) default 5.0,
  avaliacoes  integer default 0,
  bio         text,
  inicial     text,
  cor         text default '#c2410c',
  verificado  boolean default false,
  servicos_feitos integer default 0,
  whatsapp    text,
  user_id     uuid references auth.users(id),
  created_at  timestamptz default now()
);

-- Habilitar Row Level Security
alter table public.prestadores enable row level security;

-- Leitura pública (todos podem ver prestadores)
create policy "prestadores_select_public"
  on public.prestadores for select
  using (true);

-- Apenas o dono pode atualizar seu perfil
create policy "prestadores_update_own"
  on public.prestadores for update
  using (auth.uid() = user_id);

-- Apenas admins podem inserir (via service_role)
create policy "prestadores_insert_admin"
  on public.prestadores for insert
  with check (auth.role() = 'service_role');

-- ============================================================

-- Tabela de assinaturas
create table if not exists public.assinaturas (
  id                      text primary key default gen_random_uuid()::text,
  user_id                 uuid references auth.users(id) not null,
  plano                   text not null default 'gratis',
  status                  text not null default 'ativa' check (status in ('ativa', 'cancelada', 'pendente')),
  stripe_subscription_id  text,
  stripe_customer_id      text,
  created_at              timestamptz default now(),
  expires_at              timestamptz
);

alter table public.assinaturas enable row level security;

-- Usuário só vê a própria assinatura
create policy "assinaturas_select_own"
  on public.assinaturas for select
  using (auth.uid() = user_id);

-- Apenas service_role pode inserir/atualizar (via Edge Function do Stripe)
create policy "assinaturas_insert_service"
  on public.assinaturas for insert
  with check (auth.role() = 'service_role');

create policy "assinaturas_update_service"
  on public.assinaturas for update
  using (auth.role() = 'service_role');

-- ============================================================

-- Tabela de avaliações
create table if not exists public.avaliacoes (
  id            text primary key default gen_random_uuid()::text,
  prestador_id  text references public.prestadores(id) not null,
  user_id       uuid references auth.users(id) not null,
  nota          integer not null check (nota between 1 and 5),
  texto         text,
  created_at    timestamptz default now()
);

alter table public.avaliacoes enable row level security;

create policy "avaliacoes_select_public"
  on public.avaliacoes for select
  using (true);

create policy "avaliacoes_insert_auth"
  on public.avaliacoes for insert
  with check (auth.uid() = user_id);

-- ============================================================
-- Dados iniciais (seed) — mesmos do mock.ts
-- ============================================================

insert into public.prestadores (id, nome, categoria, bairro, nota, avaliacoes, bio, inicial, cor, verificado, servicos_feitos, whatsapp) values
  ('p1', 'Raimundo Nogueira',        'eletricista', 'Nossa Senhora das Graças', 4.9, 32, 'Eletricista há 18 anos em PVH. Atendimento rápido, sem furada.', 'RN', '#c2410c', true,  124, '5569991110001'),
  ('p2', 'Maria Conceição da Silva', 'diarista',    'Embratel',                  5.0, 41, 'Faxina pesada, passo roupa e deixo tudo no lugar.',              'MC', '#15803d', true,  210, '5569992220002'),
  ('p3', 'Seu Antônio Bezerra',      'encanador',   'Nossa Senhora das Graças', 4.8, 27, 'Especialista em vazamento difícil de achar.',                   'AB', '#b45309', true,  88,  '5569993330003'),
  ('p4', 'Dona Francisca',           'marmita',     'Embratel',                  4.9, 56, 'Marmita caseira, comida de Rondônia.',                          'DF', '#7c2d12', true,  312, '5569994440004'),
  ('p5', 'Cleiton Souza',            'jardinagem',  'Rio Madeira',               4.7, 19, 'Cuido de jardim, poda de árvore alta, plantas tropicais.',      'CS', '#166534', true,  64,  '5569995550005'),
  ('p6', 'Dona Lourdes Almeida',     'costureira',  'Centro',                    5.0, 38, 'Costureira há 30 anos. Ajuste de roupa, vestido de festa.',     'LA', '#9a3412', true,  178, '5569996660006'),
  ('p7', 'Jorge dos Santos',         'eletricista', 'Areal',                     4.6, 14, 'Instalação de chuveiro, ventilador de teto, tomadas.',          'JS', '#365314', false, 31,  '5569997770007'),
  ('p8', 'Tia Neusa',                'diarista',    'São João Bosco',             4.8, 22, 'Limpeza pós-obra é minha especialidade.',                       'TN', '#92400e', true,  73,  '5569998880008')
on conflict (id) do nothing;
