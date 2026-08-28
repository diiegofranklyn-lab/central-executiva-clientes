-- Visualização pública da Central Executiva.
-- Visitantes podem consultar ações e nomes dos clientes, mas somente usuários autenticados podem alterar dados.

alter table public.solicitacoes enable row level security;

-- Leitura pública das ações.
drop policy if exists "solicitacoes_public_select" on public.solicitacoes;
create policy "solicitacoes_public_select"
on public.solicitacoes for select
to anon, authenticated
using (true);

-- Operações de manutenção continuam restritas a usuários autenticados.
drop policy if exists "solicitacoes_authenticated_insert" on public.solicitacoes;
create policy "solicitacoes_authenticated_insert"
on public.solicitacoes for insert
to authenticated
with check (true);

drop policy if exists "solicitacoes_authenticated_update" on public.solicitacoes;
create policy "solicitacoes_authenticated_update"
on public.solicitacoes for update
to authenticated
using (true)
with check (true);

drop policy if exists "solicitacoes_authenticated_delete" on public.solicitacoes;
create policy "solicitacoes_authenticated_delete"
on public.solicitacoes for delete
to authenticated
using (true);

-- O dashboard faz join com clientes; nomes precisam ser consultáveis publicamente.
alter table public.clientes enable row level security;

drop policy if exists "clientes_public_select" on public.clientes;
create policy "clientes_public_select"
on public.clientes for select
to anon, authenticated
using (true);

-- Mantém o gerenciamento de clientes disponível para usuários autenticados.
drop policy if exists "clientes_authenticated_insert" on public.clientes;
create policy "clientes_authenticated_insert"
on public.clientes for insert
to authenticated
with check (true);

drop policy if exists "clientes_authenticated_update" on public.clientes;
create policy "clientes_authenticated_update"
on public.clientes for update
to authenticated
using (true)
with check (true);

drop policy if exists "clientes_authenticated_delete" on public.clientes;
create policy "clientes_authenticated_delete"
on public.clientes for delete
to authenticated
using (true);
