export class DuplicatedBookError extends Error {
  private constructor(title: string) {
    super(`A book with the title '${title}' already exists`);
    Object.setPrototypeOf(this, DuplicatedBookError.prototype);
  }

  static create(bookTitle: string) {
    return new DuplicatedBookError(bookTitle);
  }
}
