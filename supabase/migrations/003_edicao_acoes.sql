-- Permite registrar e editar o plano de ação de cada solicitação.
alter table public.solicitacoes
  add column if not exists acao text;

create index if not exists idx_solicitacoes_status on public.solicitacoes(status);
create index if not exists idx_solicitacoes_prazo on public.solicitacoes(prazo);
