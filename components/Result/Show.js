import { useSelector } from 'react-redux';
import styles from '../../styles/Result.module.css';


function Show() {

    const company = useSelector((state) => state.search.value);
    console.log(company[0].current_companies.name);
    if (!company[0].current_companies || company[0].current_companies.length === 0) {
        return <span>Aucune compagnie trouvée</span>;
    }

    
    return (
        <div className={styles.Showcontainer}>
            {company[0].current_companies.map((comp, index) => (

                    <div className={styles.content} key={index}>
                        <span className={styles.entreprise}>{comp.name}</span><br />
                        <span className={styles.ca}>Chiffre d'affaires : {comp.ca} M€</span>
                    </div>
            ))}
        </div>
    );
}
export default Show;
