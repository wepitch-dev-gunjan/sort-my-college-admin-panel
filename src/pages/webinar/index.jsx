import "./style.scss"
import WebinarItem from "../../components/webinarItem"
import axios from "axios"
import { AdminContext } from "../../context/AdminContext"
import { useContext, useState } from "react"
import { backend_url } from "../../config"
import { useEffect } from "react"
import Filters from "../../components/filters"
import { toast } from "react-toastify"

const Webinar = () => {
  const [webinars, setWebinars] = useState([]);
  const { admin } = useContext(AdminContext);

  const today = new Date();
  const startDate = new Date();
  const endDate = new Date();

  startDate.setDate(today.getDate() - 10);
  endDate.setDate(today.getDate() + 0);
  const defaultWebinarFilters =
  {
    search: '',
    webinar_dates: [startDate, endDate],
    webinar_fee: [0, 5000]
  };
  const [webinarFilters, setWebinarFilters] = useState(defaultWebinarFilters);

  const resetFilters = () => {
    setWebinarFilters(defaultWebinarFilters);
  };

  const getResponse = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/webinars/webinar/get-webinars-for-admin`, {
        params: webinarFilters,
        headers: {
          Authorization: admin.token
        }
      });
      console.log(data)
      setWebinars(data);
    } catch (error) {
      console.log(error)
      toast('Error fetching webinars: ' + error.message)
    }
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