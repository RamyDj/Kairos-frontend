import { useSelector } from 'react-redux';
import GraphDashboard from './GraphDashboard';
import styles from '../../styles/Dashboard.module.css';


function LastSearch() {
    const user = useSelector((state) => state.user.value);
    const search = useSelector((state)=>state.search.value)

    const i = search.length-1

    if (search[i]== "Aucune entreprise trouvée pour ce type d'activité dans ce secteur."){
        return (
            <div>
                <h4 className={styles.noResultSentence}>Aucune entreprise trouvée pour votre dernière recherche.</h4>
            </div>
        )
    }

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