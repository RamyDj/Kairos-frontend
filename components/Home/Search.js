import styles from '../../styles/Search.module.css';
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { addSearch } from '../../reducers/search';
import { convertStringApeToCode } from '../../modules/convertingFunctions';
import {AutoComplete} from 'antd'
import codesAndStringsApe from '../../datas/codesApeActivities'

function Search() {
    const [activityTypped, setActivityTypped] = useState('')
    const [locationTypped, setLocationTypped] = useState('')

    const url = process.env.NEXT_PUBLIC_BACK_ADDRESS
    const dispatch = useDispatch()

    // Variables engistrant les listes nécessaires à l'affichage des propositions d'autocomplete

    const activitiesList = codesAndStringsApe.map(e=>{
        return e = {value : e.description}
    })
    const [locationsList, setLocationsList]=useState([])


    // Fonction appelée quand on clique sur recherche

    const searchClick = ()=>{
        const codeApe = convertStringApeToCode(activityTypped)
        if (!codeApe){return}
        const locationWithoutSpace = locationTypped.replace(/ /g, '-')
        fetch(`${url}/searches/newSearch/${locationWithoutSpace}/${codeApe}`)
        .then(response=>response.json())
        .then(data=> {
            console.log(data)
            dispatch(addSearch(data.result))

        })
    }

    // Fonction appelée en tapant du texte dans 'Secteur Géographique' pour fetch api adresse et remplir la liste de l'autoComplete

    const locationTextChange = async (locationSearched)=>{
        if(locationSearched.length<3){
            setLocationsList([])
            return}
        else {
            const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${locationSearched}&type=municipality`)
            const data = await response.json()
            setLocationsList(data.features.map((e, i)=>{
                return {value : e.properties.name,
                    id : i,
                    }
            }))
        }
     
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
                <label for="activity">Activité</label>
                <AutoComplete
                    options={activitiesList}
                    style={{width : "25vw", height :"6vh"}}
                    filterOption="true"
                    onSelect={item=>setActivityTypped(item)}
                >
                    <input type='text' id='activity' placeholder="Restauration traditionelle, Coiffure..." onChange={(e)=>setActivityTypped(e.target.value)} value={activityTypped}></input>
                </AutoComplete>
            </div>
            <div className={styles.locations}>
                <label for="location">Secteur Geographique</label>
                <AutoComplete
                    options={locationsList}
                    style={{width : "25vw", height :"6vh"}}
                    filterOption="true"
                    onSelect={item=>setLocationTypped(item)}
                 
                >
                    <input type='text' id='location' placeholder='Ville' 
                    onChange={(e)=>{
                        setLocationTypped(e.target.value)
                        locationTextChange(e.target.value)
                        }} 
                    value={locationTypped}></input>
                </AutoComplete>
            </div>
            
        </div>
        <button className={styles.btnSearch} id='btnSearch' onClick={()=>searchClick()}>Rechercher</button>
        <img src='/Image_Pasted_at_2024-8-5_14-22-removebg-preview.png' alt='Arrow-Down'/>
        </div>
    </div>
  );
}

export default Search;