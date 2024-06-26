import React, { useEffect, useState } from "react";
import "./style.scss";
import { Link, useParams } from "react-router-dom";
import config from "@/config";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";
import { calculateOriginalAmount } from "../../utilities";
const { backend_url } = config;

const PaymentDetails = () => {
  const { payment_id } = useParams();
  const [payment, setPayment] = useState({});

  useEffect(() => {
    getPayment();
  }, [payment_id]);

  const getPayment = async () => {
    try {
      const { data } = await axios.get(
        `${backend_url}/admin/payments/get-payment/${payment_id}`
      );
      setPayment(data);
      console.log(data);
      console.log(data.created_at);
    } catch (error) {
      console.log(error);
      toast(error.message);
      console.log("errrorrrr");
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    // Extract date components
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; // Months are zero-based
    const day = date.getUTCDate();

    // Extract time components
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    // Determine AM/PM
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12 for 12-hour format

    // Format minutes and seconds with leading zeros if needed
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    const secondsStr = seconds < 10 ? "0" + seconds : seconds;

    const formattedDate = `${month}/${day}/${year}`;
    const formattedTime = `${hours}:${minutesStr}:${secondsStr} ${ampm}`;

    return { date: formattedDate, time: formattedTime };
  };

  console.log(payment);

  return (
    <div className="PaymentDetails-container PaymentDetails-container-parent">
      <div className="basic-info">
        <div className="heading">
          <h2>Payment Details</h2>
        </div>

        <div className="info">
          <div className="row">
            <div className="col">
              <div className="info-field">
                <p>Counsellor Id</p>
              </div>
              <div className="info-value">
                <p>
                  {payment.payment_to}{" "}
                  <Link
                    to={`/counsellors/counsellor-profile/${payment.payment_to}`}
                  >
                    View Profile
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="info-field">
                <p>User Id</p>
              </div>
              <div className="info-value">
                <p>
                  {payment.payment_from}{" "}
                  <Link to={`/user/user-details/${payment.payment_from}`}>
                    View Profile
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="info-field">
                <p>Order Id</p>
              </div>
              <div className="info-value">
                <p>{payment.order_id}</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="info-field">
                <p>Payment Id</p>
              </div>
              <div className="info-value">
                <p>{payment.payment_id}</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="info-field">
                <p>Amount</p>
              </div>
              <div className="info-value">
                <p>Rs {payment.amount}</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="info-field">
                <p>Amount Due</p>
              </div>
              <div className="info-value">
                <p>Rs {payment.amount_due}</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="info-field">
                <p>Amount Paid</p>
              </div>
              <div className="info-value">
                <p>Rs {payment.amount_paid}</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="info-field">
                <p>GST</p>
              </div>
              <div className="info-value">
                <p>Rs {calculateOriginalAmount(payment.amount).gstAdded}</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="info-field">
                <p>Convenience Charges</p>
              </div>
              <div className="info-value">
                <p>
                  Rs{" "}
                  {
                    calculateOriginalAmount(payment.amount)
                      .convenienceChargesAdded
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="info-field">
                <p>Currency</p>
              </div>
              <div className="info-value">
                <p>{payment.currency}</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="info-field">
                <p>Payment Date</p>
              </div>
              <div className="info-value">
                <p>{formatTimestamp(payment.created_at).date}</p>
                <p>{formatTimestamp(payment.created_at).time}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
