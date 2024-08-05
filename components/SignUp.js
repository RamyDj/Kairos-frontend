import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';

import styles from '../styles/SignUp.module.css';

function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [passwordError, setPasswordError] = useState(false);

    const url = process.env.NEXT_PUBLIC_BACK_ADRESS

    //Reducer 
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    const handleSubmit = () => {
        if(password === passwordConfirm) {
            fetch(`${url}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, mail, passwordConfirm }),
            }).then(response => response.json())
            .then(data => {
                data.result && dispatch();
            })
        }else{
            setPasswordError(true)
        }
      };


    return (
        <div className={styles.container}>
          <h3 className={styles.title}>Inscription</h3>
          <input type="text" className={styles.input} onChange={(e) => setFirstName(e.target.value)} value={firstName} placeholder="Nom" />
          <input type="text" className={styles.input} onChange={(e) => setLastName(e.target.value)} value={lastName} placeholder="Prenom" />
          <input type="email" className={styles.input} onChange={(e) => setMail(e.target.value)} value={mail} placeholder="Adresse mail" />
          <input type="password" className={styles.input} onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Mot de passe" />
            {passwordError && <p style={{ color: 'red' }}>Mot de passe différent</p>}
          <input type="password" className={styles.input} onChange={(e) => setPasswordConfirm(e.target.value)} value={passwordConfirm} placeholder="Confirmation de mot de passe" />
            {passwordError && <p style={{ color: 'red' }}>Mot de passe différent</p>}
          <button className={styles.button} onClick={() => handleSubmit()}>Je me connecte</button>
        </div>
      );
}

export default SignUp;