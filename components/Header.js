import styles from '../styles/Header.module.css';

function Header() {

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <img src='/logo-removebg-preview.png' id='logo' alt='Logo' />
                <h1 id='title'>KAIROS</h1>
                <div className={styles.buttonsConatiner}>
                    <a className={styles.link} href='' id='AboutLink'>A Propos</a>
                    <button className={styles.connection} id='connection' >Se Connecter</button>
                </div>
            </div>
        </header >
    );
}

export default Header;
