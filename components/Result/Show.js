import { useSelector } from 'react-redux';
import styles from '../../styles/Result.module.css';


function Show() {

    const user = useSelector((state) => state.user.value);
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <span className={styles.entreprise}>Entreprise 1</span><br />
                <span className={styles.ca}>chiffre d'affaire : 17K</span>
            </div>
        </div>
    )

}
export default Show;