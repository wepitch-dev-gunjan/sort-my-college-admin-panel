import { useState } from "react";
import RecentPayments from "../../components/dashboardComponents/RecentPayments";
import Widget from "../../components/dashboardComponents/widget";
import "./style.scss";
import BarChart from "../../components/dashboardComponents/BarChart";
import { CounsellorData, UserData, EarningsData, ActivityData } from '../../components/dashboardComponents/Data';
import LineChart from "../../components/dashboardComponents/lineChart";
import GroupedBarChart from "../../components/dashboardComponents/groupedBarChart";

const Dashboard = () => {
  const [userData, setUserData] = useState({
    labels: UserData.map((el) => el.month),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map(el => el.userGain),
      },
      {
        label: "Users Lost",
        data: UserData.map(el => el.userLost),
      },

    ]
  })
  const [counsellorData, setCounsellorData] = useState({
    labels: CounsellorData.map((el) => el.month),
    datasets: [
      {
        label: "Counsellors Gained",
        data: CounsellorData.map(el => el.counsellorGain),
      },
      {
        label: "Counsellors Lost",
        data: CounsellorData.map(el => el.counsellorLost),
      },

    ]
  })
  const [earningsData, setEarningsData] = useState({
    labels: EarningsData.map((el) => el.month),
    datasets: [
      {
        label: "Earnings Gained",
        data: EarningsData.map(el => el.earning),
      },
    ]
  })
  const [activityData, setActivityData] = useState({
    labels: ActivityData.map((el) => el.day),
    datasets: [
      {
        label: "Online Users",
        data: ActivityData.map(el => el.onlineUsers),
      },
      {
        label: "Online Counsellors",
        data: ActivityData.map(el => el.onlineCounsellors),
      },
    ]
  })
  return (
    <div className="all-dashboard">
      <div className="Dashboard-container">
        <div className="business-dashbaord">
          <h1>Business Dashboard</h1>
           <div className="widgets-container"> 
            <Widget heading="INCOME" value="$10000" />
            <Widget heading="USERS" value="1000" />
            <Widget heading="COUNSELLORS" value="1000" /> 
           </div> 
          <div className="chart-row">
            <div className="col">
              <LineChart data={earningsData} />
            </div>
            <div className="col">
              <GroupedBarChart data={activityData} />
            </div>
          </div>
          <div className="chart-row">
            <BarChart data={userData} text='Users' />
            <BarChart data={counsellorData} text='Counsellors' />
          </div>
        </div>

        {/* recent payments */}
        <RecentPayments />
      </div>
    </div>
  );
};

export default Dashboard;
