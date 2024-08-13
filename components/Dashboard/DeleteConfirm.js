import { useRouter } from 'next/router';
import { useState,  useEffect } from 'react';
import styles from '../../styles/MailConfirm.module.css';

function DeleteConfirm(){
    const router = useRouter();
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
       // Décrémenter le compte à rebours chaque seconde
        const interval = setInterval(() => {
            setCountdown((element) => {
                if (element > 0) {
                    return element - 1;
                }
                return element;
            });
        }, 1000);

        // Redirection vers la page d'accueil
        const timeout = setTimeout(() => {
            router.push('/');
        }, 3000);
        //Destruction du composant
        return () => {    
            //Annuler l'exécution avec clearInterval       
            clearInterval(interval);
            clearTimeout(timeout); }
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.message}>
                <p>Votre compte a bien été supprimé</p>
                <p className={styles.infoCount}>Redirection vers la page d'accueil dans <br/>
                    <span className={styles.countdown}>{countdown} </span>
                </p>
            </div>
        </div>
    );
}
export default DeleteConfirm;