import { DeleteBook } from '../DeleteBook';
import { BookNotFoundError } from '../../domain/errors';

const setup = () => {
  const book = { id: '123' };
  const mockBookRepository = {
    findById: jest.fn(),
    delete: jest.fn().mockResolvedValueOnce(undefined),
    findByTitle: jest.fn(),
    save: jest.fn(),
    getAllBooks: jest.fn(),
  };

  return {
    book,
    mockBookRepository,
  };
};

describe('DeleteBook', () => {
  test('should delete a book by the provided book ID', async () => {
    // Given
    const { book, mockBookRepository } = setup();
    const SUT = new DeleteBook(mockBookRepository);

    mockBookRepository.findById.mockResolvedValueOnce(book);

    // When
    await SUT.execute(book.id);

    // Then
    expect(mockBookRepository.findById).toHaveBeenCalledWith(book.id);
    expect(mockBookRepository.delete).toHaveBeenCalledWith(book);
  });

  test("should throw an error if the book doesn't exist", async () => {
    // Given
    const { book, mockBookRepository } = setup();
    const SUT = new DeleteBook(mockBookRepository);

    mockBookRepository.findById.mockResolvedValueOnce(undefined);

    // When & Then
    await expect(SUT.execute(book.id)).rejects.toThrow(
      BookNotFoundError.create(book.id),
    );

    expect(mockBookRepository.findById).toHaveBeenCalledWith(book.id);
    expect(mockBookRepository.delete).not.toHaveBeenCalled();
  });
});
