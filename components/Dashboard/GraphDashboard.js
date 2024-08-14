import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { useEffect, useState } from 'react';
import Styles from '../../styles/Result.module.css';
import { useSelector } from 'react-redux';
const moment = require('moment')

// Registering components required for Chart.js
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);



const GraphDashboard = () => {

const allSearches = useSelector((state) => state.search.value);
const i = allSearches.length-1;
const search = allSearches[i];

let caCurrentYear = 0;
let caNMinus1 = 0;
let caNMinus2 = 0;

for (let company of search.current_companies) {
  caCurrentYear += company.ca_per_year[0].ca;
  caNMinus1 += company.ca_per_year[1].ca;
  caNMinus2 += company.ca_per_year[2].ca;
}

caCurrentYear = Math.round((caCurrentYear/search.current_companies.length) * 100) / 100
caNMinus1 = Math.round((caNMinus1/search.current_companies.length) * 100) / 100
caNMinus2 = Math.round((caNMinus2/search.current_companies.length) * 100) / 100

const date = new Date()
const currentYearString = moment(date).format("YYYY")
const currentYearNumber = Number(currentYearString);
const NMinus1 = (currentYearNumber-1).toString();
const NMinus2 = (currentYearNumber-2).toString();


  // Données statiques pour le graphique
  const staticData = {
    labels: [NMinus2, NMinus1, currentYearString], // Les labels des statuts
    datasets: [
      {
        label: `Chiffre d'affaire moyen par année`,
        data: [caNMinus2, caNMinus1, caCurrentYear], // Pourcentage pour chaque statut
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

export default GraphDashboard;
