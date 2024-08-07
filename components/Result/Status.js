import { useSelector } from 'react-redux';
import styles from '../../styles/Result.module.css';
import PercentageWheel from '../../components/Result/PercentageWheel';

function Status() {
// Exemple de pourcentage
    const data = {
        percentage: 75, 
      };  
    return (
        <div>
            <div className={styles.StatusComponent}>
            <PercentageWheel props={data} />
                <span>Statut Auto-Entrepreneur</span>
            </div>
           
        </div>
    )

}
export default Status;