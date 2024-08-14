import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userInfo } from '../../reducers/user';

function GoogleCallback() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = () => {
      fetch('http://localhost:3000/users/api/me', { // Met à jour l'URL en fonction de ton API
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
            // Dispatch des informations de l'utilisateur et du token dans Redux
            dispatch(userInfo({
              token: data.token,
              name: data.name,
              email: data.email,
            }));
            // Rediriger vers le tableau de bord
            window.location.href = 'http://localhost:3001/dashboard';
          }
        })
        .catch(error => {
          // Gérer les erreurs de réseau ici
          console.error('Fetch error:', error);
          window.location.href = '/'; // Redirige en cas d'erreur
        });
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
