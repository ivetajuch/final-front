import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

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
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Sign Up</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default SignUpForm;