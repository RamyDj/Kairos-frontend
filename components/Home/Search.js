import styles from '../../styles/Search.module.css';
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { addSearch } from '../../reducers/search';
import { convertStringApeToCode } from '../../modules/convertingFunctions';
import {AutoComplete} from 'antd'

function Search() {
    const [activityTypped, setActivityTypped] = useState('')
    const [locationTypped, setLocationTypped] = useState('')

    const url = process.env.NEXT_PUBLIC_BACK_ADDRESS

    const dispatch = useDispatch()

    const searchClick = ()=>{
        const codeApe = convertStringApeToCode(activityTypped)
        const locationWithoutSpace = locationTypped.replace(/ /g, '-')
        fetch(`${url}/searches/newSearch/${locationWithoutSpace}/${codeApe}`)
        .then(response=>response.json())
        .then(data=> {
            console.log(data)
            dispatch(addSearch(data.result))

        })
    }

  return (
    <div className={styles.container}>
        <div className={styles.searchContainer}>
            <p className={styles.text}>“C’est quoi le statut d’auto-entrepeneur? Est ce que j’ai des concurrents?”<br></br>
                <span className={styles.title}>Difficile de se lancer?<br></br>KAIROS est fait pour vous!</span></p>
        </div>
        <div className={styles.formContainer}>
        <div className={styles.form}>
            <div className={styles.activities}>
                <label HTMLFor="activity">Activité</label>
                <input type='text' id='activity' placeholder='Coiffeur,Boulanger...' onChange={(e)=>setActivityTypped(e.target.value)} value={activityTypped}></input>
            </div>
            <div className={styles.locations}>
                <label htmlFor="location">Secteur Geographique</label>
                <input type='text' id='location' placeholder='France entière,ville, région...' onChange={(e)=>setLocationTypped(e.target.value)} value={locationTypped}></input>
            </div>
            
        </div>
        <button className={styles.btnSearch} id='btnSearch' onClick={()=>searchClick()}>Rechercher</button>
        <img src='/Image_Pasted_at_2024-8-5_14-22-removebg-preview.png' alt='Arrow-Down'/>
        </div>
    </div>
  );
}

export default Search;