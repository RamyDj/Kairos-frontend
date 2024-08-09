import { useSelector } from 'react-redux';
import Graph from '../../components/Result/Graph';
import styles from '../../styles/Dashboard.module.css';


function LastSearch() {
    const user = useSelector((state) => state.user.value);

    return (
        <div className={styles.lastSearchContainer}>
            <ul>
                <il><Graph /></il>
                <il>Recherché le <span>06/08/2024</span></il>
                <il>Activité<span>Coiffeur- visagiste</span></il>
                <il>Secteur Geographique<span>Nantes</span></il>
            </ul>
            <div className={styles.LastSearchLink}>
                <a href="/">Accéder à ma dernière recherche</a>
            </div>
            
        </div>

    )
}
export default LastSearch;