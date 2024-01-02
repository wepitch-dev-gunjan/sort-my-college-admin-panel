import './style.scss';
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto';

const LineChart = ({ data }) => {
  return (
    <div className="LineChart-container">
      <Line data={data}
      //  options={ } 
      />
    </div>
  )
};

export default LineChart;