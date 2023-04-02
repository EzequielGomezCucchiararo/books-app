import { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import * as sc from './Books.styled';
import booksRepository from './BooksRepository';

const BooksHomePage = ({ onLogout }) => {
  const [message, setMessage] = useState('');
  const [books, setBooks] = useState([]);
  const [newBookTitle, setNewBookTitle] = useState('');

  const handleInputChange = (e) => {
    setNewBookTitle(e.target.value);
  };

  const handleRemoveBook = async (id) => {
    try {
      await booksRepository.remove(id);
      setBooks(books.filter((book) => book.id !== id));
      setMessage('');
    } catch (error) {
      // Handle the error here
      console.log(error);
    }
  };

  const handleAddBook = async () => {
    try {
      const newBook = await booksRepository.add(newBookTitle);
      setBooks([...books, newBook]);
      setNewBookTitle('');
      setMessage('');
    } catch (error) {
      setMessage('Book already in the database');
    }
  };

  useEffect(() => {
    async function fetchBooks() {
      try {
        const books = await booksRepository.getAll();
        setBooks(books);
      } catch (error) {
        // Handle the error here
        console.log(error);
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
      {message && <sc.ErrorMessage>{message}</sc.ErrorMessage>}
    </sc.Container>
  );
};

export default BooksHomePage;
