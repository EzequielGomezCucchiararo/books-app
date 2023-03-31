export class DuplicatedBookError extends Error {
  private constructor(title: string) {
    super(`A book with the title '${title}' already exists`);
  }

  static create(bookTitle: string) {
    return new DuplicatedBookError(bookTitle);
  }
}
