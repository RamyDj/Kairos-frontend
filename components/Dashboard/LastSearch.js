import { useSelector } from 'react-redux';
import Graph from '../../components/Result/Graph';
import styles from '../../styles/Dashboard.module.css';


function LastSearch() {
    const user = useSelector((state) => state.user.value);

    return (
        <div>
            <ul>
                <li><Graph /></li>
                <li>Recherché le <span>06/08/2024</span></li>
                <li>Activité<span>Coiffeur- visagiste</span></li>
                <li>Secteur Geographique<span>Nantes</span></li>
            </ul>
            <div className={styles.LastSearchLink}>
                <a href="/">Accéder à ma dernière recherche</a>
            </div>
        </div>

    )
}
export default LastSearch;