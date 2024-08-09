import { useSelector } from 'react-redux';
import styles from '../../styles/Dashboard.module.css';

function TableStatus() {
    const user = useSelector((state) => state.user.value);

    return (
        <div className={styles.statusContainer}>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Auto-Entrepreneur</th>
                        <th>Colonne 3</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>CA max/an</td>
                        <td>Ligne 1, Colonne 2</td>
                        <td>Ligne 1, Colonne 3</td>
                    </tr>
                    <tr>
                        <td>Taux de cotisation</td>
                        <td>Ligne 2, Colonne 2</td>
                        <td>Ligne 2, Colonne 3</td>
                    </tr>
                    <tr>
                        <td>Indemnités journalières</td>
                        <td>Ligne 3, Colonne 2</td>
                        <td>Ligne 3, Colonne 3</td>
                    </tr>
                    <tr>
                        <td>Eligible a l'ACRE</td>
                        <td>Ligne 4, Colonne 2</td>
                        <td>Ligne 4, Colonne 3</td>
                    </tr>
                    <tr>
                        <td>Nombre de salariés max</td>
                        <td>Ligne 5, Colonne 2</td>
                        <td>Ligne 5, Colonne 3</td>
                    </tr>
                    <tr>
                        <td>Impot libératoire</td>
                        <td>Ligne 6, Colonne 2</td>
                        <td>Ligne 6, Colonne 3</td>
                    </tr>
                    <tr>
                        <td>Droits chomage</td>
                        <td>Ligne 7, Colonne 2</td>
                        <td>Ligne 7, Colonne 3</td>
                    </tr>
                </tbody>
            </table>
            <a href="/">Acceder à tous les status</a>
            <a href="/">Accéder à toutes mes recherches</a>
        </div>
    );
}

export default TableStatus;
