import { supabase } from './supabase.js';

export const $ = (id) => document.getElementById(id);
export const escapeHtml = (value='') => String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
export const formatDate = (value) => value ? new Date(value).toLocaleDateString('pt-BR') : '—';
export const formatDateTime = (value) => value ? new Date(value).toLocaleString('pt-BR') : '—';

function enablePublicView() {
  document.documentElement.dataset.guest = 'true';
  if (!document.getElementById('publicViewStyle')) {
    const style = document.createElement('style');
    style.id = 'publicViewStyle';
    style.textContent = `#newBtn,#editModal,#modal .form-actions,.status-edit,.edit,.delete{display:none!important}`;
    document.head.appendChild(style);
  }
  const userEmail = $('userEmail');
  if (userEmail) userEmail.textContent = 'Visualização pública';
  const profileEmail = $('profileEmail');
  if (profileEmail) profileEmail.textContent = 'Visualização pública';
  const profile = document.querySelector('.profile-text');
  if (profile && !profile.querySelector('.public-login-link')) {
    const link = document.createElement('a');
    link.className = 'public-login-link';
    link.href = './index.html';
    link.textContent = 'Entrar para editar';
    link.style.cssText = 'font-size:11px;text-decoration:underline;display:inline-block;margin-top:3px;';
    profile.appendChild(link);
  }
}

export async function requireAuth() {
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    enablePublicView();
    return null;
  }
  document.documentElement.dataset.guest = 'false';
  const email = data.user.email || '';
  const userEmail = $('userEmail');
  if (userEmail) userEmail.textContent = email;
  const profileEmail = $('profileEmail');
  if (profileEmail) profileEmail.textContent = email;
  return data.user;
}

const icons = {
  dashboard: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  solicitacoes: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3.5h9l4 4V20.5H6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M15 3.5v5h4M9 12h6M9 16h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  clientes: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M5.5 20c.5-3.4 2.8-5.2 6.5-5.2s6 1.8 6.5 5.2M4 12.5a2.6 2.6 0 0 0-2 2.5v2.5h4M20 12.5a2.6 2.6 0 0 1 2 2.5v2.5h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  relatorios: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V11h4v9M10 20V5h4v15M16 20V8h4v12" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>'
};

export function setupShell(active) {
  const brandLogo = document.querySelector('.brand-logo');
  if (brandLogo) {
    brandLogo.innerHTML = '<img class="security-logo" src="./assets/logo-security-original.svg" alt="Security — Segurança e Serviços">';
  }
  document.querySelectorAll('.nav a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === active);
    const icon = a.querySelector('.icon');
    if (icon && icons[a.dataset.page]) icon.innerHTML = icons[a.dataset.page];
  });
  const btn = $('logoutButton');
  if (btn) btn.addEventListener('click', async () => { await supabase.auth.signOut(); window.location.href='./index.html'; });
}

export function badgeStatus(status) {
  const map = { aberto:['badge-open','Aberto'], 'em andamento':['badge-progress','Em andamento'], concluido:['badge-done','Concluído'], concluída:['badge-done','Concluída'], concluído:['badge-done','Concluído'] };
  const key = String(status||'').toLowerCase(); const item = map[key] || ['badge-open', status || 'Aberto'];
  return `<span class="badge ${item[0]}">${escapeHtml(item[1])}</span>`;
}

export function badgePriority(priority) {
  const p=String(priority||'Média').toLowerCase();
  const cls=p.includes('crít')||p.includes('crit')?'badge-critical':p.includes('alta')?'badge-high':'badge-medium';
  return `<span class="badge ${cls}">${escapeHtml(priority||'Média')}</span>`;
}

export async function getSolicitacoes() {
  const { data, error } = await supabase.from('solicitacoes').select('*').order('criado_em',{ascending:false});
  if (error) throw error;
  return data || [];
}

export async function getClientes() {
  const { data, error } = await supabase.from('clientes').select('*').order('nome');
  if (error) throw error;
  return data || [];
}
