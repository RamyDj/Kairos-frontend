// components/Result/GraphComponent.js
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { useEffect, useState } from 'react';

// Registering components required for Chart.js
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const Graph = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    setData({
      labels: ['Auto-Entrepreneur', 'SAS', 'SARL', 'URL', 'SASS'],
      datasets: [
        {
          label: 'Nombre par statut',
          data: [15, 20, 30, 10, 25],
          //couleur trait
          borderColor: '#4BC0C0',
          //couleur point
          backgroundColor: '#fffff',
          fill: true
        }
      ]
    });
  }, []);

  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default Graph;
