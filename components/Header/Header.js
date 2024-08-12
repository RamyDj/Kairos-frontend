import React from 'react';
import styles from '../../styles/Header.module.css';
import Burger from './Burger';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link'

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
    const router = useRouter();
    const user = useSelector((state) => state.user.value)

    const handleSignupClick = () => {
        router.push('/login')
    }


    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                <Link href='/'><img src='/logo-removebg-preview.png' id='logo' alt='Logo' /></Link>
                </div>
                <h1 className={styles.kairos}
                 id='title'>KAIROS</h1>
                {/* {userSection} */}
                <div className={styles.buttonsContainer}>
                <a className={styles.link} href='' id='AboutLink'>A Propos</a>
                <div className={styles.headerRight}>
                {user.token === null ? (
                    <button onClick={() => handleSignupClick()} className={styles.signUpBtn}
                    >Se connecter</button>
                ) : (
                    <>
                    <p>Bienvenue {user.firstname} {user.name}</p>
                    <Burger />
                    </>
                    )
                }
                    </div>
                </div>

            </div>
        </header >
    );
}

export default Header;
