import { useRouter } from 'next/router';
import { useDispatch, useSelector} from 'react-redux';
import { userInfo } from '../../reducers/user';

import styles from '../../styles/MailConfirm.module.css';

function NewMailConfirm(){
    const url = process.env.NEXT_PUBLIC_BACK_ADDRESS

    // Page Redirection 
    const router = useRouter();

    //Reducer 
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value)
    const search = useSelector((state) => state.search.value);
    console.log(user)

    const handleSubmit = () => {
        fetch(`${url}/users/info-user`,{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token : user.token}),
          }).then(response => response.json())
        .then(data => {
          console.log(data)
          if(data.result) { 
                dispatch(userInfo({
                    email:data.user.email,
                    name : data.user.name,
                    firstname : data.user.firstname,
                    token : data.user.token,
                    searches : data.user.searches,
                    skills: data.user.skills,
                }))
            router.push('/user-information');
          }
        })
    }

        return(
            <div className={styles.container}>
                <div className={styles.message}>
                    <p>Nouveau Mail vérifié </p>
                    <p>Cliquez sur le bouton "Continuer" pour revenir sur votre espace</p>
                    <button className={styles.button} onClick={() => handleSubmit()}>Continuer</button>
                </div>
            </div>
    )
}
export default NewMailConfirm;