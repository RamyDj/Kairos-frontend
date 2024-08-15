
import styles from '../../styles/Zoom.module.css';

function Zoom(props) {

    console.log(props.links)
    

    const allLinksInArray2 = props.links
    const links1 = allLinksInArray2.map((e, i) => {
        return <div className={styles.linkContainer}>< a href={e} key={i} >{e}</a></div>
    })

    const allLinksInArray3 = props.links2
    const links2 = allLinksInArray3.map((e, i) => {
        return <div className={styles.linkContainer}>< a href={e} key={i} >{e}</a></div>
    })

    return (
        <>
            <div className={styles.card}>
                <div className={styles.titleContainer}>
                    <h3>{props.zoom}</h3>
                </div>
                <h2>{props.acreTitle}</h2>
                <p>{props.acre}</p>
                <h4>{props.contentTitle}</h4>
                <p>{props.content}</p>
                <h4>{props.avantagesTitle}</h4>
                <p>{props.avantages}</p>
                <h4>{props.exonerationTitle}</h4>
                <p>{props.exoneration}</p>
                <h4>{props.calculTitle}</h4>
                <p>{props.calcul}</p>
                <h4>{props.beneficierTitle}</h4>
                <p>{props.beneficierContent} <a href={props.linkAE}>{props.linkAE}</a></p>
                <h4>Liens utiles</h4>
                <p>{links1}</p>

                <h2>{props.capitalsocialTitle}</h2>
                <p>{props.definition}</p>
                <h4>{props.capitalTitle}</h4>
                <p>{props.capital}</p>
                <h4>{props.compositionTitle}</h4>
                <p>{props.composition}</p>
                <h4>{props.montantTitle}</h4>
                <p>{props.montant}</p>
                <h4>{props.deposerTitle}</h4>
                <p>{props.deposer}</p>
                <h4>{props.debloquerTitle}</h4>
                <p>{props.debloquer}</p>
                <h4>{props.operationTitle}</h4>
                <p>{props.operation}</p>
                <h4>{props.faqTitle}</h4>
                <h4>{props.faq1Title}</h4>
                <p>{props.faq1}</p>
                <h4>{props.faq2Title}</h4>
                <p>{props.faq2}</p>
                <h4>{props.faq3Title}</h4>
                <p>{props.faq3}</p>
                <h5>source :  {props.source} </h5>
                <h6>{props.maj} </h6>

                <h2>{props.ijTitle}</h2>
                <p>{props.ij}</p>
                <p>{props.notabene}</p>
                <h4>Liens utiles</h4>
                <p>{links2}</p>

                <h2>{props.ilTitle}</h2>
                <p>{props.il}</p>
                <h4>{props.vflTitle}</h4>
                <p>{props.vfl}</p>
                <h4>{props.conditionilTitle}</h4>
                <p>{props.conditionil}</p>
                <h4>{props.declencherilTitle}</h4>
                <p>{props.declencheril}</p>
                <h4>{props.tauxTitle}</h4>
                <p>{props.taux}</p>
                <h4>{props.declarationrevenuTitle}</h4>
                <p>{props.declarationrevenu}</p>
                <h4>{props.sortieTitle}</h4>
                <p>{props.sortie}</p>

            <h2>{props.chargeSocialesSarlSasTitle}</h2>
            <p>{props.explanation}</p>
            <h4>{props.quandPayerTitle}</h4>
            <p>{props.quandPayer}</p>
            <h4>{props.quelTauxTitle}</h4>
            <p>{props.quelTaux}</p>
            </div>
        </>
    )
}

export default Zoom;