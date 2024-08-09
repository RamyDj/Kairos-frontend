import React, { useState } from 'react';
import styles from '../../styles/BurgerMenu.module.css';

function Burger(){
    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!open);
    }
    const handleLogout = () => {
		dispatch(logout());
	};
    return (
        <div className={styles.burgerMenu}>
            <button className={styles.burgerButton} onClick={toggleMenu}>
                ☰
            </button>
            {open && (
                <div className={styles.menu}>
                    <a className={styles.menuItem} href='/'>Mon Espace</a>
                    <a className={styles.menuItem} href='/'>Mes Informations</a>
                    <a className={styles.menuItem} onClick={() => handleLogout()} href='/login'>Déconnexion</a>
                </div>
            )}
        </div>
    );
}

export default Burger;