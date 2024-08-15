import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { userInfo } from '../../reducers/user';
import { Modal, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'

import styles from '../../styles/SignUp.module.css';

function SignUp() {
    const url = process.env.NEXT_PUBLIC_BACK_ADDRESS

    //Form
    const [firstname, setFirstname] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [inputType, setInputType] = useState("password")
    const [inputConfirmType, setInputConfirmType] = useState("password")

    //Error
    const [passwordError, setPasswordError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    // const [passwordFormatError, setPasswordFormatError] = useState(false)
    const [emailAlreadyUse, setEmailAlreadyUse] = useState(false)
    const [fieldRequired, setFieldRequired] = useState(false)

    //Modal
    const [emailCheckModalVisible, setEmailCheckModalVisible] = useState(false)

    const showEmailCheckModal = () => {
      setEmailCheckModalVisible(true);
    }
    const handleOk = () => {
        setEmailCheckModalVisible(false);
    }

    //Reducer 
    const dispatch = useDispatch();

    const handleSubmit = () => {
      const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8}$/;
  
      // Reset errors 
      setEmailError(false);
      setPasswordError(false);
      setEmailAlreadyUse(false);
      setFieldRequired(false);
      // setPasswordFormatError(false);
  
      // Check for errors
      let hasErrors = false;
  
      // Check required 
      if (firstname === '' || name === '' ){
          setFieldRequired(true);
          hasErrors = true;
      }
  
      // Check email format & require
      if (!EMAIL_REGEX.test(email) || email ==='') {
          setEmailError(true);
          hasErrors = true;
      }
  
      // Check if passwords match & required
      if (password !== passwordConfirm || password ==="" || passwordConfirm ==="") {
          setPasswordError(true);
          hasErrors = true;
      }
  
      // if (!PASSWORD_REGEX.test(password)) {
      //     setPasswordFormatError(true);
      //     hasErrors = true;
      // }
  
      // If there are any errors, don't proceed with fetch
      if (hasErrors) {
          return;
      }
  
      // No errors, proceed with fetch
      fetch(`${url}/users/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ firstname, name, email, password }),
      })
      .then(response => response.json())
      .then(data => {
          if (data.result) {
              showEmailCheckModal();
              dispatch(userInfo({ 
                firstname: data.user.firstname, 
                name: data.user.name, 
                email: data.user.email }));
          } else {
              setEmailAlreadyUse(true);
          }                       
    })
    }
  
    const showPassword = () => {
      if (inputType === "password") {
          setInputType("text")
      }
      else {setInputType("password")}
    }

    const showPasswordConfirm = () => {
      if (inputConfirmType === "password") {
          setInputConfirmType("text")
      }
      else {setInputConfirmType("password")}
    }

    return (
        <div className={styles.container}>
          <h3 className={styles.title}>Inscription</h3>
          <div className={styles.name}>
            <input 
              type="text" 
              className={styles.inputName} 
              onChange={(e) => {
                setFirstname(e.target.value)
                setFieldRequired(false)
              }} 
              value={firstname} 
              placeholder="Prénom" />
            <input 
              type="text" 
              className={styles.inputName} 
              onChange={(e) => {
                setName(e.target.value)
                setFieldRequired(false)
              }} 
              value={name} 
              placeholder="Nom" />
          </div>
          {fieldRequired && <p className={styles.error}>Champs obligatoire</p>}
          <input 
            type="email" 
            className={styles.input} 
            onChange={(e) => {
              setEmail(e.target.value)
              setEmailError(false)
              setEmailAlreadyUse(false)
            }} 
            value={email} 
            placeholder="Adresse mail" />
            {emailError && <p className={styles.error}>Email non conforme</p>}
            {emailAlreadyUse && <p className={styles.error}>Email déjà utilisé</p>}

          <div className={styles.pwdInputContainer}>
          <input 
            type={inputType} 
            className={styles.pwdInput} 
            onChange={(e) => {
              setPassword(e.target.value)
              // setPasswordFormatError(false)
              setPasswordError(false)
            }} 
            value={password} 
            placeholder="Mot de passe" />
            {/* {passwordFormatError && <p className={styles.error}>Le mot de passe doit contenir 8 caractères, dont au moins une majuscule et un chiffre</p>} */}
            { inputType === "password" ? (
                <FontAwesomeIcon className={styles.eyeIcon}
                 icon={faEye} onClick={() => showPassword()}/>) : (
                <FontAwesomeIcon className={styles.eyeIcon} icon={faEyeSlash} onClick={() => showPassword()} />
                )
            }
            
          <input 
            type={inputConfirmType} 
            className={styles.pwdInput} 
            onChange={(e) => {
              setPasswordConfirm(e.target.value)
              setPasswordError(false)
            }} 
            value={passwordConfirm} 
            placeholder="Confirmer le mot de passe" />
            { inputConfirmType === "password" ? (
                <FontAwesomeIcon className={styles.eyeIcon}
                 icon={faEye} onClick={() => showPasswordConfirm()}/>) : (
                <FontAwesomeIcon className={styles.eyeIcon} icon={faEyeSlash} onClick={() => showPasswordConfirm()} />
                )
            }
          </div>
            {passwordError && <p className={styles.error}>La confirmation et le mot de passe doivent être identique</p>}
          <button className={styles.button} onClick={() => handleSubmit()}>Je m'inscris</button>

          <Modal
                title="Validation requise"
                open={emailCheckModalVisible}
                centered
                closable={false}
                footer={[
                  <Button key="ok" type="primary" onClick={()=> handleOk()}>
                      OK
                  </Button>
              ]}
              
          >
            <p>Vous allez recevoir un email avec un lien de confirmation. Vérifiez vos courriers indésirables.<br/>
            Vous disposez d'1h pour le valider. <br/>
            Une fois confirmé, vous pourrez accéder à votre espace. <br/></p>
          </Modal>
        </div>
    )
}

export default SignUp;