import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Configuração pública do projeto Supabase ativo.
const SUPABASE_URL = 'https://tfmbkfkkmxrpuzeiford.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_IbExZ3rlfEdxtZN4LYh6Jw_cIPbKKs1';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
