import { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import * as sc from './Books.styled';

const BooksHomePage = () => {
  const [books, setBooks] = useState([]);
  const [newBookTitle, setNewBookTitle] = useState('');

  const handleInputChange = (e) => {
    setNewBookTitle(e.target.value);
  };

  const handleRemoveBook = (index) => {
    setBooks((prevBooks) => prevBooks.filter((_, i) => i !== index));
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    setBooks((prevBooks) => [...prevBooks, newBookTitle]);
    setNewBookTitle('');
  };

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
        {books.map((book, index) => (
          <sc.ListItem key={index}>
            {book}
            <sc.RemoveButton onClick={() => handleRemoveBook(index)}>
              <AiOutlineCloseCircle />
            </sc.RemoveButton>
          </sc.ListItem>
        ))}
      </sc.List>
    </sc.Container>
  );
};

export default BooksHomePage;
