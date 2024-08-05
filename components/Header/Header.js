import React from 'react';
import styles from '../styles/Header.module.css';
import Burger from './Burger';

function Header() {

    // let userSection;
    // if (user && user.token) {
    //     userSection = (
    //         <div className={styles.buttonsContainer}>
    //             <a className={styles.link} href='' id='AboutLink'>A Propos</a>
    //             <p>Bienvenue {user.firstName}</p>
    //             <BurgerMenu />
    //         </div>
    //     );
    // } else {
    //     userSection = (
    //         <div className={styles.buttonsContainer}>
    //             <a className={styles.link} href='' id='AboutLink'>A Propos</a>
    //             <button className={styles.connection} id='connection'>Se Connecter</button>
    //         </div>
    //     );
    // }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <img src='/logo-removebg-preview.png' id='logo' alt='Logo' />
                <h1 id='title'>KAIROS</h1>
                {/* {userSection} */}
                <div className={styles.buttonsContainer}>
                           <a className={styles.link} href='' id='AboutLink'>A Propos</a>
                            <p>Bienvenue YAAAAAAA</p>
                <Burger/>
                </div>
                
            </div>
        </header >
    );
}

export default Header;
