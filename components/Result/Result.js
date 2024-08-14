import { useSelector, useDispatch } from 'react-redux';
import { fillWithAllUserSearches } from '../../reducers/search';
import { addIdOfASearch, fillSearchesWithAllId } from '../../reducers/user';
import styles from '../../styles/Result.module.css';
import dynamic from 'next/dynamic';
import Graph from '../../components/Result/Graph';
import Show from '../../components/Result/Show';
import Histogram from '../../components/Result/Histogram';
import Comparaisonstatus from '../../components/Result/Comparaisonstatus';
import Selectedstatus from '../../components/Result/Selectedstatus';
import Zoom from '../../components/Result/Zoom';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import { Tooltip } from 'react-tooltip'


const MapComponent = dynamic(() => import('../../components/Result/MapComponent'), { ssr: false });

function Result() {

    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch()
    const url = process.env.NEXT_PUBLIC_BACK_ADDRESS

    // Variable search qui va enregistrer tout le reducer ou juste une recherche si on arrive sur la page avec son id en router.query

    let search
    const router = useRouter()
    const { searchid } = router.query

    const allSearches = useSelector((state) => state.search.value)

    if (searchid !== "companies") {
        search = allSearches.filter(e => e._id == searchid)
    }
    else {
        search = allSearches
    }

    console.log(user)
    console.log(search)


    useEffect(() => {
        const i = allSearches.length - 1

        // Si un utilisateur arrive sur la page avec un token et une recherche non enregistrée, fetch de la route pour enregistrer celle ci

        if (user.token && allSearches[i] !== "Aucune entreprise trouvée pour ce type d'activité dans ce secteur." && !allSearches[i]._id) {
            fetch(`${url}/results/registerSearch`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ search: allSearches[i], email: user.email })
            })
                .then(response => response.json())
                .then(data => {
                    dispatch(fillWithAllUserSearches(data.searches))
                    dispatch(fillSearchesWithAllId(data.allSearchesId))
                })
        }
    }, [])

    const i = search.length - 1

    // Affichage si pas d'entreprise trouvée

    if (search[i] == "Aucune entreprise trouvée pour ce type d'activité dans ce secteur.") {
        return (
            <div className={styles.noResultPage}>
                <h2 className={styles.noResultSentence}>Aucune entreprise trouvée pour ce type d'activité dans ce secteur.</h2>
                <a href='/' > <h3 className={styles.newSearchSentence}>Voulez vous essayer une nouvelle recherche avec une autre zone ?</h3></a>
            </div>
        )
    }

    const score = search[i].score.average_ca + search[i].score.average_lifetime + search[i].score.density_of_companies + search[i].score.turnover;
    console.log(score)

    let scoreStyle;

    if (score < 50) {
        scoreStyle = { 'color': '#CF0506' };
    }
    else if (score >= 50 && score < 75) {
        scoreStyle = { 'color': '#FD5C0D' };
    }
    else {
        scoreStyle = { 'color': '#1E8F28' };
    }

    const histogramData = search[i].top_status.map(status => ({
        status_name: status.status_name,
        companies_per_year: [
            { year: '2022', number: status.companies_per_year[2]?.number || 0 },
            { year: '2023', number: status.companies_per_year[1]?.number || 0 },
            { year: '2024', number: status.companies_per_year[0]?.number || 0 }
        ]
    }));

    let bottomPage
    if (!user.token) {
        bottomPage =
            <div className={styles.details}>
                <p>Connectez-vous pour obtenir plus d’informations sur les statuts, les démarches aini que des comparaisons !</p>
                <Link href="/login">
                    <a className={styles.ad}>Se connecter</a>
                </Link>
            </div>
    }
    if (user.token) {
        bottomPage =
            <div className={styles.detailledResult}>
                <h3>COMPARAISON DES STATUTS</h3>
                <div>
                <Comparaisonstatus/>
                <Zoom/>   
                </div>
                <Selectedstatus/>
            </div>
    }

    return (
        <div className={styles.resultPage}>
            <div className={styles.scoreContainer}>
                <p className={styles.score}
                >Score :<span style={scoreStyle}
                > {score}/100</span></p>
                <span className={styles.index}
                >Indice de viabilité</span>
                <span className={styles.hoverBulle}
                    id='infoBulle'>?</span>
                <Tooltip className={styles.bulle}
                    anchorSelect="#infoBulle" place="right">
                    L'indice de viabilité est calculé en fonction de la saturation du secteur et de l'évolution du chiffre d'affaire moyen.
                </Tooltip>
            </div>
            <div className={styles.firstResult}>
                <div className={styles.mapResult}>
                    <MapComponent />
                    <span className={styles.companiesNb}
                    > Nombre d'entreprises : {search[i].current_companies.length}</span>
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
                </div>
                {bottomPage}
            </div>
        </div>
    )

}
export default Result;