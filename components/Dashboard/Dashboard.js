import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fillWithAllUserSearches } from '../../reducers/search';
import styles from '../../styles/Dashboard.module.css';
import MyProfile from "../Dashboard/MyProfile";
import TableStatus from "../Dashboard/TableStatus";
import NewSearch from "../Dashboard/NewSearch";
import LastSearch from "../Dashboard/LastSearch";
import Skills from "../Dashboard/Skills";


function Dashboard() {
    const user = useSelector((state) => state.user.value);
    const searches = useSelector((state)=>state.search.value)
    console.log(searches)
    console.log(user);
    const url = process.env.NEXT_PUBLIC_BACK_ADDRESS
    const dispatch = useDispatch()

    useEffect(()=>{
        if (user.token){
        fetch(`${url}/dashboard/getSearches`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email : user.email })
            })
        .then(response=>response.json())
        .then(data=>{
            if (!data.result){return}
            else{
                dispatch(fillWithAllUserSearches(data.searches))
            }
        })
        }
    },[])

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
                <NewSearch />
            </div>
            <div className={styles.col3}>
            <h2>Mes Derniers Statuts</h2>
                <TableStatus />
            </div>
        </div>
    )
}
export default Dashboard;