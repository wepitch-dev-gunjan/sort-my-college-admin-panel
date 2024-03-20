import React, { useEffect, useState } from "react";
import "./style.scss";
import { Link, useParams } from "react-router-dom";
import config from "@/config";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";
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
    } catch (error) {
      console.log(error);
      toast(error.message);
      console.log("errrorrrr");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return { date: formattedDate, time: formattedTime };
  };

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
                <p>
                  Rs{" "}
                  {(payment.amount +
                    payment.gst +
                    payment.convenience_charges) /
                    100}{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="info-field">
                <p>Amount Due</p>
              </div>
              <div className="info-value">
                <p>Rs {payment.amount_due / 100}</p>
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
                <p>Rs {(payment.amount * 0.18) / 100}</p>
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
                  Rs {((payment.amount + payment.amount * 0.18) * 0.05) / 100}
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
                <p>{formatDate(payment.created_at).date}</p>
                <p>{formatDate(payment.created_at).time}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
