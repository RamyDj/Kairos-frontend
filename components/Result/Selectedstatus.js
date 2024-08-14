import styles from '../../styles/Selectedstatus.module.css';


function Selectedstatus(props) {


    const allLinksInArray = props.links
    const links = allLinksInArray.map((e,i)=>{
        return <div className={styles.linkContainer}>< a href={e} key={i} >{e}</a></div>
    })

    return (
        <>
        <div className={styles.card}>
        <div className={styles.titleContainer}>
            <h3>{props.statusCode}</h3>
        </div>
        <h4>Présentation</h4>
        <p>{props.presentation}</p>
        <h4>Nombre d'associés</h4>
        <p>{props.associes}</p>
        <h4>Montant du capital social</h4>
        <p>{props.capital}</p>
        <h4>Étendue de la responsabilité</h4>
        <p>{props.responsability}</p>
        <h4>Imposition des bénéfices</h4>
        <p>{props.taxationBenefits}</p>
        <h4>Régime social</h4>
        <p>{props.socialRegime}</p>
        <h4>Imposition</h4>
        <p>{props.taxation}</p>
        <h4>Ciffre d'affaire maximum</h4>
        <p>{props.turnover}</p>
        <h4>Nombre de salariés maximum</h4>
        <p>{props.salaries}</p>
        <h4>Procédures</h4>
        <p>{props.procedures}</p>
        <h4>Avantages du statut {props.statusCode}</h4>
        <p>{props.advantages}</p>
        <h4>Désavantages du statut {props.statusCode}</h4>
        <p>{props.disadvantages}</p>
        <h4>Liens utiles</h4>
        <p>{links}</p>
        </div>
        </>
    )
}

export default Selectedstatus;