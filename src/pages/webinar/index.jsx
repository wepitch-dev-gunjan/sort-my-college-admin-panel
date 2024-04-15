import "./style.scss";
import WebinarItem from "../../components/webinarItem";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import { useContext, useState } from "react";
import config from "@/config";
import { useEffect } from "react";
import Filters from "../../components/filters";
import { toast } from "react-toastify";
const { backend_url } = config;

const Webinar = () => {
  const [webinars, setWebinars] = useState([]);
  const { admin } = useContext(AdminContext);

  const today = new Date();
  const startDate = new Date();
  const endDate = new Date();

  startDate.setDate(today.getDate() - 10);
  endDate.setDate(today.getDate() + 0);
  const defaultWebinarFilters = {
    search: "",
    webinar_dates: [startDate, endDate],
  };
  const [webinarFilters, setWebinarFilters] = useState(defaultWebinarFilters);

  const resetFilters = () => {
    setWebinarFilters(defaultWebinarFilters);
  };

  const getWebinars = async () => {
    try {
      const { data } = await axios.get(
        `${backend_url}/admin/webinar/webinar-for-admin`,
        {
          // params: webinarFilters,
        }
      );
      console.log(data);
      setWebinars(data);
    } catch (error) {
      console.log(error);
      toast("Error fetching webinars: " + error.message);
    }
  };

  useEffect(() => {
    getWebinars();
  }, []);

  return (
    <>
      <div className="webinar">
        <div className="webinar-header">
          <div className="left">
            <div className="reset-changes">
              <h1>Webinars</h1>
              {/* <button onClick={resetFilters}>Reset filters</button> */}
            </div>
            {/* <Filters webinarFilters={webinarFilters} setWebinarFilters={setWebinarFilters} /> */}
          </div>
        </div>
        <div className="webinarContainer">
          <div className="webinarList">
            {webinars?.map((webinar) => (
              <WebinarItem
                key={webinar._id}
                webinar_id={webinar._id}
                webinar_title={webinar.webinar_title}
                webinar_password={webinar.webinar_password}
                webinar_by={webinar.webinar_by}
                webinar_details={webinar.webinar_details}
                webinar_date={webinar.webinar_date}
                webinar_image={webinar.webinar_image}
                webinar_start_url={webinar.webinar_start_url}
                webinar_available_slots={webinar.webinar_available_slots}
                registered_participants={webinar.registered_participants.length}
                attended_participants={webinar.attended_participants.length}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Webinar;
