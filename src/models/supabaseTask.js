const { supabase } = require('../config/supabase');

const SupabaseTask = {
  // Create a new task
  async create(taskData) {
    const { data, error } = await supabase
      .from('tasks')
      .insert(taskData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get all tasks for a user
  async findByUserId(userId) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Get task by ID
  async findById(id) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update task
  async update(id, updates) {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete task
  async delete(id) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },

  // Get tasks by status
  async findByStatus(userId, status) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .eq('status', status)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Get overdue tasks
  async findOverdue(userId) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .lt('due_date', new Date().toISOString())
      .neq('status', 'completed')
      .order('due_date', { ascending: true });
    
    if (error) throw error;
    return data;
  }
};

module.exports = SupabaseTask;
