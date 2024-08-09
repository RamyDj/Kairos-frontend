import { useSelector } from 'react-redux';
import styles from '../../styles/Result.module.css';
import dynamic from 'next/dynamic';
import Graph from '../../components/Result/Graph';
import Show from '../../components/Result/Show';
import Status from '../../components/Result/Status';



const MapComponent = dynamic(() => import('../../components/Result/MapComponent'), { ssr: false });

function Result() {
    const company = useSelector((state) => state.search.value);
    const user = useSelector((state) => state.user.value);
    console.log(company)
  
      
    return (
        <div>
            <div className={styles.scoreContainer}>
                <p className={styles.score}
                >Score :<span> 20/100</span></p>
                <span className={styles.index}
                >Indice de viabilité</span>
            </div>
            <div className={styles.firstResult}>
                <div className={styles.mapResult}>
                    <MapComponent />
                    <span> Nombre d'entreprise : {company[0].current_companies.length}</span>
                </div>
                <div className={styles.showResult}>
                    <Show />
                </div>
            </div>

            <div className={styles.detailledResult}>
                <h3>STATUTS DE MA RECHERCHE</h3>
                <div className={styles.graph}>
                <Graph />
                </div>
                <div className={styles.statusRatio}>
                    <Status/>
                </div>
            </div>
        </div>
    )

}
export default Result;