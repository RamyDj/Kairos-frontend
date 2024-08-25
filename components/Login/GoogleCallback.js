import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userInfo } from '../../reducers/user';

function GoogleCallback() {
  const dispatch = useDispatch();

  const url = process.env.NEXT_PUBLIC_BACK_ADDRESS

  useEffect(() => {
    const fetchUserData = () => {
      fetch(`${url}/users/api/me`, { // Met à jour l'URL en fonction de ton API
        method: 'GET',
        credentials: 'include', // Assure-toi que les cookies sont envoyés
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            // Gérer les erreurs d'authentification ici
            console.error('Authentication failed:', data.error);
            window.location.href = '/'; // Redirige en cas d'erreur
          } else {

            //Met à jour le token utilisateur
            fetch(`${url}/users/update`, {
              method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({token: data.token, email: data.email})
            })
              .then(response => response.json())
              .then(data => {
                console.log(data)
              })
            // Dispatch des informations de l'utilisateur et du token dans Redux
            dispatch(userInfo({
              token: data.token,
              name: data.name,
              email: data.email,
            }));
            // Rediriger vers le tableau de bord
          }
        })

    };

    fetchUserData();
  }, [dispatch]);

  return (
    <div>
      <p>Authentification en cours...</p>
    </div>
  );
}

export default GoogleCallback;
