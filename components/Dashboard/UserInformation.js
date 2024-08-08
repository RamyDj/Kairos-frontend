import { useDispatch, useSelector} from 'react-redux';
import { useState,  useEffect } from 'react';
import { userInfo } from '../../reducers/user';
import { Modal, Button } from 'antd';

function UserInformation() {
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingFirstname, setIsEditingFirstname] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);

    const [newEmail, setNewEmail] = useState('');
    const [newName, setNewName] = useState('');
    const [newFirstname, setNewFirstName] = useState('');

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch();
    // const user = useSelector((state) => state.user.value);

    useEffect(() => {
        setNewEmail('gallibour.irene@gmail.com');
        setNewName('test');
        setNewFirstName('test');
    }, []);

    const handleSave = () => {
        if (isEditingEmail) {
            updateEmail(newEmail);
        } else {
            saveChangesToBackend();
        }
    };
    
    const updateEmail = (email) => {
        fetch('/email', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, newEmail: newEmail }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.result) {
                console.log('Email update request sent successfully.');
            } else {
                console.log(data);
            }
        });
    };
    
    const saveChangesToBackend = () => {
        const dataToSend = {};

        if (newName !== user.name) dataToSend.name = newName;
        if (newFirstname !== user.firstname) dataToSend.firstname = newFirstname;
        if (oldPassword && newPassword === confirmPassword) {
            dataToSend.oldPassword = oldPassword;
            dataToSend.newPassword = newPassword;
        }
    
        fetch('/update-user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })
        .then(response => response.json())
        .then(data => {
            if (data.result) {
                console.log(data.message);
            } else {
                console.error(data.error);
            }
        });
    };


    return(
        <div>
            <h2>Mes Informations</h2>
            <div>
                <label>Email</label>
                {isEditingEmail ? (
                <input
                    type="email"
                    name="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                />
                ) : (
                <span>{newEmail}</span>
                )}
                <button onClick={() => setIsEditingEmail(true)}>
                    {isEditingEmail ? 'Annuler' : 'Modifier'}
                </button>
            </div>
      
            <div>
                <label>Nom</label>
                {isEditingName ? (
                <input
                    type="text"
                    name="name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                ) : (
                <span>{newName}</span>
                )}
                <button onClick={() => setIsEditingName(true)}>
                    {isEditingName ? 'Annuler' : 'Modifier'}
                </button>
            </div>
      
            <div>
                <label>Prénom</label>
                {isEditingFirstname ? (
                <input
                    type="text"
                    name="firstName"
                    value={newFirstname}
                    onChange={(e) => setNewFirstName(e.target.value)}
                />
                ) : (
                <span>{newFirstname}</span>
                )}
                <button onClick={() => setIsEditingFirstname(true)}>
                    {isEditingFirstname ? 'Annuler' : 'Modifier'}
                </button>
            </div>

            <div>
                <label>Mot de passe</label>
                {isEditingPassword ? (
                    <div>
                        <input
                            type="password"
                            name="oldPassword"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder='Ancien Mot de passe'
                        />
                        <input
                            type="password"
                            name="oldPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder='Nouveau Mot de passe'
                        />                
                        <input
                            type="password"
                            name="oldPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder='Confirmation Mot de passe'
                        />
                    </div>
                ) : (
                    <span>********</span>
                )}
                <button onClick={() => setIsEditingPassword(true)}>
                {isEditingPassword ? 'Annuler' : 'Modifier'}
                </button>
            </div>

            {isEditingEmail || isEditingName || isEditingFirstname || isEditingPassword ? (
                <button onClick={() => handleSave()}>Sauvegarder</button>
            ) : null}
        </div>
)
}

export default UserInformation;