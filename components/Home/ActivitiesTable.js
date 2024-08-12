import styles from '../../styles/ActivitiesTable.module.css'
import sortedApeCodes from '../../datas/sortedApeCodes'
import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'


export default function ActivitiesTable(props){

    // États déterminant les éléments du tableau à afficher, la catégorie/code que l'on est entrain d'explorer et le niveau d'imbrication auquel on se trouve dans le tableau (0 = menu principal)

    const [currentLevelOfApeTable, setCurrentLevelOfApeTable]=useState(sortedApeCodes)
    const [currentCode, setCurrentCode]=useState('')
    const [countLevel, setCountLevel]=useState(0)

    console.log(currentCode)

    // Fonction en cas de click sur une catégorie d'activité pour afficher le niveau du dessous ou si dernier niveau renvoyer l'info à Searche.js

    const setNewCurrentLevel=(subcategories, label, id)=>{
        if(subcategories){
       setCurrentLevelOfApeTable(subcategories)
       setCountLevel(countLevel+1)
       setCurrentCode(id)
    }
    else{props.getTableActivity(label)
        setCountLevel(0)
        setCurrentCode('')
        setCurrentLevelOfApeTable(sortedApeCodes)
    }
    }

    // Fonction en cas de click sur la flêche pour revenir au niveau précédent

    const backClick=()=>{
        switch(countLevel){
            case 1 : setCurrentLevelOfApeTable(sortedApeCodes)
            setCountLevel(countLevel-1)
            setCurrentCode('');
            break;
            case 2 : sortedApeCodes.map(e=> e.subcategories.map(f=>{
                if (f.id === currentCode){setCurrentLevelOfApeTable([...e.subcategories])
                    setCurrentCode(e.id)
                    setCountLevel(countLevel-1)
                }
            }));
            break;
            case 3 : sortedApeCodes.map(e=> e.subcategories.map(f=>f.subcategories.map(g=>{
                if (g.id === currentCode){setCurrentLevelOfApeTable([...f.subcategories])
                    setCurrentCode(f.id)
                    setCountLevel(countLevel-1)
                }
            })));
            break;
            case 4 : sortedApeCodes.map(e=>e.subcategories.map(f=>f.subcategories.map(g=>g.subcategories.map(h=>{
                if (h.id === currentCode){setCurrentLevelOfApeTable([...g.subcategories])
                    setCurrentCode(g.id)
                    setCountLevel(countLevel-1)
                }
            }))));
            break;
        }
    }


    // Fonction en cliquant pour revenir au tableau principal 

    const backMenuClick = ()=>{
        setCurrentLevelOfApeTable(sortedApeCodes)
        setCountLevel(0)
        setCurrentCode('')
    }

    // Affichage des boutons retour arrière et menu en fonction du niveau du tableau (countLevel) dans lequel on est

    let backItems
    countLevel===0 ? backItems=<></> 
    : backItems=(
        <div className={styles.buttonContainer}>
            <FontAwesomeIcon icon={faArrowLeftLong} className={styles.icon} onClick={()=>backClick()}/>
            <p className={styles.backMenu} onClick={()=>backMenuClick()}>Retour au menu principal</p>
        </div>
    )

    // Affichage d'un header différent au dernier niveau du tableau

    let header 
    countLevel<3 ? header=<p className={styles.header}>Catégories d'activités</p> : header=header=<p className={styles.header}>Activités</p>

    // Mappage de la liste des catégories/activités à afficher

    let list = currentLevelOfApeTable.map((e,i)=><p className={styles.activity} key={i} onClick={()=>{setNewCurrentLevel(e.subcategories, e.label, e.id)}}>{e.label}</p>)


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