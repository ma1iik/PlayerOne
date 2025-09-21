const { supabase, supabaseAdmin } = require('../config/supabase');

const SupabaseUser = {
  // Get user profile by ID
  async findById(id) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get user profile by email
  async findByEmail(email) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
    return data;
  },

  // Create user profile
  async create({ id, username, displayName, email }) {
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id,
        username,
        display_name: displayName,
        email
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update user profile
  async update(id, updates) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get user stats (level, experience, coins, gems)
  async getStats(id) {
    const { data, error } = await supabase
      .from('profiles')
      .select('level, experience, coins, gems')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update user stats
  async updateStats(id, stats) {
    const { data, error } = await supabase
      .from('profiles')
      .update(stats)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Add experience and level up if needed
  async addExperience(id, exp) {
    const { data: user, error: fetchError } = await supabase
      .from('profiles')
      .select('experience, level')
      .eq('id', id)
      .single();
    
    if (fetchError) throw fetchError;
    
    const newExp = user.experience + exp;
    const newLevel = Math.floor(newExp / 100) + 1; // 100 exp per level
    
    const { data, error } = await supabase
      .from('profiles')
      .update({
        experience: newExp,
        level: newLevel
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

module.exports = SupabaseUser;
