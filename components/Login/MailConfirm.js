import { useDispatch, useSelector} from 'react-redux';
import { useRouter } from 'next/router';
import { login } from '../../reducers/user';

function MailConfirm(){

    const url = process.env.NEXT_PUBLIC_BACK_ADDRESS

    // Page Redirection 
    const router = useRouter();

    //Reducer 
    const dispatch = useDispatch();
    const search = useSelector((state) => state.search.value);

    const handleSubmit = () => {
     fetch(`${url}/users/token`)
     .then(response => response.json())
     .then(data => {
      console.log(data)
       data.result && dispatch(login({token: data.token}))})

       if (Object.keys(search).length === 0) {
        router.push('/dashboard');
      } else {
        router.push('/result');
      }  
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