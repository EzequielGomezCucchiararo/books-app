import { useState } from 'react';
import * as sc from './SignUp.styled';
import authService from '../AuthService';

const Signup = ({ onAuthActionCompleted }) => {
  const [authOption, setViewOption] = useState('signup'); // initialize to 'signup'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleViewOptionChange = (event) => {
    setViewOption(event.target.value);
  };

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await authService[authOption](formData);
      onAuthActionCompleted(token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <sc.ToggleContainer>
        <label>
          <input
            type="radio"
            value="signup"
            checked={authOption === 'signup'}
            onChange={handleViewOptionChange}
          />
          Sign up
        </label>
        <label>
          <input
            type="radio"
            value="signin"
            checked={authOption === 'signin'}
            onChange={handleViewOptionChange}
          />
          Sign in
        </label>
      </sc.ToggleContainer>
      <sc.Form onSubmit={handleSubmit}>
        <sc.Label htmlFor="email">Email</sc.Label>
        <sc.Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <sc.Label htmlFor="password">Password</sc.Label>
        <sc.Input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <sc.Button type="submit">Sign up</sc.Button>
      </sc.Form>
    </div>
  );
};

export default Signup;
