import { useSelector } from 'react-redux';
import Graph from '../../components/Result/Graph';
import styles from '../../styles/Dashboard.module.css';
import Link from 'next/link';

function LastSearch() {
    const user = useSelector((state) => state.user.value);

    return (
        <div className={styles.lastSearchContainer}>
            <Graph />
            <ul>
                <il>Recherché le <span>06/08/2024</span></il><br/>
                <il>Activité<span>Coiffeur- visagiste</span></il><br/>
                <il>Secteur Geographique<span>Nantes</span></il><br/>
                <il><Link href="/result/companies">Accéder à ma dernière recherche</Link></il>
            </ul>
            <div className={styles.LastSearchLink}>
                
            </div>
            
        </div>

    )
}
export default LastSearch;