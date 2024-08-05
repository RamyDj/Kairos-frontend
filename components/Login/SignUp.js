import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch} from 'react-redux';
import { login } from '../reducers/user';

import styles from '../styles/SignUp.module.css';

function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false)
    const [passwordFormatError, setPasswordFormatError] = useState(false)

    const url = process.env.NEXT_PUBLIC_BACK_ADDRESS

    //Reducer 
    const dispatch = useDispatch();

    // Page Redirection 
    const router = useRouter();

    //Check to verify the URL of the previous page
    const referrer = router.referrer

    const handleSubmit = () => {
            const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                //const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8}$/; // => Tout décomenter une fois les test ok

            // Reset errors 
            setEmailError(false);
            setPasswordError(false);
                //setPasswordFormatError(false);
        
            // Check if password matches passwordConfirm and validate password format + email 
            if (!EMAIL_REGEX.test(mail)) {
                setEmailError(true)
            }
            /*if (!PASSWORD_REGEX.test(password)) {
                setPasswordFormatError(true);
            }*/
            if (password !== passwordConfirm) {
                setPasswordError(true);
            }
            // If an error is detected, do not send
            if (emailError || passwordError || passwordFormatError) {
                return;
            }
     
            fetch(`${url}/users/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstname: firstName, name: lastName, email: mail, password }),
            }).then(response => response.json())
            .then(data => {
                data.result && dispatch(login({ token: data.token, firstName: data.user.firstname, lastName: data.user.name, email: data.user.email }));

                if (referrer.includes('/result')) {
                    router.push('/result')
                } else {
                    router.push('/dashboard')
                }
            })
      }

    return (
        <div className={styles.container}>
          <h3 className={styles.title}>Inscription</h3>
          <input 
            type="text" 
            className={styles.input} 
            onChange={(e) => setFirstName(e.target.value)} 
            value={firstName} 
            placeholder="Prénom" />
          <input 
            type="text" 
            className={styles.input} 
            onChange={(e) => setLastName(e.target.value)} 
            value={lastName} 
            placeholder="Nom" />
          <input 
            type="email" 
            className={styles.input} 
            onChange={(e) => setMail(e.target.value)} 
            value={mail} 
            placeholder="Adresse mail" />
            {emailError && <p style={{ color: 'red' }}>Email non conforme</p>}

          <input 
            type="password" 
            className={styles.input} 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            placeholder="Mot de passe" />
            {/* {passwordFormatError && <p style={{ color: 'red' }}>Le mot de passe doit contenir 8 caractères, dont au moins une majuscule et un chiffre</p>} */}

          <input 
            type="password" 
            className={styles.input} 
            onChange={(e) => setPasswordConfirm(e.target.value)} 
            value={passwordConfirm} 
            placeholder="Confirmation de mot de passe" />
            {passwordError && <p style={{ color: 'red' }}>La confirmation et le mot de passe doivent être identique</p>}

          <button className={styles.button} onClick={() => handleSubmit()}>Je m'inscris</button>
        </div>
      );
}

export default SignUp;