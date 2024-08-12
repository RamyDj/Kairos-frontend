import { useSelector } from 'react-redux';
import styles from '../../styles/Result.module.css';
import PercentageWheel from '../../components/Result/PercentageWheel';

function Status() {
    const search = useSelector((state) => state.search.value);

    return (
        <div className={styles.statusContainer}>
            {search[0].top_status.map((stat, index) => (
                    <div className={styles.statusComponent} key={index}>
                <PercentageWheel props={stat} />
                <span className={styles.statusName}
                >{stat.status_name}</span>
            </div>
            ))}
        
           
        </div>
    )

}
export default Status;
