import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/login', {
        email,
        password,
      });

      localStorage.setItem('jwtToken', response.data.jwt);
      localStorage.setItem('refreshToken', response.data.refresh);

      setSuccessMessage('Login successful');

      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
       console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit">Login</button>
      {successMessage && <p>{successMessage}</p>}
    </form>
  );
};

export default LoginForm;