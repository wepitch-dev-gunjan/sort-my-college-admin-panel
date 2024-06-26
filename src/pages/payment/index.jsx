import { Link } from "react-router-dom";
import "./style.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import { AdminContext } from "../../context/AdminContext";
import { parseTimestamp } from "../../utilities";
const { backend_url } = config;

const Payment = () => {
  const { admin } = useContext(AdminContext);
  const [payments, setPayments] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/admin/payments`);
      setPayments(data);
    } catch (error) {
      console.log(error, "sdsdfdfsdfsd");
    }
  };

  useEffect(() => {
    if (admin.token) fetchData();
  }, [admin]);

  console.log(payments);

  return (
    <div className="Payments-container">
      <div className="heading sticky">
        <div className="row">
          <div className="col">
            <h4>ID</h4>
          </div>
          <div className="col">
            <h4>SERVICE</h4>
          </div>
          <div className="col">
            <h4>DATE</h4>
          </div>
          <div className="col">
            <h4>TIME</h4>
          </div>
          <div className="col">
            <h4>PAYMENT</h4>
          </div>
          <div className="col">
            <h4>STATUS</h4>
          </div>
          <div className="col">
            <h4>DETAILS</h4>
          </div>
        </div>
      </div>
      <div className="RecentPayments-container">
        <div className="table">
          {payments
            .slice(0)
            .reverse()
            .map((payment, i) => (
              <div className="row" key={i}>
                <div className="col">{i + 1}</div>
                <div className="col">{payment.session_type}</div>
                <div className="col">
                  {parseTimestamp(payment.created_at).date}
                </div>
                <div className="col">
                  {parseTimestamp(payment.created_at).time}
                </div>
                <div className="col">{payment.amount}</div>

                <div
                  className={`col ${
                    payment.status === "Cancelled"
                      ? "red"
                      : payment.status === "Delivered"
                      ? "green"
                      : payment.status === "Pending"
                      ? "blue"
                      : ""
                  }`}
                >
                  {payment.status}
                </div>
                <div className="col rpc-view-det-btn">
                  <Link to={`/payment/payment-details/${payment._id}`}>
                    View Details
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Payment;
