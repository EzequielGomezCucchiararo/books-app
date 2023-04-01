import { UuidGenerator } from '../../../shared';
import { Book, BookFactory } from '../../domain';
import { BookMapper } from '../mappers/BookMapper';
import { UpdateBook, UpdateBookPayload } from '../UpdateBook';
import { BookNotFoundError } from '../../domain/errors';

const setup = () => {
  const uuidGenerator = new UuidGenerator();
  const bookFactory = new BookFactory(uuidGenerator);
  const bookMapper = new BookMapper();

  const mockBookRepository = {
    findById: jest.fn(),
    delete: jest.fn(),
    findByTitle: jest.fn(),
    save: jest.fn(),
    getAllBooks: jest.fn(),
  };

  return {
    bookFactory,
    bookMapper,
    mockBookRepository,
  };
};

describe('UpdateBook', () => {
  describe('execute', () => {
    it('should update the book and return the updated book data', async () => {
      // Given
      const { bookFactory, bookMapper, mockBookRepository } = setup();
      const bookId = '1';
      const existingBook = new Book({ id: bookId, title: 'Book 1' });
      const updatedBook = new Book({ id: bookId, title: 'Updated Book 1' });
      const updatedBookData: UpdateBookPayload = {
        id: bookId,
        title: 'Updated Book 1',
      };
      const SUT = new UpdateBook(bookFactory, mockBookRepository, bookMapper);

      mockBookRepository.findById.mockResolvedValue(existingBook);

      // When
      const result = await SUT.execute(bookId, updatedBookData);

      // Then
      expect(mockBookRepository.save).toHaveBeenCalledWith(updatedBook);
      expect(result).toEqual(updatedBookData);
    });

    it('should throw BookNotFoundError if the book does not exist', async () => {
      // Given
      const { bookFactory, bookMapper, mockBookRepository } = setup();
      const bookId = '1';
      const updatedBookData: UpdateBookPayload = {
        id: bookId,
        title: 'Updated Book 1',
      };
      const SUT = new UpdateBook(bookFactory, mockBookRepository, bookMapper);

      mockBookRepository.findById.mockResolvedValue(undefined);

      // When & Then
      await expect(SUT.execute(bookId, updatedBookData)).rejects.toThrow(
        BookNotFoundError.create(bookId),
      );
    });
  });
});
