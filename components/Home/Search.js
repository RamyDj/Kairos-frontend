import styles from '../../styles/Search.module.css';
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { addSearch } from '../../reducers/search';
import { convertStringApeToCode } from '../../modules/convertingFunctions';
import {AutoComplete, Modal} from 'antd'
import {CloseOutlined} from '@ant-design/icons'
import codesAndStringsApe from '../../datas/codesApeActivities'
import ActivitiesTable from './ActivitiesTable';

function Search() {

    const url = process.env.NEXT_PUBLIC_BACK_ADDRESS
    const dispatch = useDispatch()

    // États reliés aux inputs

    const [activityTypped, setActivityTypped] = useState('')
    const [locationTypped, setLocationTypped] = useState('')

    // État/condition pour afficher proposition d'aide et modale

    const [isHelpVisible, setIsHelpVisible] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)

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

    // Fonction pour proposer d'afficher le tableau des activités si les caractères tapés ne correspondent à aucune d'entre elles
    
    const checkListMatch = (characters)=>{
        if (characters.length<3){return setIsHelpVisible(false)}
        const regex = new RegExp(characters, 'i')
        const isThereAnyMatch = activitiesList.some(e=> regex.test(e.value))
        console.log(isThereAnyMatch)
        !isThereAnyMatch ? setIsHelpVisible(true) : setIsHelpVisible(false)
    }

    let helpStyle
    isHelpVisible ? helpStyle={display : "flex"} : helpStyle={display : "none"}

  return (
    <div className={styles.container}>
        <div className={styles.searchContainer}>
            <p className={styles.text}>“C’est quoi le statut d’entrepreneur individuel? Est ce que j’ai des concurrents?”<br></br>
                <span className={styles.title}>Difficile de se lancer?<br></br>KAIROS est fait pour vous!</span></p>
        </div>
        <div className={styles.formContainer}>
        <Modal 
			onCancel={()=>setIsModalVisible(false)} 
			open={isModalVisible} 
			footer={null} styles={{ content: { backgroundColor: 'white' } }} 
			closeIcon={<CloseOutlined style={{color: "black"}}/>}
		>
			<ActivitiesTable/>
		</Modal>
        <div className={styles.form}>
            <div className={styles.activities}>
                <label for="activity">Activité</label>
                <AutoComplete
                    options={activitiesList}
                    style={{width : "25vw", height :"6vh"}}
                    filterOption="true"
                    onSelect={item=>setActivityTypped(item)}
                >
                    <input type='text' id='activity' placeholder="Restauration traditionelle, Coiffure..." onChange={(e)=>{
                        checkListMatch(e.target.value)
                        setActivityTypped(e.target.value)
                        }} 
                        value={activityTypped}></input>
                </AutoComplete>
                <p className={styles.helpSentence} style={helpStyle}>
                    Aucune activité trouvée. <span className={styles.buttonHelp} onClick={()=>setIsModalVisible(true)}>Besoin d'aide ?</span>
                </p>
            </div>
            <div className={styles.locations}>
                <label for="location">Commune</label>
                <AutoComplete
                    options={locationsList}
                    style={{width : "25vw", height :"6vh"}}
                    filterOption="true"
                    onSelect={item=>setLocationTypped(item)}
                 
                >
                    <input type='text' id='location' placeholder='Ville...' 
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