import styles from '../../styles/ActivitiesTable.module.css'
import sortedApeCodes from '../../datas/sortedApeCodes'
import {useState} from 'react'


export default function ActivitiesTable(props){

    const [currentLevelOfApeTable, setCurrentLevelOfApeTable]=useState(sortedApeCodes)
    const [countLevel, setCountLevel]=useState(0)

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

    const backMenuClick = ()=>{
        setCurrentLevelOfApeTable(sortedApeCodes)
        setCountLevel(0)
    }


    let backItems
    countLevel===0 ? backItems=<></> 
    : backItems=(
        <div className={styles.buttonContainer}>
            <p className={styles.backMenu} onClick={()=>backMenuClick()}>Retour au menu principal</p>
        </div>
    )

    let header 
    countLevel<3 ? header=<p className={styles.header}>Catégories d'activités</p> : header=header=<p className={styles.header}>Activités</p>


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