const { supabase } = require('../config/supabase');

const SupabaseHabit = {
  // Create a new habit
  async create(habitData) {
    const { data, error } = await supabase
      .from('habits')
      .insert(habitData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get all habits for a user
  async findByUserId(userId) {
    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Get habit by ID
  async findById(id) {
    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update habit
  async update(id, updates) {
    const { data, error } = await supabase
      .from('habits')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete habit
  async delete(id) {
    const { error } = await supabase
      .from('habits')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },

  // Toggle habit completion
  async toggleCompletion(id) {
    const { data: habit, error: fetchError } = await supabase
      .from('habits')
      .select('completed, streak')
      .eq('id', id)
      .single();
    
    if (fetchError) throw fetchError;
    
    const newCompleted = !habit.completed;
    const newStreak = newCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1);
    
    const { data, error } = await supabase
      .from('habits')
      .update({
        completed: newCompleted,
        streak: newStreak
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update habit count (for countable habits)
  async updateCount(id, newCount) {
    const { data, error } = await supabase
      .from('habits')
      .update({ current_count: newCount })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get habits by recurrence
  async findByRecurrence(userId, recurrence) {
    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .eq('user_id', userId)
      .eq('recurrence', recurrence)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};

module.exports = SupabaseHabit;
