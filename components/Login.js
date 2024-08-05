import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
// import styles from '../styles/Login.module.css';

import SignUp from './SignUp.js';
// import SignIn from './SignIn.js';

function Login() {
  return (
    <div>
        <h1>LOGIN</h1>
        <SignUp />
    </div>
  );
}

export default Login;