import { useSelector} from 'react-redux';


function Dashboard(){
    const user = useSelector((state) => state.user.value);
    
    return(
        <div>
            <h1>Dashboard</h1>
        <div>
        {user.firstname} & {user.token}
     </div>
  </div>
)
}
export default Dashboard;