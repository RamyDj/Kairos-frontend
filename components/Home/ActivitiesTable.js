import styles from '../../styles/ActivitiesTable.module.css'
import sortedApeCodes from '../../datas/sortedApeCodes'
import {useState} from 'react'


export default function ActivitiesTable(){

    const [currentLevelOfApeTable, setCurrentLevelOfApeTable]=useState(sortedApeCodes)

    console.log(currentLevelOfApeTable)

    const setNewCurrentLevel=(subcategories, label)=>{
        if(subcategories){
       setCurrentLevelOfApeTable(subcategories)}
    }

    // const setNewCurrentLevel=(subcategories, label)=>{
    //     currentLevelOfApeTable.map(e=>{
    //         if (e.label === label){setCurrentLevelOfApeTable([...e.subcategories])}
    //     })
    // }


    let list = currentLevelOfApeTable.map((e,i)=><p key={i} onClick={()=>{setNewCurrentLevel(e.subcategories, e.label)}}>{e.label}</p>)


    return(
        <div className={styles.tableContainer}>
            {list}
        </div>
    )
}