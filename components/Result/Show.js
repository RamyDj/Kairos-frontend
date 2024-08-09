import { useSelector } from 'react-redux';
import styles from '../../styles/Result.module.css';


function Show() {

    const company = useSelector((state) => state.search.value);
    if (!company[0].current_companies || company[0].current_companies.length === 0) {
        return <span>Aucune compagnie trouvée</span>;
    }
    return (
        <div className={styles.Showcontainer}>
            {company[0].current_companies.map((comp, index) => (
                <div className={styles.content} key={index}>
                    <span className={styles.entreprise}>{comp.name}</span><br />
                    <span className={styles.ca}>Nombre d'employés : {comp.employees}</span>
                </div>
            ))}
        </div>
    );
}
export default Show;