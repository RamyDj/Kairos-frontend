import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from '../../styles/Comparaisonstatus.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link'
import Selectedstatus from './Selectedstatus';


function Comparaisonstatus(props) {

    const url = process.env.NEXT_PUBLIC_BACK_ADDRESS
    const search = useSelector((state) => state.search.value);
    const [statut, setStatut] = useState([]);
    


    if (statut.length) {
        console.log(statut[0].status_id.name)
    }

    useEffect(() => {

        let currentSearch = search.length - 1
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
    
    //supprimer les doublons (tableau d'objets)
    const statut3 =  statut2.filter((obj1, i, arr) => 
        arr.findIndex(obj2 => (obj2.status_code === obj1.status_code)) === i) 
         
    console.log(statut3)

    //fonction pour afficher le statut sur lequel on clique
    const select = (i) => {
        let selection = {
            statusCode: statut3[i].status_code,
            presentation: statut3[i].presentation,
            associes: statut3[i].associes,
            capital: statut3[i].registered_capital,
            responsability: statut3[i].responsability,
            taxationBenefits: statut3[i].taxation_of_benefits,
            socialRegime: statut3[i].social_regime,
            taxation: statut3[i].taxation,
            turnover: statut3[i].turnover_max,
            salaries: statut3[i].salaries_max,
            procedures: statut3[i].procedures,
            advantages: statut3[i].advantages,
            disadvantages: statut3[i].disadvantages,
            links: statut3[i].links,
        }

        return props.callStatus(selection)
        
    }


    // si aucun statut n'est renseigné et présent dans le reducer
    if (statut3.length === 0) {
        return (
            <div className={styles.statusContainer}>
                <a>Statuts non renseignés</a>
            </div>
        )
    }


    let iconStyle = { 'color': '#00E000' }
    let iconStyle2 = { 'color': '#CC0000' }

    // si statut ne contient qu'1 index
    if (statut3.length === 1) {
        return (
            <div className={styles.statusContainer}>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th onClick={() => select(0)}>{statut3[0].status_id.name}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nombre d'associés maximum</td>
                            <td>{statut3[0].status_id.associes}</td>
                        </tr>
                        <tr>
                            <td>Capital social minimum</td>
                            <td><FontAwesomeIcon icon={statut3[0].status_id.registered_capital ? faSquareCheck : faXmark} style={statut3[0].status_id.registered_capital ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Etendue de la responsabilité</td>
                            <td>{statut3[0].status_id.responsabitlity}</td>
                        </tr>
                        <tr>
                            <td>Imposition des bénéfices</td>
                            <td>{statut3[0].status_id.taxation_of_benefits}</td>
                        </tr>
                        <tr>
                            <td>Allocations chômage</td>
                            <td><FontAwesomeIcon icon={statut3[0].status_id.unemployement_allocation ? faSquareCheck : faXmark} style={statut3[0].status_id.unemployement_allocation ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Eligible a l'ACRE</td>
                            <td><FontAwesomeIcon icon={statut3[0].status_id.acre ? faSquareCheck : faXmark} style={statut3[0].status_id.acre ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Indemnités journalières</td>
                            <td><FontAwesomeIcon icon={statut3[0].status_id.daily_indemnities ? faSquareCheck : faXmark} style={statut3[0].status_id.daily_indemnities ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Impot libératoire</td>
                            <td><FontAwesomeIcon icon={statut3[0].status_id.discharged_taxes ? faSquareCheck : faXmark} style={statut3[0].status_id.discharged_taxes ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Taux de cotisation</td>
                            <td>{statut3[0].status_id.cotisation_percentage}</td>
                        </tr>
                        <tr>
                            <td>CA max/an</td>
                            <td>{statut3[0].status_id.max_ca}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    //si statut contient 2 index
    if (statut3.length === 2) {
        return (
            <div className={styles.statusContainer}>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th  onClick={() => select(0)}>{statut3[0].status_id.name}</th>
                            <th  onClick={() => select(1)}>{statut3[1].status_id.name}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nombre d'associés maximum</td>
                            <td>{statut3[0].status_id.associes}</td>
                            <td>{statut3[1].status_id.associes}</td>
                        </tr>
                        <tr>
                            <td>Capital social minimum</td>
                            <td><FontAwesomeIcon icon={statut3[0].status_id.registered_capital ? faSquareCheck : faXmark} style={statut3[0].status_id.registered_capital ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut3[1].status_id.registered_capital ? faSquareCheck : faXmark} style={statut3[1].status_id.registered_capital ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Etendue de la responsabilité</td>
                            <td>{statut3[0].status_id.responsabitlity}</td>
                            <td>{statut3[1].status_id.responsabitlity}</td>
                        </tr>
                        <tr>
                            <td>Imposition des bénéfices</td>
                            <td>{statut3[0].status_id.taxation_of_benefits}</td>
                            <td>{statut3[1].status_id.taxation_of_benefits}</td>
                        </tr>
                        <tr>
                            <td>Allocations chômage</td>
                            <td><FontAwesomeIcon icon={statut3[0].status_id.unemployement_allocation ? faSquareCheck : faXmark} style={statut3[0].status_id.unemployement_allocation ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut3[1].status_id.unemployement_allocation ? faSquareCheck : faXmark} style={statut3[1].status_id.unemployement_allocation ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Eligible a l'ACRE</td>
                            <td><FontAwesomeIcon icon={statut3[0].status_id.acre ? faSquareCheck : faXmark} style={statut3[0].status_id.acre ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut3[1].status_id.acre ? faSquareCheck : faXmark} style={statut3[1].status_id.acre ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Indemnités journalières</td>
                            <td><FontAwesomeIcon icon={statut3[0].status_id.daily_indemnities ? faSquareCheck : faXmark} style={statut3[0].status_id.daily_indemnities ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut3[1].status_id.daily_indemnities ? faSquareCheck : faXmark} style={statut3[1].status_id.daily_indemnities ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Impot libératoire</td>
                            <td><FontAwesomeIcon icon={statut3[0].status_id.discharged_taxes ? faSquareCheck : faXmark} style={statut3[0].status_id.discharged_taxes ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut3[1].status_id.discharged_taxes ? faSquareCheck : faXmark} style={statut3[1].status_id.discharged_taxes ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Taux de cotisation</td>
                            <td>{statut3[0].status_id.cotisation_percentage}</td>
                            <td>{statut3[1].status_id.cotisation_percentage}</td>
                        </tr>
                        <tr>
                            <td>CA max/an</td>
                            <td>{statut3[0].status_id.max_ca}</td>
                            <td>{statut3[1].status_id.max_ca}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    // si statut contient 3 index
    if (statut3.length === 3) {
        return (
            <div className={styles.statusContainer}>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th onClick={() => select(0)}>{statut3[0].status_id.name}</th>
                            <th onClick={() => select(1)}>{statut3[1].status_id.name}</th>
                            <th onClick={() => select(2)}>{statut3[2].status_id.name}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nombre d'associés maximum</td>
                            <td>{statut3[0].status_id.associes}</td>
                            <td>{statut3[1].status_id.associes}</td>
                            <td>{statut3[2].status_id.associes}</td>
                        </tr>
                        <tr>
                            <td>Capital social minimum</td>
                            <td><FontAwesomeIcon icon={statut3[0].status_id.registered_capital ? faSquareCheck : faXmark} style={statut3[0].status_id.registered_capital ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut3[1].status_id.registered_capital ? faSquareCheck : faXmark} style={statut3[1].status_id.registered_capital ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut3[2].status_id.registered_capital ? faSquareCheck : faXmark} style={statut3[2].status_id.registered_capital ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Etendue de la responsabilité</td>
                            <td>{statut3[0].status_id.responsabitlity}</td>
                            <td>{statut3[1].status_id.responsabitlity}</td>
                            <td>{statut3[2].status_id.responsabitlity}</td>
                        </tr>
                        <tr>
                            <td>Imposition des bénéfices</td>
                            <td>{statut3[0].status_id.taxation_of_benefits}</td>
                            <td>{statut3[1].status_id.taxation_of_benefits}</td>
                            <td>{statut3[2].status_id.taxation_of_benefits}</td>
                        </tr>
                        <tr>
                            <td>Allocations chômage</td>
                            <td><FontAwesomeIcon icon={statut3[0].status_id.unemployement_allocation ? faSquareCheck : faXmark} style={statut3[0].status_id.unemployement_allocation ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut3[1].status_id.unemployement_allocation ? faSquareCheck : faXmark} style={statut3[1].status_id.unemployement_allocation ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut3[2].status_id.unemployement_allocation ? faSquareCheck : faXmark} style={statut3[2].status_id.unemployement_allocation ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Eligible a l'ACRE</td>
                            <td><FontAwesomeIcon icon={statut3[0].status_id.acre ? faSquareCheck : faXmark} style={statut3[0].status_id.acre ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut3[1].status_id.acre ? faSquareCheck : faXmark} style={statut3[1].status_id.acre ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut3[2].status_id.acre ? faSquareCheck : faXmark} style={statut3[2].status_id.acre ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Indemnités journalières</td>
                            <td><FontAwesomeIcon icon={statut3[0].status_id.daily_indemnities ? faSquareCheck : faXmark} style={statut3[0].status_id.daily_indemnities ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut3[1].status_id.daily_indemnities ? faSquareCheck : faXmark} style={statut3[1].status_id.daily_indemnities ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut3[2].status_id.daily_indemnities ? faSquareCheck : faXmark} style={statut3[2].status_id.daily_indemnities ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Impot libératoire</td>
                            <td><FontAwesomeIcon icon={statut3[0].status_id.discharged_taxes ? faSquareCheck : faXmark} style={statut3[0].status_id.discharged_taxes ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut3[1].status_id.discharged_taxes ? faSquareCheck : faXmark} style={statut3[1].status_id.discharged_taxes ? iconStyle : iconStyle2} className={styles.icon} /></td>
                            <td><FontAwesomeIcon icon={statut3[2].status_id.discharged_taxes ? faSquareCheck : faXmark} style={statut3[2].status_id.discharged_taxes ? iconStyle : iconStyle2} className={styles.icon} /></td>
                        </tr>
                        <tr>
                            <td>Taux de cotisation</td>
                            <td>{statut3[0].status_id.cotisation_percentage}</td>
                            <td>{statut3[1].status_id.cotisation_percentage}</td>
                            <td>{statut3[2].status_id.cotisation_percentage}</td>
                        </tr>
                        <tr>
                            <td>CA max/an</td>
                            <td>{statut3[0].status_id.max_ca}</td>
                            <td>{statut3[1].status_id.max_ca}</td>
                            <td>{statut3[2].status_id.max_ca}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div className={styles.statusContainer}>
        </div>
    );
}

export default Comparaisonstatus;