import React, { useState, useRef, useEffect } from 'react';
import styles from '../../styles/BurgerMenu.module.css';
import Link from 'next/link'
import {logout} from '../../reducers/user';
import {deleteSearches} from '../../reducers/search';
import { useDispatch } from 'react-redux';
import {useRouter} from 'next/router'


function Burger(){
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const menuRef = useRef(null);
    const router = useRouter();

    const toggleMenu = () => {
        setOpen(!open);
    }
    const handleLogout = () => {
		dispatch(logout());
        dispatch(deleteSearches())
        router.push('/')
	};

        // Fonction pour fermer le menu si on clique en dehors
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
    
        useEffect(() => {
            if (open) {
                document.addEventListener('click', handleClickOutside);
            } else {
                document.removeEventListener('click', handleClickOutside);
            }
    
            // Nettoyage de l'écouteur d'événements lors du démontage du composant
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }, [open]);
    return (
        <div className={styles.burgerMenu} ref={menuRef}>
            <button className={styles.burgerButton} onClick={toggleMenu}>
                ☰
            </button>
            {open && (
                <div className={styles.menu} >
                    <Link href='/dashboard'>
                    <a className={styles.menuItem}>Mon Espace</a>
                    </Link>
                    <Link href='/result'>
                    <a className={styles.menuItem} >Mes Informations</a>
                    </Link>
                    <Link href='/'>
                    <a className={styles.menuItem} onClick={() => handleLogout()}>Déconnexion</a>
                    </Link>
                    </div>
            )}
        </div>
    );
}

export default Burger;