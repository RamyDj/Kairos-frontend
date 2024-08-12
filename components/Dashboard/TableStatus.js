import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from '../../styles/Dashboard.module.css';

function TableStatus() {

    const url = process.env.NEXT_PUBLIC_BACK_ADDRESS
    const user = useSelector((state) => state.user.value);
    const search = useSelector((state) => state.search.value);
    const [statut, setStatut] = useState([]);



    useEffect(() => {
        if (!search) {
            return <div className={styles.statusContainer}><a href="/">Aucune recherche à afficher</a></div>
        }

        let currentSearch = search.length - 1
        //console.log(search[currentSearch].status_general)
        let status = search[currentSearch].status_general
        //console.log(status)

        if (status.length === 0) {
            return (
                <div className={styles.statusContainer}>
                    <a href="/">Statuts non renseignés</a>
                </div>
            )
        }

        fetch(`${url}/status/status_infos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _ids: status,
            })
        })
            .then(response => response.json())
            .then(statusData => {
                setStatut(statusData.data)
                //console.log(statusData.data)
            })
    }, [])

    console.log(statut[0].status_id.name)
    // 
    const tableau = statut.map((e, i) => {
        console.log(e)
            // const {name, associes, registered_capital, responsability, taxation_of_benefits, unemployement_allocation, acre, daily_indemnities, discharged_taxes, cotisation_percentage, max_ca} = e.status_id

            return // e = {name, associes, registered_capital, responsability, taxation_of_benefits, unemployement_allocation, acre, daily_indemnities, discharged_taxes, cotisation_percentage, max_ca}
    })
    console.log(tableau)
    let compare = <></>

    if (statut.length === 1) {
        return (
            {compare}
        )
    }

    if (statut.length === 3) {
        return (
            <div className={styles.statusContainer}>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {/* <th>{name1}</th>
                        <th>{statut[1].status_id.name}</th>
                        <th>{statut[2].status_id.name}</th> */}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {/* <td>CA max/an</td>
                        <td>{max_ca1}</td>
                        <td>45K BRUT</td> */}
                    </tr>
                    <tr>
                        <td>Taux de cotisation</td>
                        <td>25%</td>
                        <td>70%</td>
                    </tr>
                    <tr>
                        <td>Indemnités journalières</td>
                        <td>✅</td>
                        <td>❌</td>
                    </tr>
                    <tr>
                        <td>Eligible a l'ACRE</td>
                        <td>✅</td>
                        <td>❌</td>
                    </tr>
                    <tr>
                        <td>Nombre de salariés max</td>
                        <td>❌</td>
                        <td>✅</td>
                    </tr>
                    <tr>
                        <td>Impot libératoire</td>
                        <td>❌</td>
                        <td>✅</td>
                    </tr>
                    <tr>
                        <td>Droits chomage</td>
                        <td>✅</td>
                        <td>❌</td>
                    </tr>
                </tbody>
            </table>
            <a href="/">Acceder à tous les status</a>
            <a href="/">Accéder à toutes mes recherches</a>
        </div>
        )
    }

    if (statut.length === 2) {
        return (
            {compare}
        )
    }

    return (
        <div className={styles.statusContainer}>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Auto-Entrepreneur</th>
                        <th>Travailleur indépendant</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>CA max/an</td>
                        <td>75K BRUT</td>
                        <td>45K BRUT</td>
                    </tr>
                    <tr>
                        <td>Taux de cotisation</td>
                        <td>25%</td>
                        <td>70%</td>
                    </tr>
                    <tr>
                        <td>Indemnités journalières</td>
                        <td>✅</td>
                        <td>❌</td>
                    </tr>
                    <tr>
                        <td>Eligible a l'ACRE</td>
                        <td>✅</td>
                        <td>❌</td>
                    </tr>
                    <tr>
                        <td>Nombre de salariés max</td>
                        <td>❌</td>
                        <td>✅</td>
                    </tr>
                    <tr>
                        <td>Impot libératoire</td>
                        <td>❌</td>
                        <td>✅</td>
                    </tr>
                    <tr>
                        <td>Droits chomage</td>
                        <td>✅</td>
                        <td>❌</td>
                    </tr>
                </tbody>
            </table>
            <a href="/">Acceder à tous les status</a>
            <a href="/">Accéder à toutes mes recherches</a>
        </div>
    );
}

export default TableStatus;
