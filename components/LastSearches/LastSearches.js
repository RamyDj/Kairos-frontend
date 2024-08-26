import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from '../../styles/LastSearches.module.css';
import LastSearch from './LastSearch';
import { useRouter } from 'next/router';

const moment = require('moment');

function LastSearches() {

    const search = useSelector((state) => state.search.value);
    const user = useSelector((state) => state.user.value);
    const router = useRouter();

    if(!user.token) {
        router.push('/')
    }
        

    const cleanSearch = search.filter(e => e  !== "Aucune entreprise trouvée pour ce type d'activité dans ce secteur.")

    console.log(search)
    console.log(cleanSearch)

    if (!search.length) {
        //console.log('empty')
        return
    }
    const lastSearch = cleanSearch.map((data, i) => {
        let date = moment(data.date).format("DD-MM-YYYY")
        //console.log(data._id)
        return <LastSearch key={i} activity={data.activity} area={data.area} date={date} _id={data._id}/>
    })


    return (
        <>
            <div className={styles.AllsearchContainer}>
                <h3 className={styles.searchesListTitle}>Historique de vos recherches</h3>
                <div className={styles.SearchesContainer}>
                    {lastSearch}
                </div>
            </div>
        </>
    )
}

export default LastSearches;