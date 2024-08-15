import styles from '../../styles/About.module.css';

function About() {
  return (
    <div className={styles.container}>
      <span className={styles.title}>A Propos de KAIROS</span>
      <div className={styles.textContainer}>
        <p className={styles.text}><span>Le but de Kairos:</span> <br /><br />
          Démarrer un projet entreprenarial n'est pas chose facile, et les multiples ressources disponibles sont parfois plus déroutantes qu'utiles. Kairos, c'est un outil simple pour vous aider à comprendre les enjeux de votre projet : quel est l'état du marché dans votre zone ? Faites-vous face à beaucoup de concurrence ? Le chiffre d'affaire moyen est il fixe, ou en chute libre ces dernières années ? Des questions pratiques auxquelles Kairos vous apporte des réponses accessibles et gratuites.
          <br /><br />
          <span>Pourquoi Kairos?</span>
          <br /><br />
          Kairos, dans la mythologie grecque, est le dernier fils de Zeus. Il est le dieu de l'opportunité, de la bonne occasion au bon moment. C'est pour vous permettre de saisir la meilleure opportunité que ce projet est né : pour vous donner toutes les clés pour avancer et préparer au mieux votre futur. 
          <br /><br />
        </p>
      </div>
    </div>
  );
}

export default About;