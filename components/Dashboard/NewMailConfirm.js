import { useRouter } from 'next/router';

import styles from '../../styles/MailConfirm.module.css';

function NewMailConfirm(){
    // Page Redirection 
    const router = useRouter();

    const handleSubmit = () => {
        router.push('/user-information');
        }

        return(
            <div className={styles.container}>
                <div className={styles.message}>
                    <p>Nouveau Mail vérifié </p>
                    <p>Cliquez sur le bouton "Continuer" pour revenir sur votre espace</p>
                    <button className={styles.button} onClick={() => handleSubmit()}>Continuer</button>
                </div>
            </div>
    )
}
export default NewMailConfirm;