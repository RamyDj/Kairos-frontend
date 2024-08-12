import { useSelector } from 'react-redux';
import styles from '../../styles/Dashboard.module.css';
import PercentageWheel from "../Result/PercentageWheel";


function Skills() {
    const user = useSelector((state) => state.user.value);

    const stat = "98%";

    return (
        <div className={styles.skillsContainer}>
            <h2>Mes Compétences</h2>
            <div className={styles.SkillsList}>
                <div className={styles.commerce}>
                    <span> Commerce </span><br/>
                    <a href="/"> Lien </a>
                </div>
                <div className={styles.design}>
                    <span> Design </span><br/>
                    <a href="/"> Lien </a>
                </div>
                <div className={styles.legal}>
                    <span> Legal </span><br/>
                    <a href="/"> Lien </a>
                </div>
            </div>
        </div>
    )
}
export default Skills;