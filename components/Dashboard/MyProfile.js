import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { logout } from '../../reducers/user';
import styles from '../../styles/Dashboard.module.css';


function MyProfile(){
    //Reducer
    const dispatch = useDispatch()

    // Page Redirection 
    const router = useRouter();

    const handleRedirect = () => {
        router.push('/user-information')
    }

    const handleDisconnect = () => {
        dispatch(logout())
        router.push('/')
    }
    
    return(
        <div className={styles.myProfileContainer}>
            <h2>Mon Profil</h2>
            <div className={styles.btnParams}>
                <button onClick={()=>handleRedirect()}>Mes informations</button>
                <button onClick={() => handleDisconnect()}>Déconnexion</button>
            </div>
     </div>
)
}
export default MyProfile;