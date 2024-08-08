import { useDispatch, useSelector} from 'react-redux';
import { useRouter } from 'next/router';
import { userInfo } from '../../reducers/user';

function MailConfirm(){

    const url = process.env.NEXT_PUBLIC_BACK_ADDRESS
    // Page Redirection 
    const router = useRouter();

    //Reducer 
    const dispatch = useDispatch();
    const search = useSelector((state) => state.search.value);
    console.log(search)

    const handleSubmit = () => {
     fetch(`${url}/users/token`)
     .then(response => response.json())
     .then(data => {
       data.result && dispatch(userInfo({token: data.token})) 
          
          if (Object.keys(search).length === 0) {
            router.push('/dashboard');
          } else {
            router.push('/result');
          }  
        }
     )

    }
    return(
        <div>
            <h1>MailConfirm</h1>

            <p>Mail vérifié </p>
            <p>Bienvenue!</p>
            <button onClick={() => handleSubmit()}>Continuez</button>
        </div>
        
)
}
export default MailConfirm;