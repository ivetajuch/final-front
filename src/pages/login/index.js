import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './styles.module.css';
import Navbar from '@/components/navbar/navbar';

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
    <div>
      <Navbar/>
    <div className={styles.container}>
    <form className={styles.loginForm} onSubmit={handleSubmit}>
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
      <button className={styles.button} type="submit">Login</button>
      {successMessage && <p className={styles.message}>{successMessage}</p>}
    </form>
    </div>
    </div>
  );
};

export default LoginForm;