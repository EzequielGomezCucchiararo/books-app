export class BookNotFoundError extends Error {
  private constructor(bookID: string) {
    super(`A book with the ID '${bookID}' not found`);
  }

  static create(bookTitle: string) {
    return new BookNotFoundError(bookTitle);
  }
}
