import './style.scss';
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto';

const BarChart = ({ data }) => {
  return (
    <div className="BarChart-container">
      <Bar data={data}
      //  options={ } 
      />
    </div>
  )
};

export default BarChart;