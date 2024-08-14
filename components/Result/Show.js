import { useSelector } from 'react-redux';
import styles from '../../styles/Result.module.css';
import Company from './Company';
import {logout} from '../../reducers/user';


function Show() {

    const search = useSelector((state) => state.search.value);
    if (!search[0].current_companies || search[0].current_companies.length === 0) {
        return <span>Aucune entreprise trouvée</span>;
    }

    const user = useSelector((state) => state.user.value)

    const companiesList = search[0].current_companies;

    console.log(companiesList)

  const formattedCompaniesList = companiesList.map((data, i) => {
    return (
        <Company key={i} name={data.name} status={data.status} creationDate={data.creation_date} employees={data.employees} CA={data.ca_per_year[0].ca} />
    )
  })

  const unloggedList = [];
  unloggedList.push(formattedCompaniesList[0], formattedCompaniesList[1], formattedCompaniesList[2], formattedCompaniesList[3]);

  let renderedList;

  if (user.token!== null) {
    renderedList = formattedCompaniesList;
  }
  else (renderedList = unloggedList)

    return (
        <div className={styles.showContainer}>
            {renderedList}
        </div>
    );
}
export default Show;
