class AuthService {
  constructor() {
    this.tokenKey = '';
    // TODO: Properly pass this as a env var (tricky with server side render)
    this.apiUrl = `http://booksapp-env.eba-edf4augm.eu-west-3.elasticbeanstalk.com/api/v1/auth`;
  }

  setToken(token) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  signout() {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn() {
    const token = this.getToken();
    return !!token;
  }

  async signin({ email, password }) {
    const response = await fetch(`${this.apiUrl}/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Wrong email or password');
      }

      throw new Error('Login failed');
    }

    const { token } = await response.json();

    this.setToken(token);

    return token;
  }

  async signup({ email, password }) {
    const response = await fetch(`${this.apiUrl}/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      if (response.status === 409) {
        throw new Error('Email already used');
      }

      throw new Error('Signup failed');
    }

    const { token } = await response.json();

    this.setToken(token);

    return token;
  }
}

export default new AuthService();
