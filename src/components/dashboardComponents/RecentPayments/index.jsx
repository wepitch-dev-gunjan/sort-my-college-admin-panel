import { useContext, useEffect, useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { AdminContext } from "../../../context/AdminContext";
import axios from "axios";
import config from "../../../config";
const { backend_url } = config;

const RecentPayments = () => {
  const [payments, setPayments] = useState([]);
  const { admin } = useContext(AdminContext);

  const FetchData = async () => {
    try {
      let { data } = await axios.get(
        `${backend_url}/admin/payments/create-payment`,
        {
          headers: {
            Authorization: admin.token,
          },
        }
      );
      data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      // Select only the first 5 transactions (the last 5 after sorting)
      const last5Transactions = data.slice(-5);
      const reversedTransactions = last5Transactions.reverse();
      console.log(payments);
      setPayments(reversedTransactions);
    } catch (error) {
      console.log(error, "sdsdfdfsdfsd");
    }
  };
  useEffect(() => {
    if (admin.token) FetchData();
  }, []);

  return (
    <div className="RecentPayments-container">
      <div className="payments-top">
        <h1>Recent Payments</h1>
        <Link to="/payment">
          <div className="see-all-button">SEE ALL</div>
        </Link>
      </div>
      <div className="table">
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
            <h4>PAYMENT</h4>
          </div>
          <div className="col">
            <h4>STATUS</h4>
          </div>
        </div>
        {payments.map((payment, i) => (
          <div className="row" key={i}>
            <div className="col">{i + 1}</div>
            <div className="col">{payment.description}</div>
            <div className="col">{payment.created_at}</div>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPayments;
