import React, { useState } from 'react';
import styles from '../styles/Login.module.css';

import SignUp from '../SignUp.js';
import SignIn from './SignIn.js';

function Login() {
  return (
    <div className={styles.container}>
        <SignIn />
        <SignUp />
    </div>
  );
}

export default Login;