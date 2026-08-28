-- Central Executiva de Clientes
-- Etapa 1: estrutura de postos operacionais

create table if not exists public.postos (
  id uuid primary key default gen_random_uuid(),
  cliente_id uuid not null references public.clientes(id) on delete cascade,
  nome text not null,
  codigo text,
  cidade text,
  estado text,
  endereco text,
  responsavel text,
  efetivo integer not null default 0 check (efetivo >= 0),
  escala text,
  status text not null default 'ativo' check (status in ('ativo', 'inativo', 'implantacao')),
  observacoes text,
  criado_por uuid references auth.users(id) on delete set null,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create index if not exists idx_postos_cliente_id on public.postos(cliente_id);
create index if not exists idx_postos_status on public.postos(status);

alter table public.postos enable row level security;

drop policy if exists "postos_select_authenticated" on public.postos;
create policy "postos_select_authenticated"
on public.postos for select
to authenticated
using (true);

drop policy if exists "postos_insert_authenticated" on public.postos;
create policy "postos_insert_authenticated"
on public.postos for insert
to authenticated
with check (true);

drop policy if exists "postos_update_authenticated" on public.postos;
create policy "postos_update_authenticated"
on public.postos for update
to authenticated
using (true)
with check (true);

drop policy if exists "postos_delete_authenticated" on public.postos;
create policy "postos_delete_authenticated"
on public.postos for delete
to authenticated
using (true);
