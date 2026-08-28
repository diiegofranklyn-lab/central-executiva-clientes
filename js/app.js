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

export function setupShell(active) {
  document.querySelectorAll('.nav a').forEach(a => a.classList.toggle('active', a.dataset.page === active));
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
