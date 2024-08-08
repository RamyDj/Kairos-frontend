import { useSelector } from 'react-redux';
import styles from '../../styles/Result.module.css';
import PercentageWheel from '../../components/Result/PercentageWheel';

function Status() {
    const company = useSelector((state) => state.search.value);

    return (
        <div className={styles.statusContainer}>
            {company[0].top_status.map((stat, index) => (
                    <div className={styles.StatusComponent} key={index}>
                <PercentageWheel props={stat} />
                <span>{stat.status_name}</span>
            </div>
            ))}
        
           
        </div>
    )

}
export default Status;
