import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from '../../styles/Dashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link'


function TableStatus() {

    const url = process.env.NEXT_PUBLIC_BACK_ADDRESS
    const user = useSelector((state) => state.user.value);
    const search = useSelector((state) => state.search.value);
    const [statut, setStatut] = useState([]);



    if (statut.length) {
        console.log(statut[0].status_id.name)
    }

    useEffect(() => {


if (!search.length) {
            return
        }

        //console.log(search)
        let currentSearch = search.length - 1
        //console.log(search[currentSearch].status_general)
        if (search[currentSearch] === "Aucune entreprise trouvée pour ce type d'activité dans ce secteur.") {
            return
        }
        let status = search[currentSearch].status_general
        //console.log(status)

        if (!status || status.length === 0) {
            setStatut([]);
            return
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


    }, [search])

    //exclure les cas ou le tableau contient des index dont la valeur est null
    let statut2 = statut.filter((e) => e !== null)
    console.log(statut2)

    //si aucune entreprise ne correspond à la recherche
    if (search[search.length - 1] === "Aucune entreprise trouvée pour ce type d'activité dans ce secteur.") {
        statut2 = []
        return (
            <div className={styles.statusContainer}>
                <a href="/">Aucuns statuts correspondants à votre recherche à afficher</a>
                <a href="/allstatus">Acceder à tous les status</a>
                <Link href="/lastsearches">Accéder à toutes mes recherches</Link>
            </div>
        )
    }

    // s'il n'y a pas de recherche en cours
    if (!search.length) {
        return <div className={styles.statusContainer}><a href="/">Aucune recherche à afficher</a></div>
    }



    // si aucun statut n'est renseigné et présent dans le reducer
    if (statut2.length === 0) {
        return (
            <div className={styles.statusContainer}>
                <a href="/">Statuts non renseignés</a>
            </div>
        )
    }


    let compare = <></>
    let iconStyle = { 'color': '#00E000' }
    let iconStyle2 = { 'color': '#CC0000' }

    // si statut ne contient qu'1 index
    if (statut2.length === 1) {
        return (
            <div className={styles.statusContainer}>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>{statut[0].status_id.name}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nombre d'associés maximum</td>
                            <td>{statut[0].status_id.associes}</td>
                        </tr>
                        <tr>
                            <td>Capital social minimum</td>
                            <td><FontAwesomeIcon icon={statut[0].status_id.registered_capital ? faSquareCheck : faXmark} style={statut[0].status_id.registered_capital ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Etendue de la responsabilité</td>
                            <td>{statut[0].status_id.responsabitlity}</td>
                        </tr>
                        <tr>
                            <td>Imposition des bénéfices</td>
                            <td>{statut[0].status_id.taxation_of_benefits}</td>
                        </tr>
                        <tr>
                            <td>Allocations chômage</td>
                            <td><FontAwesomeIcon icon={statut[0].status_id.unemployement_allocation ? faSquareCheck : faXmark} style={statut[0].status_id.unemployement_allocation ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Eligible a l'ACRE</td>
                            <td><FontAwesomeIcon icon={statut[0].status_id.acre ? faSquareCheck : faXmark} style={statut[0].status_id.acre ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Indemnités journalières</td>
                            <td><FontAwesomeIcon icon={statut[0].status_id.daily_indemnities ? faSquareCheck : faXmark} style={statut[0].status_id.daily_indemnities ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Impot libératoire</td>
                            <td><FontAwesomeIcon icon={statut[0].status_id.discharged_taxes ? faSquareCheck : faXmark} style={statut[0].status_id.discharged_taxes ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Taux de cotisation</td>
                            <td>{statut[0].status_id.cotisation_percentage}</td>
                        </tr>
                        <tr>
                            <td>CA max/an</td>
                            <td>{statut[0].status_id.max_ca}</td>
                        </tr>
                    </tbody>
                </table>
                <a href="/allstatus">Acceder à tous les status</a>
                <Link href="/lastsearches">Accéder à toutes mes recherches</Link>
            </div>
        )
    }

    //si statut contient 2 index
    if (statut2.length === 2) {
        return (
            <div className={styles.statusContainer}>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>{statut[0].status_id.name}</th>
                            <th>{statut[1].status_id.name}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nombre d'associés maximum</td>
                            <td>{statut[0].status_id.associes}</td>
                            <td>{statut[1].status_id.associes}</td>
                        </tr>
                        <tr>
                            <td>Capital social minimum</td>
                            <td><FontAwesomeIcon icon={statut[0].status_id.registered_capital ? faSquareCheck : faXmark} style={statut[0].status_id.registered_capital ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut[1].status_id.registered_capital ? faSquareCheck : faXmark} style={statut[1].status_id.registered_capital ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Etendue de la responsabilité</td>
                            <td>{statut[0].status_id.responsabitlity}</td>
                            <td>{statut[1].status_id.responsabitlity}</td>
                        </tr>
                        <tr>
                            <td>Imposition des bénéfices</td>
                            <td>{statut[0].status_id.taxation_of_benefits}</td>
                            <td>{statut[1].status_id.taxation_of_benefits}</td>
                        </tr>
                        <tr>
                            <td>Allocations chômage</td>
                            <td><FontAwesomeIcon icon={statut[0].status_id.unemployement_allocation ? faSquareCheck : faXmark} style={statut[0].status_id.unemployement_allocation ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut[1].status_id.unemployement_allocation ? faSquareCheck : faXmark} style={statut[1].status_id.unemployement_allocation ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Eligible a l'ACRE</td>
                            <td><FontAwesomeIcon icon={statut[0].status_id.acre ? faSquareCheck : faXmark} style={statut[0].status_id.acre ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut[1].status_id.acre ? faSquareCheck : faXmark} style={statut[1].status_id.acre ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Indemnités journalières</td>
                            <td><FontAwesomeIcon icon={statut[0].status_id.daily_indemnities ? faSquareCheck : faXmark} style={statut[0].status_id.daily_indemnities ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut[1].status_id.daily_indemnities ? faSquareCheck : faXmark} style={statut[1].status_id.daily_indemnities ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Impot libératoire</td>
                            <td><FontAwesomeIcon icon={statut[0].status_id.discharged_taxes ? faSquareCheck : faXmark} style={statut[0].status_id.discharged_taxes ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut[1].status_id.discharged_taxes ? faSquareCheck : faXmark} style={statut[1].status_id.discharged_taxes ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Taux de cotisation</td>
                            <td>{statut[0].status_id.cotisation_percentage}</td>
                            <td>{statut[1].status_id.cotisation_percentage}</td>
                        </tr>
                        <tr>
                            <td>CA max/an</td>
                            <td>{statut[0].status_id.max_ca}</td>
                            <td>{statut[1].status_id.max_ca}</td>
                        </tr>
                    </tbody>
                </table>
                <a href="/allstatus">Acceder à tous les status</a>
                <a href="/lastsearches">Accéder à toutes mes recherches</a>
            </div>
        )
    }

    // si statut contient 3 index
    if (statut2.length === 3) {
        return (
            <div className={styles.statusContainer}>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>{statut[0].status_id.name}</th>
                            <th>{statut[1].status_id.name}</th>
                            <th>{statut[2].status_id.name}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nombre d'associés maximum</td>
                            <td>{statut[0].status_id.associes}</td>
                            <td>{statut[1].status_id.associes}</td>
                            <td>{statut[2].status_id.associes}</td>
                        </tr>
                        <tr>
                            <td>Capital social minimum</td>
                            <td><FontAwesomeIcon icon={statut[0].status_id.registered_capital ? faSquareCheck : faXmark} style={statut[0].status_id.registered_capital ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut[1].status_id.registered_capital ? faSquareCheck : faXmark} style={statut[1].status_id.registered_capital ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut[2].status_id.registered_capital ? faSquareCheck : faXmark} style={statut[2].status_id.registered_capital ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Etendue de la responsabilité</td>
                            <td>{statut[0].status_id.responsabitlity}</td>
                            <td>{statut[1].status_id.responsabitlity}</td>
                            <td>{statut[2].status_id.responsabitlity}</td>
                        </tr>
                        <tr>
                            <td>Imposition des bénéfices</td>
                            <td>{statut[0].status_id.taxation_of_benefits}</td>
                            <td>{statut[1].status_id.taxation_of_benefits}</td>
                            <td>{statut[2].status_id.taxation_of_benefits}</td>
                        </tr>
                        <tr>
                            <td>Allocations chômage</td>
                            <td><FontAwesomeIcon icon={statut[0].status_id.unemployement_allocation ? faSquareCheck : faXmark} style={statut[0].status_id.unemployement_allocation ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut[1].status_id.unemployement_allocation ? faSquareCheck : faXmark} style={statut[1].status_id.unemployement_allocation ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut[2].status_id.unemployement_allocation ? faSquareCheck : faXmark} style={statut[2].status_id.unemployement_allocation ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Eligible a l'ACRE</td>
                            <td><FontAwesomeIcon icon={statut[0].status_id.acre ? faSquareCheck : faXmark} style={statut[0].status_id.acre ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut[1].status_id.acre ? faSquareCheck : faXmark} style={statut[1].status_id.acre ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut[2].status_id.acre ? faSquareCheck : faXmark} style={statut[2].status_id.acre ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Indemnités journalières</td>
                            <td><FontAwesomeIcon icon={statut[0].status_id.daily_indemnities ? faSquareCheck : faXmark} style={statut[0].status_id.daily_indemnities ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut[1].status_id.daily_indemnities ? faSquareCheck : faXmark} style={statut[1].status_id.daily_indemnities ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut[2].status_id.daily_indemnities ? faSquareCheck : faXmark} style={statut[2].status_id.daily_indemnities ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Impot libératoire</td>
                            <td><FontAwesomeIcon icon={statut[0].status_id.discharged_taxes ? faSquareCheck : faXmark} style={statut[0].status_id.discharged_taxes ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut[1].status_id.discharged_taxes ? faSquareCheck : faXmark} style={statut[1].status_id.discharged_taxes ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut[2].status_id.discharged_taxes ? faSquareCheck : faXmark} style={statut[2].status_id.discharged_taxes ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Taux de cotisation</td>
                            <td>{statut[0].status_id.cotisation_percentage}</td>
                            <td>{statut[1].status_id.cotisation_percentage}</td>
                            <td>{statut[2].status_id.cotisation_percentage}</td>
                        </tr>
                        <tr>
                            <td>CA max/an</td>
                            <td>{statut[0].status_id.max_ca}</td>
                            <td>{statut[1].status_id.max_ca}</td>
                            <td>{statut[2].status_id.max_ca}</td>
                        </tr>
                    </tbody>
                </table>
                <a href="/allstatus">Acceder à tous les status</a>
                <a href="/lastsearches">Accéder à toutes mes recherches</a>
            </div>
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
            <a href="/allstatus">Acceder à tous les status</a>
            <a href="/lastsearches">Accéder à toutes mes recherches</a>
        </div>
    );
}

export default TableStatus;
