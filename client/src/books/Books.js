import { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import BooksRepository from './BooksRepository';
import * as sc from './Books.styled';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQyMWYxYmJmLTIyZmMtNDAwOC1iNjM1LTk2NmM2M2NiMGI3YSIsImVtYWlsIjoiZXplZ29jdTJAZ21haWwuY29tIiwiaWF0IjoxNjgwMzY2MzY3fQ.9Fs-Yqcu2I_oJGyDalXAO6xlJ6Lid_S2GBqE0-zFqjc';
const booksRepository = new BooksRepository(token);

const BooksHomePage = () => {
  const [books, setBooks] = useState([]);
  const [newBookTitle, setNewBookTitle] = useState('');

  const handleInputChange = (e) => {
    setNewBookTitle(e.target.value);
  };

  const handleRemoveBook = async (id) => {
    try {
      await booksRepository.remove(id);
      // Remove the book from the local state
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      // Handle the error here
    }
  };

  const handleAddBook = async () => {
    try {
      const newBook = await booksRepository.add(newBookTitle);
      setBooks([...books, newBook]);
      setNewBookTitle('');
    } catch (error) {
      // Handle the error here
    }
  };

  useEffect(() => {
    async function fetchBooks() {
      try {
        const books = await booksRepository.getAll();
        setBooks(books);
      } catch (error) {
        // Handle the error here
      }
    }

    fetchBooks().then();
  }, []);

  return (
    <sc.Container>
      <h1>My Books App</h1>
      <sc.InputContainer>
        <sc.Input
          type="text"
          placeholder="Add a new book"
          value={newBookTitle}
          onChange={handleInputChange}
        />
        <sc.Button onClick={handleAddBook}>Add</sc.Button>
      </sc.InputContainer>
      <sc.List>
        {books.map((book) => (
          <sc.ListItem key={book.id}>
            {book.title}
            <sc.RemoveButton onClick={() => handleRemoveBook(book.id)}>
              <AiOutlineCloseCircle />
            </sc.RemoveButton>
          </sc.ListItem>
        ))}
      </sc.List>
    </sc.Container>
  );
};

export default BooksHomePage;
