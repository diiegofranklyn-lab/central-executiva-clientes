import { supabase } from './supabase.js';

const form = document.querySelector('#loginForm');
const button = document.querySelector('#loginButton');
const message = document.querySelector('#loginMessage');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  message.textContent = '';
  button.disabled = true;
  button.textContent = 'Entrando...';

  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    message.textContent = error.message === 'Invalid login credentials'
      ? 'E-mail ou senha inválidos.'
      : error.message;
    button.disabled = false;
    button.textContent = 'Entrar';
    return;
  }

  if (!data.user) {
    message.textContent = 'Não foi possível identificar o usuário.';
    button.disabled = false;
    button.textContent = 'Entrar';
    return;
  }

  window.location.href = './painel.html';
});
