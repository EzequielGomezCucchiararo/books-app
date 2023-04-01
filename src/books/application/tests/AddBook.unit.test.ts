import { AddBook } from '../AddBook';
import { BookFactory, BookRepository } from '../../domain';
import { BookMapper } from '../mappers/BookMapper';
import { DuplicatedBookError } from '../../domain/errors';
import { UuidGenerator } from '../../../shared';

const setup = () => {
  const uuidGenerator = new UuidGenerator();
  const bookFactory = new BookFactory(uuidGenerator);

  const bookRepository = {
    findByTitle: jest.fn(),
    save: jest.fn(),
  } as unknown as BookRepository;

  const bookMapper = {
    mapBookToBookData: jest.fn(),
  } as unknown as BookMapper;

  return {
    bookFactory,
    bookMapper,
    bookRepository,
  };
};

describe('AddBook', () => {
  describe('execute', () => {
    it('should throw a DuplicatedBookError if a book with the same title already exists', async () => {
      // Given
      const { bookFactory, bookMapper, bookRepository } = setup();
      const title = 'Test Book';
      const existingBook = { id: '1', title };

      (bookRepository.findByTitle as jest.Mock).mockResolvedValue([
        existingBook,
      ]);

      // When & Then
      const SUT = new AddBook(bookFactory, bookRepository, bookMapper);

      await expect(SUT.execute({ title })).rejects.toThrow(
        DuplicatedBookError.create(title),
      );
    });

    it('should create a new book and save it to the repository if no book with the same title exists', async () => {
      // Given
      const { bookFactory, bookMapper, bookRepository } = setup();
      const title = 'Test Book';
      const newBook = { _id: expect.anything(), _title: title };

      (bookRepository.findByTitle as jest.Mock).mockResolvedValue([]);
      (bookMapper.mapBookToBookData as jest.Mock).mockReturnValue({
        id: newBook._id,
        title,
      });

      // When
      const SUT = new AddBook(bookFactory, bookRepository, bookMapper);
      const result = await SUT.execute({ title });

      // Then
      expect(bookRepository.save).toHaveBeenCalledWith(newBook);
      expect(result).toEqual({ id: newBook._id, title });
    });
  });
});
