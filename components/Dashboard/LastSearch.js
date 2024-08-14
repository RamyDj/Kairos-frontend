import { useSelector } from 'react-redux';
import GraphDashboard from './GraphDashboard';
import styles from '../../styles/Dashboard.module.css';


function LastSearch() {
    const user = useSelector((state) => state.user.value);

    return (
        <div className={styles.lastSearchContainer}>
            <GraphDashboard />
            <ul>
                <il>Recherché le <span>06/08/2024</span></il><br/>
                <il>Activité<span>Coiffeur- visagiste</span></il><br/>
                <il>Secteur Geographique<span>Nantes</span></il><br/>
                <il><a href="/">Accéder à ma dernière recherche</a></il>
            </ul>
            <div className={styles.LastSearchLink}>
                
            </div>
            
        </div>

    )
}
export default LastSearch;