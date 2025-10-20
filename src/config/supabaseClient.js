const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL dan Key harus diisi di file .env');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;