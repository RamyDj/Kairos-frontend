import { useSelector, useDispatch } from 'react-redux';
import { fillWithAllUserSearches } from '../../reducers/search';
import { addIdOfASearch, fillSearchesWithAllId} from '../../reducers/user';
import styles from '../../styles/Result.module.css';
import resultStyles from '../../styles/Result.module.css'; 
import dynamic from 'next/dynamic';
import Graph from '../../components/Result/Graph';
import Show from '../../components/Result/Show';
import Status from '../../components/Result/Status';
import { useEffect } from 'react';



const MapComponent = dynamic(() => import('../../components/Result/MapComponent'), { ssr: false });

function Result() {
    const search = useSelector((state) => state.search.value);
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch()
   
    const url = process.env.NEXT_PUBLIC_BACK_ADDRESS

    console.log(user)
    console.log(search)

useEffect(()=>{
    const i = search.length-1

    // Si un utilisateur arrive sur la page avec un token et une recherche non enregistrée, fetch de la route pour enregistrer celle ci
    
    if (user.token && !search[i]._id)
    {
        fetch(`${url}/results/registerSearch`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({search : search[i], email : user.email })
            })
            .then(response=>response.json())
            .then(data=>{
                dispatch(fillWithAllUserSearches(data.searches))
                dispatch(fillSearchesWithAllId(data.allSearchesId))
            })
    }
},[])

const score = search[0].score.average_ca + search[0].score.average_lifetime + search[0].score.density_of_companies + search[0].score.turnover;
console.log(score)

let scoreStyle;
 
     if (score < 50) {
        scoreStyle = {'color' : '#CF0506'};
    }
    else if (score >= 50 && score < 75) {
        scoreStyle = {'color' : '#FD5C0D'};
    }
    else {
        scoreStyle = {'color' : '#1E8F28'};
    }  

      
    return (
        <div>
            <div className={styles.scoreContainer}>
                <p className={styles.score}
                >Score :<span style={scoreStyle} 
                > {score}/100</span></p>
                <span className={styles.index}
                >Indice de viabilité</span>
            </div>
            <div className={styles.firstResult}>
                <div className={styles.mapResult}>
                    <MapComponent />
                    <span className={styles.companiesNb}
                    > Nombre d'entreprises : {search[0].current_companies.length}</span>
                </div>
                <div className={styles.showResult}>
                    <Show />
                </div>
            </div>

            <div className={styles.detailledResult}>
                <h3>STATUTS DE MA RECHERCHE</h3>
                <div className={styles.allGraphs}>
                
                <div className={styles.graphs}>
                <Graph />
                </div>
                <div className={styles.statusRatio}>
                    <Status/>
                </div>
                </div>
            </div>
        </div>
    )

}
export default Result;