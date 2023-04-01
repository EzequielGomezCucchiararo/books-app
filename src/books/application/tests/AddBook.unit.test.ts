import { AddBook } from '../AddBook';
import { BookFactory } from '../../domain';
import { BookMapper } from '../mappers/BookMapper';
import { DuplicatedBookError } from '../../domain/errors';
import { UuidGenerator } from '../../../shared';

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

describe('AddBook', () => {
  describe('execute', () => {
    test('should throw a DuplicatedBookError if a book with the same title already exists', async () => {
      // Given
      const { bookFactory, bookMapper, mockBookRepository } = setup();
      const title = 'Test Book';
      const existingBook = { id: '1', title };

      (mockBookRepository.findByTitle as jest.Mock).mockResolvedValue([
        existingBook,
      ]);

      // When & Then
      const SUT = new AddBook(bookFactory, mockBookRepository, bookMapper);

      await expect(SUT.execute({ title })).rejects.toThrow(
        DuplicatedBookError.create(title),
      );
    });

    test('should create a new book and save it to the repository if no book with the same title exists', async () => {
      // Given
      const { bookFactory, bookMapper, mockBookRepository } = setup();
      const title = 'Test Book';
      const newBook = { _id: expect.anything(), _title: title };

      (mockBookRepository.findByTitle as jest.Mock).mockResolvedValue([]);

      // When
      const SUT = new AddBook(bookFactory, mockBookRepository, bookMapper);
      const result = await SUT.execute({ title });

      // Then
      expect(mockBookRepository.save).toHaveBeenCalledWith(newBook);
      expect(result).toEqual({ id: newBook._id, title });
    });
  });
});
