import OneStatut from './OneStatut';
import { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import styles from '../../styles/AllStatus.module.css';
import { useRouter } from 'next/router';

function AllStatus() {
    const url = process.env.NEXT_PUBLIC_BACK_ADDRESS
    const [statusData, setStatutData] = useState([]);

    const user = useSelector((state) => state.user.value);
    const router = useRouter()

    if(!user.token) {
        router.push('/')
    }
        

    useEffect(() => {
        fetch(`${url}/status/status`)
            .then(response => response.json())
            .then(statusdata => {
                setStatutData(statusdata.data)
                //console.log(statusData.data)
            })
    }, []);


    const status = statusData.map((data, i) => {
        return <OneStatut key={i} statusCode={data.status_code} presentation={data.presentation} associes={data.associes} capital={data.registered_capital} responsability={data.responsability} taxationBenefits={data.taxation_of_benefits} socialRegime={data.social_regime} taxation={data.taxation} turnover={data.turnover_max} salaries={data.salaries_max} procedures={data.procedures} advantages={data.advantages} disadvantages={data.disadvantages} links={data.links} />;
    });

    return (
        <>
            <div className={styles.AllstatusContainer}>
            <h2 className={styles.statusListTitle}>Statuts les plus couramment consultés</h2>
                <div className={styles.StatusContainer}>
                    {status}
                </div>
            </div>
        </>
    )
}
export default AllStatus;
