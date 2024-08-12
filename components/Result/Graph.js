import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { useEffect, useState } from 'react';
import styles from '../../styles/Result.module.css';
import { useSelector } from 'react-redux';

// Registering components required for Chart.js
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const Graph = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });
  const search = useSelector((state) => state.search.value)
  const labelsNames = search[0].top_status.map((data, i) => {
    let name;
    if (data.status_name === "Société à responsabilité limitée (sans autre indication)") {
      name = "SARL"
    }
    else if (data.status_name === "SAS, société par actions simplifiée") {
      name = "SAS"
    }
    else if (data.status_name === "Entrepreneur individuel") {
      name = "EI"
    }
    return (name)
  })

  const statusPercentages = search[0].top_status.map((data, i) => {
    return (data.percentage)
  })


  useEffect(() => {
    setData({
      labels: labelsNames,
      datasets: [
        {
          label: 'Part du statut au total',
          data: statusPercentages,
          //couleur trait
          borderColor: '#163050',
          //couleur point
          backgroundColor: '#F9F2D2',
          fill: true,
        }
      ]
    });
    console.log(data)
  }, []);

  return (
    <div className={styles.graphContainer}>
      <Line data={data} />
    </div>
  );
};

export default Graph;
