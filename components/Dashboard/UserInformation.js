import { useDispatch, useSelector} from 'react-redux';
import { useState,  useEffect } from 'react';
import { logout, userInfo } from '../../reducers/user';
import { useRouter } from 'next/router';
import { Modal, Button } from 'antd';

import styles from '../../styles/UserInformation.module.css';

function UserInformation() {

    const url = process.env.NEXT_PUBLIC_BACK_ADDRESS

    //Verif Mail
    const [emailChangeRequest, setEmailChangeRequest] = useState(false);
    const [verifiedEmail, setVerifiedEmail] = useState(false)

    //User
    const [userEmail, setUserEmail] = useState('')
    const [userFirstname, setUserFirstname] = useState('')
    const [userName, setUserName] = useState('')

    //Affichage Bouton
    const [isEditingEmail, setIsEditingEmail] = useState(false)
    const [isEditingName, setIsEditingName] = useState(false)
    const [isEditingFirstname, setIsEditingFirstname] = useState(false)
    const [isEditingPassword, setIsEditingPassword] = useState(false)

    //ERREUR
    const [passwordError, setPasswordError] = useState(false)  
    const [pwdDifferentError, setPwdDifferentError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordFormatError, setPasswordFormatError] = useState(false)
    const [emailAlreadyUse, setEmailAlreadyUse] = useState(false)

    //Nouveau champs
    const [newEmail, setNewEmail] = useState('')
    const [newName, setNewName] = useState('')
    const [newFirstname, setNewFirstname] = useState('')

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    //Reducer
    const dispatch = useDispatch();
    const userReducer = useSelector((state) => state.user.value);
    // console.log(userReducer)


    // Page Redirection 
    const router = useRouter();

    if(!userReducer.token) {
        router.push('/')
    }
    
    useEffect(() => {
        fetch(`${url}/users/info-user`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token : userReducer.token,}),
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.result) {
                setUserEmail(data.user.email)
                setUserFirstname(data.user.firstname)
                setUserName(data.user.name)

                if (data.user.verified !== verifiedEmail) {
                    setVerifiedEmail(data.user.verified);
                }
            }
        })
    }, [verifiedEmail]);

    //MODAL
    const [emailCheckModalVisible, setEmailCheckModalVisible] = useState(false)
    const [deleteCheckModalVisible, setDeleteCheckModalVisible] = useState(false);
        //email Modal
    const showEmailCheckModal = () => {
        setEmailCheckModalVisible(true);
    }
    const handleOk = () => {
        setEmailCheckModalVisible(false);
    }
        //Delete User Modal
    const showDeleteCheckModal = () => {
        setDeleteCheckModalVisible(true);
    };
    const handleDeleteModalCancel = () => {
        setDeleteCheckModalVisible(false);
    };

    //Delete User
    const handleDelete = () => {
        fetch('http://localhost:3000/users/',{
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token : userReducer.token}),
            }).then(response => response.json())
            .then(data => {
                if(data.result){
                    dispatch(logout())
                    router.push('/delete-confirm')
                }
            })
    };

    //Cancel Action
    const cancelPwdUpdate = () =>{
        setIsEditingPassword(false)
        setNewPassword('')
        setOldPassword('')
        setConfirmPassword('')
        setPasswordError(false)
        setPwdDifferentError(false)
    }
    const cancelEmailUpdate = () => {
        setIsEditingEmail(false)
        setNewEmail('')
        setEmailError(false)
        setEmailAlreadyUse(false)
    }
    const cancelNameUpdate = () =>{
        setIsEditingName(false)
        setNewName('')
    }
    const cancelFirstnameUpdate = () => {
        setIsEditingFirstname(false)
        setNewFirstname('')
    }

    //Save Change
    const handleSave = () => {
        //const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8}$/; // => Tout décomenter une fois les test ok

        // Check if newPassword matches confirmPassword and check format password 

        /*if (!PASSWORD_REGEX.test(password)) {
            setPasswordFormatError(true)
            return
        }*/
           

        if (newPassword !== confirmPassword) {
            setPwdDifferentError(true)
        }

        if(oldPassword ==="" || newPassword==="" || confirmPassword===""){
            setPasswordError(true)
        }

        const data = {
            token : userReducer.token, 

        };
        
        if (newPassword) {
            data.oldPassword = oldPassword;
            data.newPassword = newPassword;
        } 
        else if (newName) {
            data.name = newName
        } 
        else if(newFirstname) {
            data.firstname = newFirstname
        }
        console.log(data)

        fetch(`${url}/users/update-user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.result) {
                dispatch(userInfo({
                    name: data.user.name, 
                    firstname: data.user.firstname,
                    token : data.user.token,
                    email : data.user.email,
                    searches : data.user.searches,
                    skills : data.user.searches,
                }))
                setNewFirstname('')
                setNewName('')
                setNewPassword('')

                setUserFirstname(data.user.firstname)
                setUserName(data.user.name)

                setIsEditingName(false)
                setIsEditingFirstname(false)
            }
        })

    }
    const handleSaveEmail = () => {
        const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!EMAIL_REGEX.test(newEmail) || newEmail==="") {
            setEmailError(true)
            return
        }
        fetch(`${url}/users/update-email`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: userReducer.token, email: newEmail}), 
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (!data.result) {
                setEmailAlreadyUse(true)
            } else{
                setEmailChangeRequest(true);
                setNewEmail('')
                showEmailCheckModal()
            }
        })
    }
    
    return(
        <div className={styles.container}>
            <div className={styles.containerInfo}>
                <h2>Mes Informations</h2>
                <div className={styles.info}>
                    <label className={styles.label}>Email</label>
                    {isEditingEmail && !emailChangeRequest ? (
                    <>
                    <input
                        type="email"
                        name="email"
                        value={newEmail}
                        onChange={(e) => {
                            setNewEmail(e.target.value)
                            setEmailError(false); 
                            setEmailAlreadyUse(false);
                        }}
                        placeholder={userEmail}
                        className={styles.input}
                    />
                    {emailError && <p className={styles.error}>Email non conforme ou vide</p>}
                    {emailAlreadyUse && <p className={styles.error}>Email déjà utilisé</p>}
                    </>) : (
                    <span>{userEmail}</span>
                    )}
                        {emailChangeRequest ? (
                            <p>Une demande de changement d'email est en cours. Veuillez confirmer votre nouvel email.</p>
                        ) : ( 
                        <>
                            {isEditingEmail || 
                                <button className={styles.button} onClick={() => setIsEditingEmail(true)}>
                                    Modifier
                                </button>}
                                {isEditingEmail && (
                                    <div className={styles.editButtons}>
                                        <button className={styles.cancel} onClick={()=> cancelEmailUpdate()}>
                                            Annuler
                                        </button>
                                        <button className={styles.save} onClick={()=>handleSaveEmail()}>
                                            Sauvegarder
                                        </button> 
                                    </div>
                                )}
                            </>
                        )}

                </div>
        
                <div className={styles.info}>
                    <label className={styles.label}>Nom</label>
                    {isEditingName ? (
                    <input
                        type="text"
                        name="name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder={userName}
                        className={styles.input}
                    />
                    ) : (
                    <span>{userName}</span>
                    )}
                        {isEditingName || 
                        <button className={styles.button} onClick={() => setIsEditingName(true)}>
                            Modifier
                        </button>}
                        {isEditingName && (
                            <div className={styles.editButtons}>
                                <button className={styles.cancel} onClick={()=>cancelNameUpdate()}>
                                    Annuler
                                </button>
                                <button className={styles.save} onClick={()=>handleSave()}>
                                    Sauvegarder
                                </button> 
                            </div>
                        )}
                </div>
        
                <div className={styles.info}>
                    <label className={styles.label}>Prénom</label>
                    {isEditingFirstname ? (
                    <input
                        type="text"
                        name="firstName"
                        value={newFirstname}
                        onChange={(e) => setNewFirstname(e.target.value)}
                        placeholder={userFirstname}
                        className={styles.input}
                    />
                    ) : (
                    <span>{userFirstname}</span>
                    )}
                        {isEditingFirstname || 
                        <button className={styles.button} onClick={() => setIsEditingFirstname(true)}>
                            Modifier
                        </button>}
                        {isEditingFirstname && (
                            <div className={styles.editButtons}>
                                <button className={styles.cancel} onClick={()=>cancelFirstnameUpdate()}>
                                    Annuler
                                </button>
                                <button className={styles.save} onClick={()=>handleSave()}>
                                    Sauvegarder
                                </button> 
                            </div>
                        )}
                </div>

                <div className={styles.info}>
                    <label className={styles.label}>Mot de passe</label>
                    {isEditingPassword ? (
                        <div className={styles.mdpContainer}>
                            <input
                                type="password"
                                name="oldPassword"
                                value={oldPassword}
                                onChange={(e) => {
                                    setOldPassword(e.target.value)
                                    setPasswordError(false);
                                    setPwdDifferentError(false);}}
                                placeholder='Ancien Mot de passe'
                                className={styles.input}
                            />
                            <input
                                type="password"
                                name="oldPassword"
                                value={newPassword}
                                onChange={(e) => {
                                    setNewPassword(e.target.value)
                                    setPasswordError(false);
                                    setPwdDifferentError(false);}}
                                placeholder='Nouveau Mot de passe'
                                className={styles.input}
                            />                
                            <input
                                type="password"
                                name="oldPassword"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value)
                                    setPasswordError(false);
                                    setPwdDifferentError(false);
                                }}
                                placeholder='Confirmation Mot de passe'
                                className={styles.input}
                            />
                            {pwdDifferentError && <p className={styles.error}>La confirmation et le mot de passe doivent être identique</p>}
                            {passwordError && <p className={styles.error}>Les 3 champs doivent être remplis</p>}
                        </div>
                    ) : (
                        <span>********</span>
                    )}
                        {isEditingPassword || 
                        <button className={styles.button} onClick={() => setIsEditingPassword(true)}>
                            Modifier
                        </button>}
                        {isEditingPassword && (
                            <div className={styles.editButtons}>
                                <button className={styles.cancel} onClick={()=>cancelPwdUpdate()}>
                                    Annuler
                                </button>
                                <button className={styles.save} onClick={()=>handleSave()}>
                                    Sauvegarder
                                </button> 
                            </div>
                        )}
                </div>
                <div>
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
                 <br/></p>
            </Modal>
            </div>
            </div>
            <div className={styles.containerInfo}>
                <h2>Supprimer mon Compte</h2>
                <button className={styles.button} onClick={()=> showDeleteCheckModal()}>
                    Supprimer
                </button>
                <Modal
                    title="Suppression du compte"
                    open={deleteCheckModalVisible}
                    centered
                    closable={false}
                    footer={[
                    <Button key="ok" type="primary" onClick={()=>handleDelete()}>
                        Supprimer
                    </Button>,
                    <Button key="cancel" onClick={()=>handleDeleteModalCancel()}>
                        Annuler
                    </Button>
                    ]}
                >
                <p>Vous vous vous apprêtez à supprimer votre compte. Continuer?</p>
            </Modal>
            </div>
        </div>
)
}

export default UserInformation;