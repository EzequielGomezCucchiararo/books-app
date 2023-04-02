class BooksRepository {
  constructor(token) {
    this.token = token;
    this.apiUrl = 'http://localhost:4200/api/v1/books';
  }

  async getAll() {
    const response = await fetch(this.apiUrl, {
      headers: {
        Authorization: `Bearer ${this.token}`,
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
        Authorization: `Bearer ${this.token}`,
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
        Authorization: `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to remove book');
    }
  }
}

export default BooksRepository;
