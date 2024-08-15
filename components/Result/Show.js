
import { useSelector } from 'react-redux';
import styles from '../../styles/Result.module.css';
import Company from './Company';
import { logout } from '../../reducers/user';
import { useRouter } from 'next/router'


function Show() {

  
  let search
  const router = useRouter()
  const { searchid } = router.query

  const allSearches = useSelector((state) => state.search.value)

  if (searchid !== "companies") {
    search = allSearches.filter(e => e._id == searchid)
  }
  else {
    search = allSearches
  }
  const i = search.length - 1

  if (!search[i].current_companies || search[i].current_companies.length === 0) {
    return <span>Aucune entreprise trouvée</span>;
  }

  const user = useSelector((state) => state.user.value)

  const companiesList = search[i]?.current_companies;

  console.log(companiesList)

  const formattedCompaniesList = companiesList.map((data, i) => {
    return (
      <Company key={i} name={data.name} status={data.status} creationDate={data.creation_date} employees={data.employees} CA={data.ca_per_year[0].ca} />
    )
  })

  const unloggedList = [];
  unloggedList.push(formattedCompaniesList[0], formattedCompaniesList[1], formattedCompaniesList[2], formattedCompaniesList[3]);

  let renderedList;

  if (user.token !== null) {
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
