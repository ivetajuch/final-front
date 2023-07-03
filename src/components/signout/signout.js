import { useRouter } from 'next/router';

const signOut = () => {
  const router = useRouter();

  localStorage.removeItem('jwtToken');

  router.push('/');
};

export default signOut;