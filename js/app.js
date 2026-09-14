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
  dashboard: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1" fill="currentColor"/><rect x="14" y="4" width="6" height="6" rx="1" fill="currentColor"/><rect x="4" y="14" width="6" height="6" rx="1" fill="currentColor"/><rect x="14" y="14" width="6" height="6" rx="1" fill="currentColor"/></svg>',
  solicitacoes: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3.5h9l3.5 3.5V20.5H6z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M15 3.5V8h3.5M9 12h7M9 16h5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  clientes: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5.5 20c.5-3.3 2.7-5.2 6.5-5.2s6 1.9 6.5 5.2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  relatorios: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19V12M10 19V8M15 19V5M20 19V10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
};

function applyModernUI() {
  if (document.getElementById('modernUIStyle')) return;
  const style = document.createElement('style');
  style.id = 'modernUIStyle';
  style.textContent = `
    :root{--navy:#073f69;--navy-deep:#052f50;--accent:#2d83bd;--soft:#eef5f9}
    body{background:#f3f6f9}
    .sidebar{width:230px;padding:20px 14px;background:linear-gradient(180deg,#08456f 0%,#073f69 48%,#06385d 100%);box-shadow:7px 0 24px rgba(3,34,56,.10)}
    .brand{padding:0 8px 20px;border-bottom:1px solid rgba(255,255,255,.20)}
    .brand-logo{height:58px;position:relative;display:flex;align-items:center;justify-content:flex-start;overflow:hidden}
    .security-logo{width:190px;height:58px;object-fit:contain;object-position:left center;filter:brightness(0) invert(1)}
    .brand-logo:after{content:"";position:absolute;left:0;top:0;width:53px;height:58px;background:url("./assets/logo-security-original.svg") left center/190px 58px no-repeat;pointer-events:none}
    .brand-sub{font-size:8px;letter-spacing:.13em;margin-top:8px;color:#fff;font-weight:700;text-align:left}
    .nav{padding-top:20px;display:grid;gap:6px}
    .nav a{min-height:44px;padding:11px 12px;border-radius:9px;gap:12px;color:#fff;font-size:13px;font-weight:750;transition:background .18s ease,transform .18s ease}
    .nav a:hover{background:rgba(255,255,255,.08);transform:translateX(2px)}
    .nav a.active{background:#2d6489;box-shadow:inset 3px 0 0 rgba(255,255,255,.95);color:#fff}
    .nav .icon{width:20px;height:20px;flex:0 0 20px;display:grid;place-items:center;color:#fff;font-size:0;line-height:1}
    .nav .icon svg{width:19px;height:19px;display:block}
    .sidebar-footer{font-size:10px;padding:12px 7px;color:#b9d4e6}
    .main{margin-left:230px;width:calc(100% - 230px)}
    .top-header{height:64px;padding:0 28px;background:#fff;border-bottom:1px solid #dbe5ed;box-shadow:0 1px 8px rgba(8,62,104,.03)}
    .page-title{font-size:14px}.page-subtitle{font-size:9px}
    .profile{padding:6px 9px 6px 13px;border:1px solid #e4ebf0;border-radius:10px;background:#fff}
    .avatar{width:31px;height:31px;background:#0a4674}
    .content{padding:28px 28px 40px}
    .section-head{margin-bottom:18px}.section-head h1{font-size:19px}.section-head p{font-size:10px}
    .primary{border-radius:8px;padding:11px 16px}
    .cards{gap:14px}.metric{border-radius:11px;padding:18px;min-height:105px;box-shadow:0 5px 18px rgba(23,56,79,.05)}
    .metric-value{font-size:27px}
    .grid-2{gap:16px;margin-top:16px}.panel{border-radius:11px;box-shadow:0 5px 18px rgba(23,56,79,.05);padding:17px}
    .attention{margin-top:16px}
    @media(max-width:1050px){.sidebar{width:210px}.main{margin-left:210px;width:calc(100% - 210px)}}
    @media(max-width:700px){.sidebar{width:70px;padding:14px 8px}.security-logo{display:none}.brand-logo{height:45px;justify-content:center}.brand-logo:before{content:'S';font-size:26px;font-weight:800;color:#fff}.brand-logo:after{display:none}.brand-sub{display:none}.nav{padding-top:15px}.nav a{justify-content:center;padding:11px 8px}.nav a.active{box-shadow:none}.main{margin-left:70px;width:calc(100% - 70px)}.top-header{height:58px;padding:0 14px}.content{padding:18px 13px 30px}.profile{padding:5px}.profile .profile-text{display:none}}
  `;
  document.head.appendChild(style);
}

export function setupShell(active) {
  applyModernUI();
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
