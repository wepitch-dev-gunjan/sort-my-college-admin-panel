import "./style.scss"
import WebinarItem from "../../components/webinarItem"
import axios from "axios"
import { AdminContext } from "../../context/AdminContext"
import { useContext, useState } from "react"
import { backend_url } from "../../config"
import { useEffect } from "react"
import Filters from "../../components/filters"

const Webinar = () => {
  const [webinars, setWebinars] = useState([]);
  const { user } = useContext(AdminContext);

  const today = new Date();
  const startDate = new Date();
  const endDate = new Date();

  startDate.setDate(today.getDate() - 10);
  endDate.setDate(today.getDate() + 0);
  const defaultWebinarFilters = 
  {
    webinar_type: 'All',
    webinar_dates: [startDate, endDate],
    webinar_duration: 60,
    webinar_status: 'All',
    webinar_fee: [0, 5000]
  };
  const [webinarFilters, setWebinarFilters] = useState(defaultWebinarFilters);

  const resetFilters = () => {
    setWebinarFilters(defaultWebinarFilters);
  };

  const getResponse = async () => {
    const { data } = await axios.get(`${backend_url}/counsellor/${user._id}/webinarsforcounsellor`, {
      params: webinarFilters,
      headers: {
        Authorization: user.token
      }
    });
    setWebinars(data);
  }

  useEffect(() => {
    getResponse();
  }, [webinarFilters]);

  return (
    <>
      <div className="webinar">
        <div className="webinar-header">
          <div className="left">
            <div className="reset-changes">
              <h1>Filtres</h1>
              <button onClick={resetFilters}>Reset filters</button>
            </div>
            <Filters webinarFilters={webinarFilters} setWebinarFilters={setWebinarFilters} />
          </div>
        </div>
        <div className="webinarContainer">
          <div className="webinarList">
            {webinars?.map((webinar) => (
              <WebinarItem key={webinar._id} webinar={webinar} setWebinars={setWebinars} getResponse={getResponse} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Webinar  