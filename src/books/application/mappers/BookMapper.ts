import { Book } from '../../domain';

export interface BookData {
  id: string;
  title: string;
}

export class BookMapper {
  mapBookToBookData(book: Book): BookData {
    return {
      id: book.id,
      title: book.title,
    };
  }

  mapBooksToBooksData(books: Book[]): BookData[] {
    return books.map((book) => this.mapBookToBookData(book));
  }
}
