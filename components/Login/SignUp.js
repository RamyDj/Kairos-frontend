import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch} from 'react-redux';
import { login } from '../../reducers/user';
import { Modal, Button } from 'antd';

import styles from '../../styles/SignUp.module.css';

function SignUp() {
    const url = process.env.NEXT_PUBLIC_BACK_ADDRESS

    //Form
    const [firstname, setFirstname] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('')

    //Error
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false)
    const [passwordFormatError, setPasswordFormatError] = useState(false)
    const [emailAlreadyUse, setEmailAlreadyUse] = useState(false)

    //Modal
    const [emailCheckModalVisible, setEmailCheckModalVisible] = useState(false);

    const showEmailCheckModal = () => {
      setEmailCheckModalVisible(true);
    }
    const handleOk = () => {
        setEmailCheckModalVisible(false);
    }

    //Reducer 
    const dispatch = useDispatch();

    // Page Redirection 
    const router = useRouter();

    const handleSubmit = () => {
            const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                //const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8}$/; // => Tout décomenter une fois les test ok

            // Reset errors 
            setEmailError(false);
            setPasswordError(false);
            setEmailAlreadyUse(false)
                //setPasswordFormatError(false);
        
            // Check if password matches passwordConfirm and validate password format + email 
            if (!EMAIL_REGEX.test(email)) {
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
            body: JSON.stringify({ firstname, name, email, password }),
            }).then(response => response.json())
            .then(data => {
              if (data.result) {
                showEmailCheckModal();
                dispatch(login({firstname, name, email}))
              } else{
                setEmailAlreadyUse(true)
              }                       
            })
    }

    return (
        <div className={styles.container}>
          <h3 className={styles.title}>Inscription</h3>
          <div className={styles.name}>
            <input 
              type="text" 
              className={styles.inputName} 
              onChange={(e) => setFirstname(e.target.value)} 
              value={firstname} 
              placeholder="Prénom" />
            <input 
              type="text" 
              className={styles.inputName} 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              placeholder="Nom" />
          </div>
          <input 
            type="email" 
            className={styles.input} 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            placeholder="Adresse mail" />
            {emailError && <p className={styles.error}>Email non conforme</p>}
            {emailAlreadyUse && <p className={styles.error}>Email déjà utilisé</p>}

          <input 
            type="password" 
            className={styles.input} 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            placeholder="Mot de passe" />
            {/* {passwordFormatError && <p className={styles.error}>Le mot de passe doit contenir 8 caractères, dont au moins une majuscule et un chiffre</p>} */}

          <input 
            type="password" 
            className={styles.input} 
            onChange={(e) => setPasswordConfirm(e.target.value)} 
            value={passwordConfirm} 
            placeholder="Confirmation de mot de passe" />
            {passwordError && <p className={styles.error}>La confirmation et le mot de passe doivent être identique</p>}

          <button className={styles.button} onClick={() => handleSubmit()}>Je m'inscris</button>

          <Modal
                title="Validation requise"
                open={emailCheckModalVisible}
                centered
                closable={false}
                footer={[
                  <Button key="ok" type="primary" onClick={handleOk}>
                      OK
                  </Button>
              ]}
              
          >
            <p>Vous allez recevoir un email. Veuillez le confirmer avant de continuer.</p>
          </Modal>
        </div>
      );
}

export default SignUp;