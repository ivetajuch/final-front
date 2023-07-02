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
        <img src="https://e7.pngegg.com/pngimages/312/1018/png-clipart-orange-blue-and-black-logo-logo-circle-technology-circle-blue-text.png" 
        alt="Logo" 
        className={styles.logo}
         />
      <div className={styles.brand}>Trip'n</div>
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