import { useSelector} from 'react-redux';
import styles from '../../styles/Dashboard.module.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../reducers/user';
import { deleteSearches } from '../../reducers/search';

function MyProfile(){
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();

    const handleLogout = () => {        
        dispatch(logout());        
        dispatch(deleteSearches())    
    }; 


    return(
        <div className={styles.myProfileContainer}>
            <h2>Mon Profil</h2>
            <div className={styles.btnParams}>
                <button>Mes informations</button>
                <button onClick={() => handleLogout()}>Déconnexion</button>
            </div>
     </div>
)
}
export default MyProfile;