const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Backend Supabase client (with service role key for admin operations)
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Public Supabase client (with anon key for user operations)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = {
  supabase,
  supabaseAdmin
};
