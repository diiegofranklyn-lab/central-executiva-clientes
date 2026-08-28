import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Configuração pública do projeto Supabase.
const SUPABASE_URL = 'https://sfbcowfkfvegddjlngcx.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_MSFajbaORb6DXZa3lKBIQw_fZ1RLurS';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
