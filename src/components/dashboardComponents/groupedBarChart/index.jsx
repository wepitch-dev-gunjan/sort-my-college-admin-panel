import './style.scss';
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto';

const GroupedBarChart = ({ data }) => {
  return (
    <div className="GroupedBarChart-container">
      <Bar data={data}
      />
    </div>
  )
};

export default GroupedBarChart;