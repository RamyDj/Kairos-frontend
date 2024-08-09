import { useSelector} from 'react-redux';
import styles from '../../styles/Dashboard.module.css';


function MyProfile(){
    const user = useSelector((state) => state.user.value);
    
    return(
        <div className={styles.MyProfileContainer}>
            <h3>Mon Profil</h3>
            <div className={styles.btnParams}>
                <button>Mes informations</button>
                <button>Déconnexion</button>
            </div>
     </div>
)
}
export default MyProfile;