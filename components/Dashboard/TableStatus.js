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
                        <th>Travailleur indépendant</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>CA max/an</td>
                        <td>75K BRUT</td>
                        <td>45K BRUT</td>
                    </tr>
                    <tr>
                        <td>Taux de cotisation</td>
                        <td>25%</td>
                        <td>70%</td>
                    </tr>
                    <tr>
                        <td>Indemnités journalières</td>
                        <td>✅</td>
                        <td>❌</td>
                    </tr>
                    <tr>
                        <td>Eligible a l'ACRE</td>
                        <td>✅</td>
                        <td>❌</td>
                    </tr>
                    <tr>
                        <td>Nombre de salariés max</td>
                        <td>❌</td>
                        <td>✅</td>
                    </tr>
                    <tr>
                        <td>Impot libératoire</td>
                        <td>❌</td>
                        <td>✅</td>
                    </tr>
                    <tr>
                        <td>Droits chomage</td>
                        <td>✅</td>
                        <td>❌</td>
                    </tr>
                </tbody>
            </table>
            <a href="/">Acceder à tous les status</a>
            <a href="/">Accéder à toutes mes recherches</a>
        </div>
    );
}

export default TableStatus;
