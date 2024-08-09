import { useSelector } from 'react-redux';
import styles from '../../styles/Result.module.css';
import Company from './Company';


function Show() {

    const search = useSelector((state) => state.search.value);
    if (!search[0].current_companies || search[0].current_companies.length === 0) {
        return <span>Aucune entreprise trouvée</span>;
    }

    const companiesList = search[0].current_companies;

    const randomCA = 18000;
    console.log(companiesList)

  const formattedCompaniesList = companiesList.map((data, i) => {
    return (
        <Company key={i} name={data.name} status={data.status} creationDate={data.creation_date} employees={data.employees} CA={randomCA} />
    )
  })

    return (
        <div className={styles.showContainer}>
            {formattedCompaniesList}
        </div>
    );
}
export default Show;