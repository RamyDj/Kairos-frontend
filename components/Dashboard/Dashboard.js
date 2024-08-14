import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fillWithAllUserSearches, addSearch } from '../../reducers/search';
import styles from '../../styles/Dashboard.module.css';
import MyProfile from "../Dashboard/MyProfile";
import TableStatus from "../Dashboard/TableStatus";
import LastSearch from "../Dashboard/LastSearch";
import Skills from "../Dashboard/Skills";
import SearchInputs from './SearchInputs';


function Dashboard() {
    const user = useSelector((state) => state.user.value);
    const searches = useSelector((state) => state.search.value)
    console.log(searches)
    console.log(user);
    const url = process.env.NEXT_PUBLIC_BACK_ADDRESS
    const dispatch = useDispatch()

    const i = searches.length - 1

    useEffect( ()=>{   
        const func = async () => {
        if (user.token){
        const response = await fetch(`${url}/dashboard/getSearches`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email : user.email })
            })
        const data = await response.json()
            if (!data.result){return}
            else{
                dispatch(fillWithAllUserSearches(data.searches))
                if (searches[i] == "Aucune entreprise trouvée pour ce type d'activité dans ce secteur.") {
                    dispatch(addSearch("Aucune entreprise trouvée pour ce type d'activité dans ce secteur."))
                }
            }
        }
    }
},[])

    if (searches.length == 0) {
        return (
            <div className={styles.dashboardContainer}>
                <div className={styles.col1}>
                    <MyProfile />
                    <Skills />
                </div>
                <div className={styles.col2}>
                    <h2>Ma Dernière recherche</h2>
                    <h4 className={styles.noSearchSentence}>Vous n'avez pas encore fait de recherche. Commencez ci-dessous !</h4>
                    <h2>Nouvelle Recherche</h2>
                    <SearchInputs />
                </div>
                <div className={styles.col3}>
                    <h2>Mes Derniers Statuts</h2>
                    <div className={styles.statusSentenceContainer}>
                        <h4 className={styles.noStatusSentence}>Les statuts de vos prochaines recherches apparaîtront ici.</h4>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.col1}>
                <MyProfile />
                <Skills />
            </div>
            <div className={styles.col2}>
                <h2>Ma Dernière recherche</h2>
                {/* <LastSearch /> */}
                <h2>Nouvelle Recherche</h2>
                <SearchInputs />
            </div>
            <div className={styles.col3}>
                <h2>Mes Derniers Statuts</h2>
                <TableStatus />
            </div>
        </div>
    )
}
export default Dashboard;