import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { useEffect, useState } from 'react';
import Styles from '../../styles/Result.module.css';

// Registering components required for Chart.js
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const Graph = () => {
  // Données statiques pour le graphique
  const staticData = {
    labels: ['SARL', 'SAS', 'EI'], // Les labels des statuts
    datasets: [
      {
        label: 'Part du statut au total',
        data: [30, 50, 20], // Pourcentage pour chaque statut
        borderColor: '#163050', // Couleur de la ligne
        backgroundColor: 'rgba(22, 48, 80, 0.1)', // Couleur de fond sous la ligne
        fill: true, // Remplir la zone sous la ligne
      },
    ],
  };

  // État pour les données du graphique
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    // Mise à jour des données du graphique
    setData(staticData);
  }, []);

  return (
      <Line data={data} className={Styles.graph} />
  );
};

export default Graph;
