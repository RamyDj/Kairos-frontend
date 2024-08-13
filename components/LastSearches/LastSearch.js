import styles from '../../styles/LastSearches.module.css';
import {useRouter} from 'next/router';

function LastSearch(props) {

    const router = useRouter();

    return (
        <>
        <div className={styles.card}>
        <h3>Activité : </h3>
        <p>{props.activity}</p>
        <h3>Zone géographique : </h3>
        <p>{props.area}</p>
        <h3>recherché le : </h3>
        <p>{props.date}</p>
        <button className={styles.btnView} id='btnView' onClick={()=> router.push(`/result/${props._id}`)}>Afficher la recherche</button>
        </div>
        </>
    )
}

export default LastSearch;