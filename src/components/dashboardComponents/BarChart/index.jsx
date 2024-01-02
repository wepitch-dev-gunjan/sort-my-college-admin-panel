import './style.scss';
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto';

const BarChart = ({ data, text }) => {
  const options = {
    plugins: {
      title: {
        display: true,
        text,
      },
    },
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  return (
    <div className="BarChart-container">
      <Bar data={data}
        options={options}
      />
    </div>
  )
};

export default BarChart;