const API_URL = 'http://localhost:3000/api';

class AuthService {
  constructor() {
    this.accessToken = localStorage.getItem('accessToken');
    this.refreshPromise = null;
    this.rememberMe = localStorage.getItem('rememberMe') === 'true';
  }

  async login(email, password, remember = false) {
    try {
      const response = await fetch(`${API_URL}/auth/local`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
      }

      const data = await response.json();
      this.setToken(data.accessToken);
      this.setRememberMe(remember);
      
      if (remember) {
        localStorage.setItem('savedEmail', email);
      } else {
        localStorage.removeItem('savedEmail');
      }
      
      return data.user;
    } catch (error) {
      throw error;
    }
  }

  async register(username, email, password, remember = false) {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Registration failed');
      }

      const data = await response.json();
      this.setToken(data.accessToken);
      this.setRememberMe(remember);
      
      if (remember) {
        localStorage.setItem('savedEmail', email);
      }
      
      return data.user;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      this.clearToken();
      
      if (!this.rememberMe) {
        localStorage.removeItem('savedEmail');
      }
    } catch (error) {
      this.clearToken();
      throw error;
    }
  }

  async refreshToken() {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${API_URL}/auth/refresh-token`, {
          method: 'POST',
          credentials: 'include',
        });

        if (!response.ok) {
          const error = await response.json();
          this.clearToken();
          reject(new Error(error.error || 'Failed to refresh token'));
          return;
        }

        const data = await response.json();
        this.setToken(data.accessToken);
        resolve(data.accessToken);
      } catch (error) {
        this.clearToken();
        reject(error);
      } finally {
        this.refreshPromise = null;
      }
    });

    return this.refreshPromise;
  }

  async authFetch(url, options = {}) {
    if (!this.getToken()) {
      try {
        await this.refreshToken();
      } catch (error) {
        throw new Error('Authentication required');
      }
    }

    const requestOptions = {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${this.getToken()}`,
      },
    };

    try {
      let response = await fetch(url, requestOptions);

      if (response.status === 401 || response.status === 403) {
        try {
          await this.refreshToken();
          requestOptions.headers.Authorization = `Bearer ${this.getToken()}`;
          response = await fetch(url, requestOptions);
        } catch (refreshError) {
          throw new Error('Session expired. Please login again.');
        }
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  setToken(token) {
    this.accessToken = token;
    localStorage.setItem('accessToken', token);
  }

  getToken() {
    if (!this.accessToken) {
      this.accessToken = localStorage.getItem('accessToken');
    }
    return this.accessToken;
  }

  clearToken() {
    this.accessToken = null;
    localStorage.removeItem('accessToken');
  }
  
  setRememberMe(value) {
    this.rememberMe = value;
    localStorage.setItem('rememberMe', value);
  }
  
  getSavedEmail() {
    return localStorage.getItem('savedEmail') || '';
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  isTokenExpired() {
    const token = this.getToken();
    if (!token) return true;
    
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  }
}

export default new AuthService();