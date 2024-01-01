import { useContext } from "react";
import RecentPayments from "../../components/dashboardComponents/RecentPayments";
import Widget from "../../components/dashboardComponents/widget";
import "./style.scss";
import { MediaQueryContext } from "../../context/MediaQueryContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // const { followersCount } = useContext(DashboardContext)
  const { smallScreen } = useContext(MediaQueryContext);
  return (
    <div className="all-dashboard">
      <div className="Dashboard-container">
        <div className="business-dashbaord">
          <h1>Business Dashboard</h1>
          <div className="widgets-container">
            {/* <Widget heading="USERS" value={followersCount} /> */}
            <Widget heading="INCOME" value="$10000" />
            <Link to='/user'>
            <Widget heading="USERS" value="1000" />
            </Link>
            <Link to='/counsellor'>            
            <Widget heading="COUNSELLORS" value="1000" />
            </Link>
          </div>
        </div>

        {/* recent payments */}
        <RecentPayments />
      </div>
    </div>
  );
};

export default Dashboard;
