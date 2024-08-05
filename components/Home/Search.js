import styles from '../../styles/Search.module.css';

function Search() {
  return (
    <div className={styles.container}>
        <div className={styles.searchContainer}>
            <p className={styles.text}>“C’est quoi le statut d’auto-entrepeneur? Est ce que j’ai des concurrents?”<br></br>
                <span className={styles.title}>Difficile de se lancer?<br></br>KAIROS est fait pour vous!</span></p>
        </div>
        <div className={styles.formContainer}>
        <div className={styles.form}>
            <div className={styles.activities}>
                <label for="activity">Activité</label>
                <input type='text' id='activity' placeholder='Coiffeur,Boulanger...'></input>
            </div>
            <div className={styles.locations}>
                <label for="location">Secteur Geographique</label>
                <input type='text' id='location' placeholder='France entière,ville, région...'></input>
            </div>
            
        </div>
        <button className={styles.btnSearch} id='btnSearch' >Rechercher</button>
        <img src='/Image_Pasted_at_2024-8-5_14-22-removebg-preview.png' alt='Arrow-Down'/>
        </div>
    </div>
  );
}

export default Search;