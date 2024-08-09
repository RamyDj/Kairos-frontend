import { useSelector} from 'react-redux';
import styles from '../../styles/Dashboard.module.css';


function NewSearch(){
    const user = useSelector((state) => state.user.value);
    
    return(
        <div
        className={styles.newSearchContainer}>
  <div className={styles.activities}>
                <label htmlFor="activity">Activité</label>
                <input type='text' id='activity' placeholder='Coiffeur,Boulanger...'  ></input>
            </div>
            <div className={styles.locations}>
                <label htmlFor="location">Secteur Geographique</label>
                <input type='text' id='location' placeholder='France entière,ville, région...'  ></input>
            </div>
            <button className={styles.btnSearch} id='btnSearch' onClick={()=>searchClick()}>Rechercher</button>
  </div>
)
}
export default NewSearch;