import { useSelector } from 'react-redux';
import GraphDashboard from './GraphDashboard';
import styles from '../../styles/Dashboard.module.css';
import Link from 'next/link';
const moment = require('moment')

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
    const date = moment(search[i.date]).format('DD-MM-YYYY')
    return (
        <div className={styles.lastSearchContainer}>
            <div className={styles.graphContainer}>
            <GraphDashboard />
            </div>
            <div className={styles.searchDescription}>
                <p>Recherché le : {date}</p>
                <p>Activité : {search[i].activity}</p>
                <p>Secteur Géographique : {search[i].area}</p>
                <Link href="/result/companies"><p className={styles.linkLastSearch}>Accéder à ma dernière recherche</p></Link>
            </div>

            <div className={styles.LastSearchLink}>
                
            </div>
            
        </div>

    )
}
export default LastSearch;