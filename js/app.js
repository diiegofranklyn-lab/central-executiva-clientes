import { supabase } from './supabase.js';

export const $ = (id) => document.getElementById(id);
export const escapeHtml = (value='') => String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
export const formatDate = (value) => value ? new Date(value).toLocaleDateString('pt-BR') : '—';
export const formatDateTime = (value) => value ? new Date(value).toLocaleString('pt-BR') : '—';

function enablePublicView() {
  document.documentElement.dataset.guest = 'true';
  if (!document.getElementById('publicViewStyle')) {
    const style = document.createElement('style'); style.id = 'publicViewStyle';
    style.textContent = `#newBtn,#editModal,#modal .form-actions,.status-edit,.edit,.delete{display:none!important}`;
    document.head.appendChild(style);
  }
  const userEmail=$('userEmail'); if(userEmail) userEmail.textContent='Visualização pública';
  const profileEmail=$('profileEmail'); if(profileEmail) profileEmail.textContent='Visualização pública';
  const profile=document.querySelector('.profile-text');
  if(profile&&!profile.querySelector('.public-login-link')){const link=document.createElement('a');link.className='public-login-link';link.href='./index.html';link.textContent='Entrar para editar';link.style.cssText='font-size:11px;text-decoration:underline;display:inline-block;margin-top:3px;';profile.appendChild(link);}
}
export async function requireAuth(){const{data}=await supabase.auth.getUser();if(!data.user){enablePublicView();return null;}document.documentElement.dataset.guest='false';const email=data.user.email||'';if($('userEmail'))$('userEmail').textContent=email;if($('profileEmail'))$('profileEmail').textContent=email;return data.user;}

const icons={dashboard:'▦',solicitacoes:'▤',clientes:'●',relatorios:'▥'};
function applyModernUI(){if(document.getElementById('modernUIStyle'))return;const style=document.createElement('style');style.id='modernUIStyle';style.textContent=`
:root{--navy:#073f69;--navy-deep:#052f50;--accent:#2d83bd;--soft:#eef5f9}
body{background:linear-gradient(135deg,#f4f7fa 0%,#eef3f7 100%)}
.sidebar{width:230px;padding:22px 14px;background:linear-gradient(180deg,#073f69 0%,#06385e 55%,#052f50 100%);box-shadow:8px 0 28px rgba(3,34,56,.12)}
.brand{padding:2px 8px 19px;border-bottom:1px solid rgba(255,255,255,.18)}
.brand-logo{height:58px;display:flex;align-items:center;justify-content:flex-start;overflow:hidden}
.brand-logo>img.security-logo{display:block!important;width:190px;height:58px;object-fit:contain;object-position:left center;filter:none!important;margin:0}
.brand-logo>span,.brand-logo{font-size:0}
.brand-logo:before{display:none!important}.brand-logo:after{display:none!important}
.brand-sub{font-size:8px;letter-spacing:.14em;margin-top:8px;color:#fff;font-weight:700}
.nav{padding-top:20px;gap:8px}.nav a{min-height:44px;padding:11px 13px;border-radius:10px;gap:12px;color:rgba(255,255,255,.92);font-size:13px;transition:all .2s ease}.nav a:hover{background:rgba(255,255,255,.09);transform:translateX(3px)}.nav a.active{background:linear-gradient(90deg,rgba(85,154,199,.42),rgba(64,128,169,.27));box-shadow:inset 3px 0 0 #fff,0 8px 20px rgba(0,0,0,.08);color:#fff}
.nav .icon{width:20px;height:20px;flex-basis:20px;display:grid;place-items:center;position:relative;color:#fff;font-size:16px;line-height:1}.nav .icon:before,.nav .icon:after{display:none!important;content:none!important}.nav a .icon{font-family:Arial,sans-serif;font-weight:700}
.sidebar-footer{font-size:10px;padding:12px 7px;color:#b9d4e6}.main{margin-left:230px;width:calc(100% - 230px)}.top-header{height:64px;padding:0 28px;background:rgba(255,255,255,.94);backdrop-filter:blur(10px);box-shadow:0 1px 0 rgba(8,62,104,.05)}.page-title{font-size:14px}.page-subtitle{font-size:9px}.profile{padding:6px 9px 6px 13px;border:1px solid #e4ebf0;border-radius:12px;background:#fff;box-shadow:0 5px 18px rgba(19,55,78,.05)}.avatar{width:31px;height:31px;background:linear-gradient(135deg,#0a4674,#0b75bd)}.content{padding:28px 28px 40px}.section-head{margin-bottom:18px}.section-head h1{font-size:19px}.section-head p{font-size:10px}.primary{border-radius:9px;padding:11px 16px;box-shadow:0 6px 16px rgba(6,63,107,.15);transition:transform .18s ease,box-shadow .18s ease}.primary:hover{transform:translateY(-1px);box-shadow:0 9px 20px rgba(6,63,107,.2)}.cards{gap:14px}.metric{border-radius:13px;padding:18px;min-height:105px;box-shadow:0 8px 24px rgba(23,56,79,.06);transition:transform .18s ease,box-shadow .18s ease}.metric:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(23,56,79,.1)}.metric-label{font-size:9px;font-weight:700}.metric-value{font-size:27px}.grid-2{gap:16px;margin-top:16px}.panel{border-radius:13px;box-shadow:0 8px 24px rgba(23,56,79,.06);padding:17px}.attention{margin-top:16px}.data-table th{padding:11px 10px}.data-table td{padding:11px 10px}
@media(max-width:1050px){.sidebar{width:210px}.main{margin-left:210px;width:calc(100% - 210px)}}
@media(max-width:700px){.sidebar{width:70px;padding:14px 8px}.brand-logo{height:45px;justify-content:center}.brand-logo>img.security-logo{display:none!important}.brand-logo:before{display:none!important}.brand-logo:after{content:'S';display:block!important;font-size:26px;font-weight:800;color:#fff}.brand-sub{display:none}.nav{padding-top:15px}.nav a{justify-content:center;padding:11px 8px}.nav a.active{box-shadow:none}.main{margin-left:70px;width:calc(100% - 70px)}.top-header{height:58px;padding:0 14px}.content{padding:18px 13px 30px}.profile{padding:5px}.profile .profile-text{display:none}}
`;document.head.appendChild(style);}

export function setupShell(active){applyModernUI();const brandLogo=document.querySelector('.brand-logo');if(brandLogo){brandLogo.innerHTML='';const img=document.createElement('img');img.className='security-logo';img.src='./assets/logo-security-original.svg?v=4';img.alt='Security — Segurança e Serviços';brandLogo.appendChild(img);}document.querySelectorAll('.nav a').forEach(a=>{a.classList.toggle('active',a.dataset.page===active);const icon=a.querySelector('.icon');if(icon)icon.textContent=icons[a.dataset.page]||'';});const btn=$('logoutButton');if(btn)btn.addEventListener('click',async()=>{await supabase.auth.signOut();window.location.href='./index.html';});}

export function badgeStatus(status){const map={aberto:['badge-open','Aberto'],'em andamento':['badge-progress','Em andamento'],concluido:['badge-done','Concluído'],concluída:['badge-done','Concluída'],concluído:['badge-done','Concluído']};const key=String(status||'').toLowerCase();const item=map[key]||['badge-open',status||'Aberto'];return `<span class="badge ${item[0]}">${escapeHtml(item[1])}</span>`;}
export function badgePriority(priority){const p=String(priority||'Média').toLowerCase();const cls=p.includes('crít')||p.includes('crit')?'badge-critical':p.includes('alta')?'badge-high':'badge-medium';return `<span class="badge ${cls}">${escapeHtml(priority||'Média')}</span>`;}
export async function getSolicitacoes(){const{data,error}=await supabase.from('solicitacoes').select('*').order('criado_em',{ascending:false});if(error)throw error;return data||[];}
export async function getClientes(){const{data,error}=await supabase.from('clientes').select('*').order('nome');if(error)throw error;return data||[];}
