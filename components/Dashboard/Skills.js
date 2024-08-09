import { useSelector } from 'react-redux';
import styles from '../../styles/Dashboard.module.css';


function Skills() {
    const user = useSelector((state) => state.user.value);

    return (
        <div className={styles.skillsContainer}>
            <h2>Mes Compétences</h2>
            <div className={styles.SkillsList}>
                <div>
                    <span> Commerce </span>
                    <a href="/"> Lien </a>
                </div>
                <div>
                    <span> Design </span>
                    <a href="/"> Lien </a>
                </div>
                <div>
                    <span> Legal </span>
                    <a href="/"> Lien </a>
                </div>
            </div>
        </div>
    )
}
export default Skills;