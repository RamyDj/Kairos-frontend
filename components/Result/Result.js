import { useSelector} from 'react-redux';


function Result(){
    const user = useSelector((state) => state.user.value);
    return(
        <div>
            <h1>Dashboard</h1>
        <div>
        {user.name} & {user.token}
     </div>
  </div>)
}
export default Result;