import React from 'react';
import Link from 'next/link';
import styles from './styles.module.css';
import { useRouter } from 'next/router';


const Navbar = () => {
  const router = useRouter();

  const returnBack = () => {
    router.push('/');
  }; 

  return (
    <div className={styles.navbar} >
        <div className={styles.logoWrapper} onClick={returnBack}>
              <div className={styles.brand}>Q'n'A</div>
      </div>
      <div className={styles.links}>
        <Link className={styles.link} href="/">
          All questions
        </Link>
        <Link className={styles.link} href="/signUp">
          Sign Up
        </Link>
        <Link className={styles.link} href="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;