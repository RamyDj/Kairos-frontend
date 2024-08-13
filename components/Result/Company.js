import { useSelector } from 'react-redux';
import styles from '../../styles/Company.module.css';



function Company(props) {

  
      
    return (
        <div className={styles.companyContainer}
        >
            <div className={styles.companyName}>
            {props.name}
            </div>
            <div className={styles.companyCA}>
            Chiffre d'affaire : {props.CA}k
            </div>
            
        </div>
    )

}
export default Company;