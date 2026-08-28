import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// URL do projeto Supabase já identificado no seu projeto.
const SUPABASE_URL = 'https://sfbocwfkve...supabase.co';
// Cole aqui a chave pública (anon/publishable key) do Supabase.
const SUPABASE_ANON_KEY = 'COLE_SUA_CHAVE_PUBLICA_AQUI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
