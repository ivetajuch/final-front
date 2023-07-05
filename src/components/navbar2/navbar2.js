import React from 'react';
import Link from 'next/link';
import styles from './styles.module.css';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem('jwtToken');
    router.push('/');
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logoWrapper} onClick={() => router.push('/')}>
         <div className={styles.brand}>Q'n'A</div>
      </div>
      <div className={styles.links}>
        <Link className={styles.link} href="/">
          All questions
        </Link>
        <Link className={styles.link} onClick={handleSignOut} href="/" passHref>      
            Sign Out
        </Link>
      </div>
    </div>
  );
};

export default Navbar;