import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from './styles.module.css';
import Navbar from '../../components/navbar/navbar';

const SignUpForm = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/signUp', {
        name,
        email,
        password,
      });


      localStorage.setItem('jwtToken', response.data.jwt);
      localStorage.setItem('refreshToken', response.data.refresh);

      setSuccessMessage('Signup successful!');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        router.push('/login'); 
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, router]);

  return (
    <div>
      <Navbar />
  
    <div className={styles.container}>
      <form className={styles.signForm} onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <button className={styles.button} type="submit">Sign Up</button>
      </form>
      {successMessage && <p className={styles.message}>{successMessage}</p>}
    </div>
    </div>
  );
};

export default SignUpForm;