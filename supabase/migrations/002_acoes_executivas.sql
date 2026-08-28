-- Ações executivas iniciais e campos usados pela Central.
alter table public.solicitacoes add column if not exists categoria text;

-- Cliente demonstrativo/real já usado na carteira executiva.
insert into public.clientes (nome, ativo)
select 'John Deere', true
where not exists (select 1 from public.clientes where lower(nome)=lower('John Deere'));

-- Ações apresentadas no modelo executivo. Não duplica se a migration for reaplicada.
insert into public.solicitacoes
  (cliente_id, categoria, titulo, descricao, prioridade, status, solicitante, responsavel, prazo)
select c.id, v.categoria, v.titulo, v.descricao, v.prioridade, 'Aberto', v.solicitante, v.responsavel, v.prazo::timestamptz
from public.clientes c
cross join (values
  ('Operacional','Proposta para Sistema de Alarme de Intrusão','Avaliar proposta e próximos passos para implantação do sistema de alarme.','Crítica','Izomar / Douglas','2026-09-03'),
  ('Contratual','Inclusão de Prazo de Treinamento no SLA','Avaliar inclusão do prazo de treinamento no SLA contratual.','Média','Izomar / Financeiro','2026-09-03'),
  ('RH / Benefícios','Convênio médico para Campinas e Piracicaba','Avaliar alternativas e condições do benefício para as unidades.','Média','Izomar / Maragão','2026-09-24'),
  ('Tecnologia','Orçamento da docking station RealWear','Levantar orçamento e condições para implantação da docking station.','Média','Marcos / Jackson','2026-09-24'),
  ('Tecnologia','Orçamento para implantação do serviço','Avaliar escopo, custos e cronograma para implantação do serviço.','Média','Marcos / Jackson','2026-09-24'),
  ('Comunicação','Melhorias no sistema de rádio das unidades','Estudar melhorias de cobertura, comunicação e operação dos rádios.','Média','Emerson / André / Diego / Leonardo','2026-09-21')
) as v(categoria,titulo,descricao,prioridade,responsavel,prazo)
where lower(c.nome)=lower('John Deere')
and not exists (
  select 1 from public.solicitacoes s
  where s.cliente_id=c.id and s.titulo=v.titulo
);
