import authService from '../auth/AuthService';

class BooksRepository {
  constructor(authService) {
    this.authService = authService;
    this.apiUrl = `http://localhost:8080/api/v1/books`;
  }

  async getAll() {
    const response = await fetch(this.apiUrl, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    return response.json();
  }

  async add(title) {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      throw new Error('Failed to add book');
    }

    return response.json();
  }

  async remove(id) {
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to remove book');
    }
  }

  async update(id, title) {
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      throw new Error('Failed to update the book');
    }

    return response.json();
  }
}

export default new BooksRepository(authService);
