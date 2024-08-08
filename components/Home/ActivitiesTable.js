import styles from '../../styles/ActivitiesTable.module.css'
import sortedApeCodes from '../../datas/sortedApeCodes'
import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'


export default function ActivitiesTable(props){

    // États déterminant les éléments du tableau à afficher et le niveau auquel on se trouve dans le tableau (0 = menu principal)

    const [currentLevelOfApeTable, setCurrentLevelOfApeTable]=useState(sortedApeCodes)
    const [countLevel, setCountLevel]=useState(0)

    // Fonction en cas de click sur une catégorie d'activité pour afficher le niveau du dessous ou si dernier niveau renvoyer l'info à Searche.js

    const setNewCurrentLevel=(subcategories, label)=>{
        if(subcategories){
       setCurrentLevelOfApeTable(subcategories)
       setCountLevel(countLevel+1)
    }
    else{props.getTableActivity(label)}
    }

    // const setNewCurrentLevel=(subcategories, label)=>{
    //     currentLevelOfApeTable.map(e=>{
    //         if (e.label === label){setCurrentLevelOfApeTable([...e.subcategories])}
    //     })
    // }


    // Fonction en cliquant pour revenir au tableau principal 

    const backMenuClick = ()=>{
        setCurrentLevelOfApeTable(sortedApeCodes)
        setCountLevel(0)
    }

    // Affichage des boutons retour arrière et menu en fonction du niveau du tableau (countLevel) dans lequel on est

    let backItems
    countLevel===0 ? backItems=<></> 
    : backItems=(
        <div className={styles.buttonContainer}>
            <FontAwesomeIcon icon={faArrowLeftLong} className={styles.icon}/>
            <p className={styles.backMenu} onClick={()=>backMenuClick()}>Retour au menu principal</p>
        </div>
    )

    // Affichage d'un header différent au dernier niveau du tableau

    let header 
    countLevel<3 ? header=<p className={styles.header}>Catégories d'activités</p> : header=header=<p className={styles.header}>Activités</p>

    // Mappage de la liste des catégories/activités à afficher

    let list = currentLevelOfApeTable.map((e,i)=><p className={styles.activity} key={i} onClick={()=>{setNewCurrentLevel(e.subcategories, e.label)}}>{e.label}</p>)


    return(
        <div className={styles.mainContainer}>
            {header}
            {backItems}
            <div className={styles.tableContainer}>
                {list}
            </div>
        </div>
        
    )
}