import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from '../../styles/Result.module.css';


// Enregistrement des composants nécessaires pour Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PercentageWheel = ({ props }) => {
  const { percentage } = props;
  // données du graphique
  const data = {
    //text au hover
    labels: ['', 'Autre Statuts'],
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ['#163050', '#F9F2D2'], // Couleurs du graphique
      },
    ],
  };

  // Options du graphique
  const options = {
    responsive: true,
    cutout: '60%', // Pour faire en sorte que ce soit une roue avec un trou au centre
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.raw}%`;
          },
        },
      },
      legend: {
        display: false, // Masquer la légende
      },
    },
  };

  return (
    <div className={styles.doughnut}
    >
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default PercentageWheel;