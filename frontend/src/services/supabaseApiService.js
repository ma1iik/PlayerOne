import { supabase } from '../config/supabase';

class SupabaseApiService {
  // Get current user session
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  }

  // Get authorization header
  async getAuthHeaders() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('No active session');
    
    return {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json'
    };
  }

  // Tasks API
  async getTasks() {
    const headers = await this.getAuthHeaders();
    const response = await fetch('http://localhost:3001/api/tasks', {
      headers
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    
    return response.json();
  }

  async createTask(taskData) {
    const headers = await this.getAuthHeaders();
    const response = await fetch('http://localhost:3001/api/tasks', {
      method: 'POST',
      headers,
      body: JSON.stringify(taskData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    
    return response.json();
  }

  async updateTask(id, taskData) {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`http://localhost:3001/api/tasks/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(taskData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    
    return response.json();
  }

  async deleteTask(id) {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`http://localhost:3001/api/tasks/${id}`, {
      method: 'DELETE',
      headers
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
    
    return response.json();
  }

  // Habits API
  async getHabits() {
    const headers = await this.getAuthHeaders();
    const response = await fetch('http://localhost:3001/api/habits', {
      headers
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch habits');
    }
    
    return response.json();
  }

  async createHabit(habitData) {
    const headers = await this.getAuthHeaders();
    const response = await fetch('http://localhost:3001/api/habits', {
      method: 'POST',
      headers,
      body: JSON.stringify(habitData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create habit');
    }
    
    return response.json();
  }

  async updateHabit(id, habitData) {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`http://localhost:3001/api/habits/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(habitData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update habit');
    }
    
    return response.json();
  }

  async deleteHabit(id) {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`http://localhost:3001/api/habits/${id}`, {
      method: 'DELETE',
      headers
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete habit');
    }
    
    return response.json();
  }

  async toggleHabit(id) {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`http://localhost:3001/api/habits/${id}/toggle`, {
      method: 'POST',
      headers
    });
    
    if (!response.ok) {
      throw new Error('Failed to toggle habit');
    }
    
    return response.json();
  }

  async updateHabitCount(id, count) {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`http://localhost:3001/api/habits/${id}/count`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ count })
    });
    
    if (!response.ok) {
      throw new Error('Failed to update habit count');
    }
    
    return response.json();
  }

  // Projects API
  async getProjects() {
    const headers = await this.getAuthHeaders();
    const response = await fetch('http://localhost:3001/api/projects', {
      headers
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    
    return response.json();
  }

  async createProject(projectData) {
    const headers = await this.getAuthHeaders();
    const response = await fetch('http://localhost:3001/api/projects', {
      method: 'POST',
      headers,
      body: JSON.stringify(projectData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create project');
    }
    
    return response.json();
  }

  async updateProject(id, projectData) {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`http://localhost:3001/api/projects/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(projectData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update project');
    }
    
    return response.json();
  }

  async deleteProject(id) {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`http://localhost:3001/api/projects/${id}`, {
      method: 'DELETE',
      headers
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete project');
    }
    
    return response.json();
  }

  async updateProjectProgress(id, progress) {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`http://localhost:3001/api/projects/${id}/progress`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ progress })
    });
    
    if (!response.ok) {
      throw new Error('Failed to update project progress');
    }
    
    return response.json();
  }

  // Profile API
  async getProfile() {
    const headers = await this.getAuthHeaders();
    const response = await fetch('http://localhost:3001/api/auth/me', {
      headers
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }
    
    return response.json();
  }

  async updateProfile(profileData) {
    const headers = await this.getAuthHeaders();
    const response = await fetch('http://localhost:3001/api/auth/profile', {
      method: 'PUT',
      headers,
      body: JSON.stringify(profileData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update profile');
    }
    
    return response.json();
  }
}

export default new SupabaseApiService();
