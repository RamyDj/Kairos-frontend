import { useDispatch, useSelector} from 'react-redux';
import { useRouter } from 'next/router';
import { userInfo } from '../../reducers/user';

import styles from '../../styles/MailConfirm.module.css';

function MailConfirm(){
    const url = process.env.NEXT_PUBLIC_BACK_ADDRESS

    // Page Redirection 
    const router = useRouter();

    //Reducer 
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value)
    const search = useSelector((state) => state.search.value);

    const handleSubmit = () => {
        fetch('http://localhost:3000/users/info-user',{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email : "gallibour.irene@gmail.com"}),
          }).then(response => response.json())
        .then(data => {
          if(data.result) { 
            dispatch(userInfo({token: data.user.token})) 
          
            if (Object.keys(search).length === 0) {
              router.push('/dashboard');
            } else {
              router.push('/result/companies');
            }  
          }
        })
    }
    return(
        <div className={styles.container}>
            <div className={styles.message}>
              <p>Mail vérifié </p>
              <p>Bienvenue!</p>
              <button className={styles.button} onClick={() => handleSubmit()}>Continuer</button>
            </div>
        </div>
        
)
}
export default MailConfirm;