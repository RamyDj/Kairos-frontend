import { useSelector, useDispatch } from 'react-redux';
import { fillWithAllUserSearches } from '../../reducers/search';
import { addIdOfASearch, fillSearchesWithAllId} from '../../reducers/user';
import styles from '../../styles/Result.module.css';
import dynamic from 'next/dynamic';
import Graph from '../../components/Result/Graph';
import Show from '../../components/Result/Show';
import Histogram from '../../components/Result/Histogram';
import Link from 'next/link';
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
    
    if (user.token && search[i]!=="Aucune entreprise trouvée pour ce type d'activité dans ce secteur." && !search[i]._id)
    {
        fetch(`${url}/results/registerSearch`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({search : search[i], email : user.email })
            })
            .then(response=>response.json())
            .then(data=>{
                if (!data.result){return}
                dispatch(fillWithAllUserSearches(data.searches))
                dispatch(fillSearchesWithAllId(data.allSearchesId))
            })
    }
},[])

let scoreStyle;
 
    if (search[0].score < 50) {
        scoreStyle = { 'color': '#CF0506' };
    }
    else if (search[0].score >= 50 && search.score < 75) {
        scoreStyle = { 'color': '#FD5C0D' };
    }
    else {
        scoreStyle = { 'color': '#1E8F28' };
    }
    const histogramData = search[0].top_status.map(status => ({
        status_name: status.status_name,
        companies_per_year: [
            { year: '2022', number: status.companies_per_year[2]?.number || 0 },
            { year: '2023', number: status.companies_per_year[1]?.number || 0 },
            { year: '2024', number: status.companies_per_year[0]?.number || 0 }
        ]
    }));

    return (
        <div>
            <div className={styles.scoreContainer}>
                <p className={styles.score}
                >Score :<span style={scoreStyle}
                > {search[0].score}/100</span></p>
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
                <h3>DETAILS DE MA RECHERCHE</h3>
                <div className={styles.allGraphs}>
                    <Graph />
                    <Histogram data={histogramData} />
                    <div className={styles.details}>
                        <p>Connectez-vous pour obtenir plus d’informations sur les statuts, les démarches aini que des comparaisons !</p>
                        <Link href="/login">
                        <a className={styles.ad}>Se connecter</a> 
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Result;