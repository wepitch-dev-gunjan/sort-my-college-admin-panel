import { useState } from "react";
import RecentPayments from "../../components/dashboardComponents/RecentPayments";
import Widget from "../../components/dashboardComponents/widget";
import "./style.scss";
import BarChart from "../../components/dashboardComponents/BarChart";
import { UserData } from '../../components/dashboardComponents/Data';

const Dashboard = () => {
  const [userData, setUserData] = useState({
    labels: UserData.map((el) => el.year),
    datasets: [{
      label: "Users Gained",
      data: UserData.map(el => el.userGain),
    }]
  })
  return (
    <div className="all-dashboard">
      <div className="Dashboard-container">
        <div className="business-dashbaord">
          <h1>Business Dashboard</h1>
          {/* <div className="widgets-container"> */}
          <BarChart data={userData} />
          {/* <Widget heading="INCOME" value="$10000" />
            <Widget heading="USERS" value="1000" />
            <Widget heading="COUNSELLORS" value="1000" /> */}
          {/* </div> */}
        </div>

        {/* recent payments */}
        <RecentPayments />
      </div>
    </div>
  );
};

export default Dashboard;
