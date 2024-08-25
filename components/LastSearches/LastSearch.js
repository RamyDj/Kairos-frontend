import styles from '../../styles/LastSearches.module.css';
import {useRouter} from 'next/router';

function LastSearch(props) {

    const router = useRouter();

    return (
        <>
        <div className={styles.card}>
        <p>Activité : </p>
        <h3>{props.activity}</h3>
        <p>Commune : </p>
        <h3>{props.area}</h3>
        <p>recherché le : </p>
        <h3>{props.date}</h3>
        <button className={styles.btnView} id='btnView' onClick={()=> router.push(`/result/${props._id}`)}>Afficher la recherche</button>
        </div>
        </>
    )
}

export default LastSearch;