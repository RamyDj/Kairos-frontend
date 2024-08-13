import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Histogram = ({ data }) => {
  // Les années disponibles
  const years = ['2022', '2023', '2024'];

  // Préparer les labels des années
  const labels = years;

  // Préparer les datasets pour chaque statut
  const datasets = data.map((item, index) => {
    return {
      label: item.status_name,
      data: item.companies_per_year.map(yearData => yearData.number),
      backgroundColor: `rgba(${75 + (index * 100)}, 192, 192, 0.7)`,
      borderColor: `rgba(${75 + (index * 100)}, 192, 192, 1)`,
      borderWidth: 1,
    };
  });

  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Nombre: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Nombre d\'entreprises',
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default Histogram;
