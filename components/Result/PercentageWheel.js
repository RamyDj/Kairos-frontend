// components/Result/PercentageWheel.js
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


// Enregistrement des composants nécessaires pour Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PercentageWheel = ({ props }) => {
  const { percentage } = props;
  // données du graphique
  const data = {
    //text au hover
    labels: ['Auto-Entrepreneur', 'Autre'],
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ['#36A2EB', '#E3E4E8'], // Couleurs du graphique
      },
    ],
  };

  // Options du graphique
  const options = {
    responsive: true,
    cutout: '80%', // Pour faire en sorte que ce soit une roue avec un trou au centre
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
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default PercentageWheel;