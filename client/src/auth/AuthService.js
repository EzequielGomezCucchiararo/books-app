class AuthService {
  constructor() {
    this.tokenKey = '';
  }

  setToken(token) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn() {
    const token = this.getToken();
    return !!token;
  }

  async signin({ email, password }) {
    const response = await fetch('http://localhost:4200/api/v1/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const { token } = await response.json();
    this.setToken(token);
  }

  async signup({ email, password }) {
    const response = await fetch('http://localhost:4200/api/v1/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Signup failed');
    }

    const { token } = await response.json();
    this.setToken(token);

    return token;
  }
}

export default new AuthService();
