// frontend/src/services/apiService.js

import authService from './authService';

const API_URL = 'http://localhost:3000/api';

class ApiService {
  // Get user profile
  async getProfile() {
    const response = await authService.authFetch(`${API_URL}/profile`);
    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }
    return response.json();
  }

  // Get tasks
  async getTasks() {
    const response = await authService.authFetch(`${API_URL}/tasks`);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return response.json();
  }

  // Create a new task
  async createTask(taskData) {
    const response = await authService.authFetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    return response.json();
  }

  // Update a task
  async updateTask(taskId, taskData) {
    const response = await authService.authFetch(`${API_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    return response.json();
  }

  // Delete a task
  async deleteTask(taskId) {
    const response = await authService.authFetch(`${API_URL}/tasks/${taskId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
    return response.json();
  }

  // Similar methods can be added for habits, projects, etc.
  // ...
}

export default new ApiService();