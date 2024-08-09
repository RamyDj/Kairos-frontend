import { useSelector } from 'react-redux';
import styles from '../../styles/Dashboard.module.css';
import MyProfile from "../Dashboard/MyProfile";
import TableStatus from "../Dashboard/TableStatus";
import NewSearch from "../Dashboard/NewSearch";
import LastSearch from "../Dashboard/LastSearch";
import Skills from "../Dashboard/Skills";


function Dashboard() {
    const user = useSelector((state) => state.user.value);

    return (
        <div>
            <div className={styles.col1}>
                <MyProfile />
                <Skills />
            </div>
            <div className={styles.col2}>
                <LastSearch />
                <NewSearch />
            </div>
            <div className={styles.col3}>
                <TableStatus />
            </div>
        </div>
    )
}
export default Dashboard;